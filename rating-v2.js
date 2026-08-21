// Rating calibration v2: keep cards usable while making non-peak eras meaningfully weaker.
function globalPeakCenter(name){
  if(GLOBAL_STATURE[name])return clamp(Math.round(GLOBAL_STATURE[name]-3),72,97);
  const c=eraArtistContexts().get(name)||{appearances:1,genres:new Set(),decades:new Set()};
  const breadth=(c.decades.size||1)*2.25+(c.genres.size||1)*1.25+Math.min(c.appearances||1,12)*.58;
  const jitter=((hashName(name)&255)/255-.5)*5.5;
  return clamp(Math.round(70+Math.min(17,breadth)+jitter),72,92);
}

// Hand-authored career curves are now respected at full strength. Generic cards also
// fall off more clearly the farther they get from the artist's peak decade.
function eraDelta(name,decade){
  if(ERA_CURVES[name]?.[decade]!==undefined)return ERA_CURVES[name][decade];
  const p=DECADE_INDEX[inferPeakDecade(name)],d=DECADE_INDEX[decade];
  if(p===undefined||d===undefined)return 0;
  return [0,-3,-7,-12,-17,-22,-26][Math.min(Math.abs(d-p),6)];
}

const profileBeforeV2Calibration=profile;
profile=function(name,decade){
  const p=profileBeforeV2Calibration(name,decade);
  if(!CARD_STAT_OVERRIDES[`${name}|${p.decade}`]){
    enforceCardFloor(p,CARD_MIN_OVERALL);
    p.overall=overall(p);
    p.archetype=archetypeFor(p);
  }
  return p;
};
