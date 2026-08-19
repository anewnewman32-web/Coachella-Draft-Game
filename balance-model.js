// vNext balance layer: smooth global card quality + genre/decade depth weighting.
// This file intentionally loads after era-model.js so it can refine the era-card model
// without coupling card strength to rarity.

const CARD_MIN_OVERALL = 70;
const CARD_MIN_STAT = 48;

// Historical/scene relevance affects the DEPTH of a spin, not a card's global rating.
// 1.00 is neutral. Higher values make the stronger cards already present in that pool
// slightly more likely to surface, while rarity remains the dominant pull-odds system.
const POOL_RELEVANCE = {
  "Rock":{"1960s":1.15,"1970s":1.18,"1980s":1.14,"1990s":1.12,"2000s":1.06,"2010s":1.00,"2020s":.96},
  "Pop":{"1980s":1.12,"1990s":1.09,"2000s":1.13,"2010s":1.17,"2020s":1.18},
  "Hip-Hop":{"1980s":1.04,"1990s":1.15,"2000s":1.18,"2010s":1.18,"2020s":1.16},
  "R&B":{"1970s":1.10,"1980s":1.11,"1990s":1.15,"2000s":1.13,"2010s":1.12,"2020s":1.11},
  "Electronic":{"1980s":1.06,"1990s":1.13,"2000s":1.15,"2010s":1.16,"2020s":1.13},
  "Indie / Alternative":{"1980s":1.07,"1990s":1.12,"2000s":1.15,"2010s":1.13,"2020s":1.09},
  "Dance / Disco":{"1970s":1.18,"1980s":1.09,"1990s":1.10,"2000s":1.11,"2010s":1.14,"2020s":1.15},
  "Punk / Emo":{"1970s":1.15,"1980s":1.12,"1990s":1.13,"2000s":1.15,"2010s":1.06,"2020s":1.08},
  "Soul / Funk":{"1960s":1.18,"1970s":1.18,"1980s":1.09,"1990s":1.03,"2000s":1.01,"2010s":1.05,"2020s":1.05},
  "Latin":{"1990s":1.08,"2000s":1.12,"2010s":1.15,"2020s":1.18},
  "Country":{"1960s":1.10,"1970s":1.12,"1980s":1.08,"1990s":1.15,"2000s":1.11,"2010s":1.12,"2020s":1.14},
  "Metal":{"1970s":1.10,"1980s":1.18,"1990s":1.15,"2000s":1.13,"2010s":1.08,"2020s":1.10},
  "Jazz":{"1960s":1.18,"1970s":1.15,"1980s":1.06,"1990s":1.04,"2000s":1.06,"2010s":1.10,"2020s":1.12},
  "Reggae":{"1970s":1.18,"1980s":1.12,"1990s":1.08,"2000s":1.03,"2010s":1.05,"2020s":1.08},
  "Folk / Americana":{"1960s":1.18,"1970s":1.15,"1980s":1.03,"1990s":1.01,"2000s":1.08,"2010s":1.13,"2020s":1.15},
  "Afrobeats / Afrobeat":{"1970s":1.15,"1980s":1.10,"1990s":1.03,"2000s":1.06,"2010s":1.15,"2020s":1.18},
  "K-Pop":{"1990s":1.03,"2000s":1.08,"2010s":1.18,"2020s":1.18}
};

function poolRelevance(genre,decade){
  return POOL_RELEVANCE[genre]?.[decade] ?? 1;
}

// Unknown/less-curated artists now sit on the same usable 70-100 scale as the rest
// of the game. Career breadth helps, but no rarity tier is consulted here.
function globalPeakCenter(name){
  if(GLOBAL_STATURE[name])return GLOBAL_STATURE[name]-3;
  const c=eraArtistContexts().get(name)||{appearances:1,genres:new Set(),decades:new Set()};
  const breadth=(c.decades.size||1)*2.35+(c.genres.size||1)*1.35+Math.min(c.appearances||1,12)*.62;
  const jitter=((hashName(name)&255)/255-.5)*6.5;
  return clamp(Math.round(69+Math.min(18,breadth)+jitter),72,92);
}

// Keep decade differences meaningful without letting a non-peak decade collapse
// an otherwise credible festival artist into the 50s or low 60s.
function eraDelta(name,decade){
  if(ERA_CURVES[name]?.[decade]!==undefined){
    const d=ERA_CURVES[name][decade];
    return d>=0?d:d*.72;
  }
  const p=DECADE_INDEX[inferPeakDecade(name)],d=DECADE_INDEX[decade];
  if(p===undefined||d===undefined)return 0;
  return [0,-3,-6,-9,-12,-14,-16][Math.min(Math.abs(d-p),6)];
}

function enforceCardFloor(p,floor=CARD_MIN_OVERALL){
  const keys=["live","hits","influence","buzz","critic","catalog"];
  for(const k of keys)p[k]=clamp(Math.round(p[k]),CARD_MIN_STAT,100);
  let score=overall(p);
  if(score>=floor)return p;

  // Add the same amount to every category first, preserving the card's archetype gaps.
  const lift=floor-score+.15;
  for(const k of keys)p[k]=clamp(Math.round(p[k]+lift),CARD_MIN_STAT,100);

  // Rounding can leave a card a few tenths short. Finish with tiny even increments.
  let guard=0;
  while(overall(p)<floor && guard<10){
    for(const k of keys)if(p[k]<100)p[k]++;
    guard++;
  }
  return p;
}

function eraProfileFromPeak(base,name,decade){
  const explicit=CARD_STAT_OVERRIDES[`${name}|${decade}`];
  if(explicit)return enforceCardFloor({...explicit});

  const delta=eraDelta(name,decade),peak=DECADE_INDEX[inferPeakDecade(name)],now=DECADE_INDEX[decade],after=now>peak;
  // Later cards retain influence/catalog better; early cards lose more influence/catalog
  // because those parts of the career have not happened yet.
  const factors=after
    ?{live:.50,hits:.80,influence:.20,buzz:.88,critic:.48,catalog:.12}
    :{live:.62,hits:.78,influence:.58,buzz:.86,critic:.50,catalog:.66};
  const p={};
  for(const k of ["live","hits","influence","buzz","critic","catalog"]){
    p[k]=clamp(Math.round(base[k]+delta*factors[k]),CARD_MIN_STAT,100);
  }
  return enforceCardFloor(p);
}

function profile(name,decade){
  const era=decade||((typeof state!=="undefined"&&state.currentPool)?state.currentPool.decade:inferPeakDecade(name));
  const p=eraProfileFromPeak(globalPeakProfile(name),name,era);
  p.rarity=rarityFor(name,era);
  p.overall=overall(p);
  p.archetype=archetypeFor(p);
  p.decade=era;
  return p;
}

// Relevant genre/decade combinations have stronger DEPTH: within the same rarity
// framework, their better cards get a modest extra chance to be among the six options.
// This never changes a card's displayed stats and never makes relevance a hidden stat bonus.
function weightedSample(items,n,decade){
  const era=decade||((typeof state!=="undefined"&&state.currentPool)?state.currentPool.decade:null);
  const genre=(typeof state!=="undefined"&&state.currentPool)?state.currentPool.genre:null;
  const relevance=poolRelevance(genre,era);
  const pool=[...items],out=[];

  while(out.length<n&&pool.length){
    const weights=pool.map(name=>{
      const rarityWeight=RARITY_WEIGHT[rarityFor(name,era)];
      if(!era||!genre)return rarityWeight;
      const score=profile(name,era).overall;
      const quality=Math.max(0,Math.min(1,(score-CARD_MIN_OVERALL)/(100-CARD_MIN_OVERALL)));
      const depthFactor=Math.max(.68,1+(relevance-1)*2.5*(quality-.32));
      return rarityWeight*depthFactor;
    });
    const total=weights.reduce((a,b)=>a+b,0);
    let r=Math.random()*total,idx=0;
    for(;idx<pool.length;idx++){r-=weights[idx];if(r<=0)break}
    out.push(pool.splice(Math.min(idx,pool.length-1),1)[0]);
  }
  return out;
}
