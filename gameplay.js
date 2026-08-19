let config={mode:"solo",hard:false};
let state=blankState();
const $=s=>document.querySelector(s);

function blankState(){
  return {
    round:1,
    picks:[[],[]],
    used:new Set(),
    decadeRerollUsed:false,
    genreRerollUsed:false,
    currentPool:null,
    currentOptions:[],
    toast:"",
    picksThisRound:0,
    turn:0
  };
}

// ---------- Persistent records ----------
const HIGH_SCORE_KEY="headlinerDraftHighScoreV1";
function loadHighScore(){
  try{
    const raw=localStorage.getItem(HIGH_SCORE_KEY);
    if(!raw)return null;
    const parsed=JSON.parse(raw);
    return parsed && typeof parsed.score==="number" ? parsed : null;
  }catch(e){return null}
}
function saveHighScore(score){
  const current=loadHighScore();
  if(!current || score>current.score){
    const record={score:+score.toFixed(1),grade:grade(score),date:new Date().toISOString()};
    try{localStorage.setItem(HIGH_SCORE_KEY,JSON.stringify(record))}catch(e){}
    return record;
  }
  return current;
}
function renderHighScore(){
  const record=loadHighScore();
  const scoreText=record?record.score.toFixed(1):"—";
  const gradeText=record?`${record.grade} tier`:"No completed run yet";
  if($("#homeBestScore"))$("#homeBestScore").textContent=scoreText;
  if($("#homeBestGrade"))$("#homeBestGrade").textContent=gradeText;
  if($("#highScoreMetric"))$("#highScoreMetric").textContent=scoreText;
  if($("#highScoreHint"))$("#highScoreHint").textContent=record?record.grade+" tier":"no completed run";
}

// ---------- Game mechanics ----------
function allPicks(){return config.mode==="solo"?state.picks[0]:[...state.picks[0],...state.picks[1]]}
function playerPicks(i){return state.picks[i]}
function eligiblePools(){return pools.filter(p=>p.artists.filter(a=>!state.used.has(a)).length>=6)}
function rollOptions(pool){
  const available=pool.artists.filter(a=>!state.used.has(a));
  return weightedSample(available,6);
}
function legendaryToast(){
  return state.currentOptions.some(a=>rarityFor(a)==="Legendary") ? "✦ LEGENDARY PULL — one of these cards is a jackpot." : "";
}
function firstPlayerForRound(){return (state.round-1)%2}
function newRound(){
  if(state.round>6)return;
  const ep=eligiblePools();if(!ep.length)return;
  state.currentPool=ep[Math.floor(Math.random()*ep.length)];
  state.currentOptions=rollOptions(state.currentPool);
  state.picksThisRound=0;
  state.turn=config.mode==="h2h"?firstPlayerForRound():0;
  state.toast=legendaryToast();
  render();
}
function decadeAlternatives(){
  if(!state.currentPool)return [];
  return eligiblePools().filter(p=>p.genre===state.currentPool.genre && p.decade!==state.currentPool.decade);
}
function genreAlternatives(){
  if(!state.currentPool)return [];
  return eligiblePools().filter(p=>p.decade===state.currentPool.decade && p.genre!==state.currentPool.genre);
}
function rerollWindowOpen(){return config.mode==="solo" || state.picksThisRound===0}
function canDecadeReroll(){return !state.decadeRerollUsed && state.round<=6 && rerollWindowOpen() && decadeAlternatives().length>0}
function canGenreReroll(){return !state.genreRerollUsed && state.round<=6 && rerollWindowOpen() && genreAlternatives().length>0}
function rarityIndex(r){return RARITY_ORDER.indexOf(r)}

function draft(name){
  if(state.round>6 || state.used.has(name))return;
  const p=profile(name);
  const who=config.mode==="h2h"?state.turn:0;
  state.picks[who].push({name,genre:state.currentPool.genre,decade:state.currentPool.decade,...p});
  state.used.add(name);
  state.currentOptions=state.currentOptions.filter(a=>a!==name);
  state.toast=p.rarity==="Legendary"?`✦ ${name} LOCKED — legendary headliner secured.`:"";

  if(config.mode==="solo"){
    state.round++;
    if(state.round<=6)newRound();else render();
    return;
  }

  state.picksThisRound++;
  if(state.picksThisRound===1){
    state.turn=1-state.turn;
    render();
  }else{
    state.round++;
    if(state.round<=6)newRound();else render();
  }
}
function rerollDecade(){
  if(!canDecadeReroll())return;
  state.decadeRerollUsed=true;
  const alts=decadeAlternatives();
  state.currentPool=alts[Math.floor(Math.random()*alts.length)];
  state.currentOptions=rollOptions(state.currentPool);
  state.toast=`Decade reroll spent — ${state.currentPool.genre} stays, new decade: ${state.currentPool.decade}.`;
  if(state.currentOptions.some(a=>rarityFor(a)==="Legendary"))state.toast+=" ✦ Legendary card in the new pull.";
  render();
}
function rerollGenre(){
  if(!canGenreReroll())return;
  const lockedDecade=state.currentPool.decade;
  state.genreRerollUsed=true;
  const alts=genreAlternatives();
  state.currentPool=alts[Math.floor(Math.random()*alts.length)];
  state.currentOptions=rollOptions(state.currentPool);
  state.toast=`Genre reroll spent — ${lockedDecade} stays, new genre: ${state.currentPool.genre}.`;
  if(state.currentOptions.some(a=>rarityFor(a)==="Legendary"))state.toast+=" ✦ Legendary card in the new pull.";
  render();
}
function restart(){
  state=blankState();
  newRound();
}
function diversityBonusFor(picks){
  if(!picks.length)return 0;
  const genres=new Set(picks.map(p=>p.genre)).size, decades=new Set(picks.map(p=>p.decade)).size;
  return +Math.min(4,Math.max(0,(genres-1)*.5)+Math.max(0,(decades-1)*.5)).toFixed(1);
}
function scoreFor(picks){
  if(!picks.length)return 0;
  const avg=picks.reduce((s,p)=>s+p.overall,0)/picks.length;
  return +Math.min(100,avg+diversityBonusFor(picks)).toFixed(1);
}
function rawAverageFor(picks){return picks.length?+(picks.reduce((s,p)=>s+p.overall,0)/picks.length).toFixed(1):0}
function grade(score){if(score>=93)return "S";if(score>=87)return "A";if(score>=78)return "B";if(score>=67)return "C";if(score>=58)return "D";return "F"}
function stat(label,val){return `<div class="statline"><span>${label}</span><div class="track"><div class="fill" style="width:${val}%"></div></div><span class="statnum">${val}</span></div>`}

function aggregateStats(picks){
  const keys=["live","hits","influence","buzz","critic","catalog"], out={};
  keys.forEach(k=>out[k]=picks.length?+(picks.reduce((s,p)=>s+p[k],0)/picks.length).toFixed(1):0);
  return out;
}

function lineupSlots(picks,label){
  let html=`<div class="playerLineup"><div class="playerLineupHead"><b>${label}</b><span class="pill">${picks.length} / 6</span></div>`;
  for(let i=0;i<6;i++){
    const p=picks[i];
    html+=p?`<div class="slot"><div class="num">${i+1}</div><div class="pick"><div class="pickname">${p.name}</div><div class="pickmeta">${p.genre} · ${p.decade} · ${p.rarity}<br><span class="archetype">${p.archetype}</span></div></div><div class="miniScore">${p.overall}</div></div>`
      :`<div class="slot"><div class="num">${i+1}</div><div class="empty">Open headliner slot</div></div>`;
  }
  return html+"</div>";
}

function renderOption(name){
  const p=profile(name);
  const hidden=config.hard?`<div class="hardHidden">Numerical stats hidden in Hard Mode<br>Use rarity, archetype and your music knowledge.</div>`:
    `<div class="stats">${stat("Live",p.live)}${stat("Hits",p.hits)}${stat("Influence",p.influence)}${stat("Buzz",p.buzz)}${stat("Critic",p.critic)}${stat("Catalog",p.catalog)}</div>`;
  const overall=config.hard?"":`<div class="overall">${p.overall}<small>headliner</small></div>`;
  const b=document.createElement("button");
  b.type="button";b.className=`artist ${p.rarity.toLowerCase()}`;
  b.innerHTML=`<div class="artistTop"><div><div class="artistName">${name}</div><span class="rarity ${p.rarity.toLowerCase()}">${p.rarity}</span><span class="archetype">${p.archetype}</span></div>${overall}</div>${hidden}<div class="odds">Pull weight: ${p.rarity==="Legendary"?'<span class="legendNote">extremely low</span>':p.rarity==="Epic"?'very low':p.rarity==="Rare"?'low':p.rarity==="Uncommon"?'medium':'high'}</div>`;
  b.addEventListener("click",()=>draft(name));
  return b;
}

function posterMarkup(picks,title,score){
  return `<div class="lineupPoster">
    <div class="posterHeader"><div class="posterTitle">HEADLINER DRAFT</div><small>${title} · ${grade(score)} TIER · ${score.toFixed(1)}</small></div>
    <div class="posterArtists">${picks.map(p=>`<div class="posterArtist">
      <div class="posterArtistName">${p.name}<small>${p.genre} · ${p.decade}</small></div>
    </div>`).join("")}</div>
  </div>`;
}
function breakdownMarkup(picks,title){
  const score=scoreFor(picks), raw=rawAverageFor(picks), bonus=diversityBonusFor(picks), a=aggregateStats(picks);
  const strongest=Object.entries(a).sort((x,y)=>y[1]-x[1])[0];
  const weakest=Object.entries(a).sort((x,y)=>x[1]-y[1])[0];
  return `<div class="breakdown"><h3>${title} breakdown</h3>
    <div class="breakdownSummary">
      <div class="breakMetric"><span>Raw average</span><b>${raw.toFixed(1)}</b></div>
      <div class="breakMetric"><span>Diversity</span><b>+${bonus.toFixed(1)}</b></div>
      <div class="breakMetric"><span>Final</span><b>${score.toFixed(1)} ${grade(score)}</b></div>
    </div>
    <div class="breakStats">
      <div class="breakStat"><span>Live</span><b>${a.live}</b></div><div class="breakStat"><span>Hits</span><b>${a.hits}</b></div>
      <div class="breakStat"><span>Influence</span><b>${a.influence}</b></div><div class="breakStat"><span>Buzz</span><b>${a.buzz}</b></div>
      <div class="breakStat"><span>Critic</span><b>${a.critic}</b></div><div class="breakStat"><span>Catalog</span><b>${a.catalog}</b></div>
    </div>
    <div style="margin-top:10px;color:var(--muted);font-size:11px">Strongest category: <b>${strongest[0]}</b> ${strongest[1]} · Weakest: <b>${weakest[0]}</b> ${weakest[1]}</div>
  </div>`;
}
function renderPostgame(){
  const post=$("#postgame");
  if(config.mode==="solo"){
    const picks=state.picks[0], score=scoreFor(picks), fg=grade(score);
    saveHighScore(score);renderHighScore();
    post.innerHTML=`<div class="postgameWrap">
      <div class="resultHero"><div><h2>${fg==="S"?"YOU WON — S-TIER FESTIVAL":"Festival graded"}</h2><p>${fg==="S"?`Final score ${score}. You built a true top-tier headliner slate.`:`Final score ${score}. S starts at 93.`}</p></div><div class="finalGrade grade-${fg}">${fg}</div></div>
      <div class="posterGrid">${posterMarkup(picks,"Your Festival",score)}${breakdownMarkup(picks,"Your lineup")}</div>
      
    </div>`;
  }else{
    const a=state.picks[0], b=state.picks[1], sa=scoreFor(a), sb=scoreFor(b);
    saveHighScore(Math.max(sa,sb));renderHighScore();
    const result=sa===sb?"Draw":sa>sb?"Player 1 wins":"Player 2 wins";
    post.innerHTML=`<div class="postgameWrap">
      <div class="winnerBanner">${result} · Player 1 ${sa.toFixed(1)} (${grade(sa)}) — Player 2 ${sb.toFixed(1)} (${grade(sb)})</div>
      <div class="posterGrid">${posterMarkup(a,"Player 1",sa)}${posterMarkup(b,"Player 2",sb)}</div>
      <div class="posterGrid">${breakdownMarkup(a,"Player 1")}${breakdownMarkup(b,"Player 2")}</div>
      
    </div>`;
  }
}

function render(){
  renderHighScore();
  const finished=state.round>6;
  const body=$("#screen-game");
  body.classList.toggle("hardMode",config.hard);

  $("#modeNotice").classList.add("show");
  $("#modeNotice").textContent=`${config.mode==="h2h"?"Head-to-Head":"Solo"} · ${config.hard?"Hard Mode: stats hidden":"Normal Mode"}`;

  if(config.mode==="solo"){
    const picks=state.picks[0], score=scoreFor(picks), g=picks.length?grade(score):"—", bonus=diversityBonusFor(picks);
    $("#gradeLabel").textContent="Current grade";$("#scoreLabel").textContent="Lineup score";$("#bonusLabel").textContent="Diversity bonus";$("#bestLabel").textContent="Best pull";
    $("#gradeMetric").textContent=config.hard&& !finished?"?":g;
    $("#scoreMetric").textContent=config.hard&& !finished?"??":score.toFixed(1);
    $("#bonusMetric").textContent=config.hard&& !finished?"?":`+${bonus.toFixed(1)}`;
    const best=[...picks].sort((a,b)=>rarityIndex(b.rarity)-rarityIndex(a.rarity)||b.overall-a.overall)[0];
    $("#bestMetric").textContent=best?best.rarity:"—";$("#bestHint").textContent=best?best.name:"no picks yet";
    $("#lineupTitle").textContent="Your lineup";$("#countPill").textContent=`${picks.length} / 6`;
    $("#lineup").className="lineup";$("#lineup").innerHTML=lineupSlots(picks,"Your lineup").replace('<div class="playerLineup"><div class="playerLineupHead"><b>Your lineup</b><span class="pill">'+picks.length+' / 6</span></div>','<div class="playerLineup">');
    $("#turnBanner").classList.remove("show");
  }else{
    const a=state.picks[0],b=state.picks[1],sa=scoreFor(a),sb=scoreFor(b);
    $("#gradeLabel").textContent="Player 1";$("#scoreLabel").textContent="Player 2";$("#bonusLabel").textContent="Score gap";$("#bestLabel").textContent="Current turn";
    $("#gradeMetric").textContent=config.hard&&!finished?"?":sa.toFixed(1);
    $("#scoreMetric").textContent=config.hard&&!finished?"?":sb.toFixed(1);
    $("#bonusMetric").textContent=config.hard&&!finished?"?":Math.abs(sa-sb).toFixed(1);
    $("#bestMetric").textContent=finished?"Done":`P${state.turn+1}`;
    $("#bestHint").textContent=finished?"match complete":state.picksThisRound===0?"first pick":"second pick";
    $("#lineupTitle").textContent="Head-to-Head lineups";$("#countPill").textContent=`R${Math.min(state.round,6)} / 6`;
    $("#lineup").className="lineup h2hLineups";$("#lineup").innerHTML=lineupSlots(a,"Player 1")+lineupSlots(b,"Player 2");
    if(!finished){
      $("#turnBanner").classList.add("show");
      $("#turnBanner").innerHTML=`<span>Player ${state.turn+1} to draft</span><span class="playerTag">${state.picksThisRound===0?"First pick":"Second pick"} · Round ${state.round}</span>`;
    }else $("#turnBanner").classList.remove("show");
  }

  $("#roundLabel").textContent=finished?"Draft complete":`Round ${state.round} of 6`;
  $("#rerollBadge").textContent=`Decade ${state.decadeRerollUsed?"used":"ready"} · Genre ${state.genreRerollUsed?"used":"ready"}`;
  $("#toast").style.display=state.toast?"block":"none";$("#toast").textContent=state.toast;
  if(!finished && state.currentPool){$("#genreTag").textContent=state.currentPool.genre;$("#decadeTag").textContent=state.currentPool.decade}
  else{$("#genreTag").textContent="Festival";$("#decadeTag").textContent="Graded"}

  const opts=$("#options");opts.innerHTML="";
  if(!finished)state.currentOptions.forEach(name=>opts.appendChild(renderOption(name)));

  $("#decadeRerollBtn").disabled=finished||!canDecadeReroll();
  $("#genreRerollBtn").disabled=finished||!canGenreReroll();

  const fin=$("#finish");fin.style.display=finished?"block":"none";
  if(finished)renderPostgame();
}

// ---------- Start / navigation ----------
function showScreen(name){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.querySelector(`#screen-${name}`)?.classList.add("active");
  if(name==="rankings")renderCatalog();
  window.scrollTo({top:0,behavior:"smooth"});
}
function startGame(){
  config.hard=$("#hardModeToggle").checked;
  state=blankState();
  showScreen("game");
  newRound();
}
$("#homePlayBtn").addEventListener("click",()=>showScreen("setup"));
$("#homeRulesBtn").addEventListener("click",()=>showScreen("rules"));
$("#homeRankingsBtn").addEventListener("click",()=>showScreen("rankings"));
$("#setupHomeBtn").addEventListener("click",()=>showScreen("home"));
$("#gameHomeBtn").addEventListener("click",()=>showScreen("home"));
$("#rulesHomeBtn").addEventListener("click",()=>showScreen("home"));
$("#rankingsHomeBtn").addEventListener("click",()=>showScreen("home"));
$("#startGameBtn").addEventListener("click",startGame);
$("#modeSoloBtn").addEventListener("click",()=>{
  config.mode="solo";$("#modeSoloBtn").classList.add("active");$("#modeH2HBtn").classList.remove("active");
});
$("#modeH2HBtn").addEventListener("click",()=>{
  config.mode="h2h";$("#modeH2HBtn").classList.add("active");$("#modeSoloBtn").classList.remove("active");
});
$("#decadeRerollBtn").addEventListener("click",rerollDecade);
$("#genreRerollBtn").addEventListener("click",rerollGenre);
$("#restartBtn").addEventListener("click",restart);

// ---------- Complete artist catalogue ----------
