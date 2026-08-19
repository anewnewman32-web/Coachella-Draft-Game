// Era-card catalogue: the same artist can have a separate card in each decade.
const ARTIST_CATALOG=(()=>{
  const map=new Map();
  pools.forEach(pool=>pool.artists.forEach(name=>{
    const key=`${name}|${pool.decade}`;
    if(!map.has(key))map.set(key,{name,decade:pool.decade,genres:new Set()});
    map.get(key).genres.add(pool.genre);
  }));
  return [...map.values()].map(item=>({name:item.name,decade:item.decade,genres:[...item.genres].sort(),...profile(item.name,item.decade)}));
})();

function fillCatalogFilters(){
  const genres=[...new Set(pools.map(p=>p.genre))].sort();
  const decades=[...new Set(pools.map(p=>p.decade))].sort((a,b)=>(DECADE_INDEX[a]??9)-(DECADE_INDEX[b]??9));
  genres.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;$("#genreFilter").appendChild(o)});
  decades.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;$("#decadeFilter").appendChild(o)});
}
function renderCatalog(){
  const query=$("#catalogSearch").value.trim().toLowerCase(),genre=$("#genreFilter").value,decade=$("#decadeFilter").value,rarity=$("#rarityFilter").value,sort=$("#sortFilter").value;
  let items=ARTIST_CATALOG.filter(a=>(!query||a.name.toLowerCase().includes(query))&&(!genre||a.genres.includes(genre))&&(!decade||a.decade===decade)&&(!rarity||a.rarity===rarity));
  if(sort==="name")items.sort((a,b)=>a.name.localeCompare(b.name)||(DECADE_INDEX[a.decade]??9)-(DECADE_INDEX[b.decade]??9));
  else items.sort((a,b)=>(b[sort]??0)-(a[sort]??0)||b.overall-a.overall||a.name.localeCompare(b.name)||(DECADE_INDEX[a.decade]??9)-(DECADE_INDEX[b.decade]??9));
  $("#catalogCount").textContent=`${items.length} card${items.length===1?"":"s"} shown · ${ARTIST_CATALOG.length} era cards total`;
  const grid=$("#catalogGrid");grid.innerHTML="";
  if(!items.length){grid.innerHTML='<div class="catalogEmpty">No era cards match those filters.</div>';return}
  items.forEach((a,index)=>{
    const card=document.createElement("article");card.className=`catalogCard ${a.rarity.toLowerCase()}`;
    card.innerHTML=`<div class="catalogTop"><div><div class="catalogName">${a.name}</div><span class="rarity ${a.rarity.toLowerCase()}">${a.rarity}</span><span class="archetype">${a.decade}</span><span class="archetype">${a.archetype}</span></div><div class="catalogScore">${a.overall}<small>${sort==="name"?"A–Z":`#${index+1} by ${sort}`}</small></div></div><div class="catalogMeta">${a.genres.join(" · ")}</div><div class="catalogStats"><div class="catalogStat"><span>Live</span><b>${a.live}</b></div><div class="catalogStat"><span>Hits</span><b>${a.hits}</b></div><div class="catalogStat"><span>Influence</span><b>${a.influence}</b></div><div class="catalogStat"><span>Buzz</span><b>${a.buzz}</b></div><div class="catalogStat"><span>Critic</span><b>${a.critic}</b></div><div class="catalogStat"><span>Catalog</span><b>${a.catalog}</b></div></div>`;
    grid.appendChild(card);
  });
}
["catalogSearch","genreFilter","decadeFilter","rarityFilter","sortFilter"].forEach(id=>{
  const el=$("#"+id);el.addEventListener(id==="catalogSearch"?"input":"change",renderCatalog);
});
fillCatalogFilters();
renderHighScore();
