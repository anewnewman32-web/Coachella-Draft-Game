function archetypeFor(p){
  const vals=["live","hits","influence","buzz","critic","catalog"].map(k=>p[k]);
  const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
  if(p.hits>=96 && p.influence>=95 && p.catalog>=95)return "Global Icon";
  if(p.influence>=94 && p.catalog>=94 && p.buzz<=82)return "Legacy Titan";
  if(p.live>=avg+9)return "Live Monster";
  if(p.hits>=avg+9)return "Hit Machine";
  if(p.buzz>=avg+10)return "Current Heat";
  if(p.critic>=avg+9 && p.hits<=avg-5)return "Critics’ Darling";
  if(p.influence>=avg+8 && p.hits<=avg-5)return "Cult Icon";
  if(p.catalog>=avg+9)return "Deep Catalog";
  if(Math.max(...vals)-Math.min(...vals)<=10)return "Complete Headliner";
  return "Wildcard";
}
function profile(name){
  const rarity=rarityFor(name), base=BASE[rarity], h=hashName(name);
  const nib = shift => ((h>>>shift)&15)/15;
  const raw = {
    live:      base + (nib(0)-.5)*28,
    hits:      base + (nib(4)-.5)*32,
    influence: base + (nib(8)-.5)*34,
    buzz:      base + (nib(12)-.5)*40,
    critic:    base + (nib(16)-.5)*34,
    catalog:   base + (nib(20)-.5)*38
  };

  if(OVERRIDES[name] && OVERRIDES[name].live){
    const x={...OVERRIDES[name]};
    if(x.critic===undefined)x.critic=clamp(Math.round(raw.critic));
    if(x.catalog===undefined)x.catalog=clamp(Math.round(raw.catalog));
    const out={...x,overall:overall(x)};
    out.archetype=archetypeFor(out);
    return out;
  }

  const p={rarity};
  for(const k of ["live","hits","influence","buzz","critic","catalog"])p[k]=clamp(Math.round(raw[k]));

  // Deterministic card archetype shaping: every generated artist gets a pronounced identity.
  const type=h%8;
  const bump=(k,v)=>p[k]=clamp(p[k]+v);
  if(type===0){bump("live",14);bump("hits",-7);bump("critic",-4)}
  if(type===1){bump("hits",14);bump("catalog",5);bump("critic",-7)}
  if(type===2){bump("influence",14);bump("catalog",14);bump("buzz",-16)}
  if(type===3){bump("buzz",18);bump("influence",-10);bump("catalog",-12)}
  if(type===4){bump("critic",15);bump("hits",-10);bump("buzz",-6)}
  if(type===5){bump("influence",12);bump("critic",10);bump("hits",-12)}
  if(type===6){bump("catalog",16);bump("buzz",-12);bump("live",-4)}
  if(type===7){for(const k of ["live","hits","influence","buzz","critic","catalog"])bump(k,3)}

  const keys=["live","hits","influence","buzz","critic","catalog"];
  const sorted=[...keys].sort((a,b)=>p[b]-p[a]);
  bump(sorted[0],6); bump(sorted[1],3); bump(sorted[4],-5); bump(sorted[5],-9);

  // Keep rare cards strong overall without erasing meaningful weaknesses.
  const floor={Legendary:70,Epic:66,Rare:60,Uncommon:52,Common:42}[rarity];
  for(const k of keys)p[k]=Math.max(floor,p[k]);

  p.overall=overall(p);
  p.archetype=archetypeFor(p);
  return p;
}
function overall(p){
  return +(p.live*.22+p.hits*.17+p.influence*.18+p.buzz*.13+p.critic*.15+p.catalog*.15).toFixed(1)
}
function sample(items,n){
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}
  return copy.slice(0,n);
}
function weightedSample(items,n){
  const pool=[...items], out=[];
  while(out.length<n && pool.length){
    const weights=pool.map(name=>RARITY_WEIGHT[rarityFor(name)]), total=weights.reduce((a,b)=>a+b,0);let r=Math.random()*total, idx=0;
    for(;idx<pool.length;idx++){r-=weights[idx];if(r<=0)break}
    out.push(pool.splice(Math.min(idx,pool.length-1),1)[0]);
  }
  return out;
}

