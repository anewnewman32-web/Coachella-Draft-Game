// Global, era-specific card ratings.
// IMPORTANT: rarity only controls pull frequency. It never sets stat strength.

const DECADE_INDEX={"1960s":0,"1970s":1,"1980s":2,"1990s":3,"2000s":4,"2010s":5,"2020s":6};

// Career stature is one shared game-wide scale. It is independent from rarity.
// The map handles major acts explicitly; everyone else is placed globally using
// career breadth, longevity, genre reach, and a deterministic artist identity.
const GLOBAL_STATURE={
  "Michael Jackson":100,"The Beatles":100,"Prince":100,"Beyoncé":100,"Taylor Swift":100,"Stevie Wonder":100,"Madonna":99,"David Bowie":99,"Queen":99,"Whitney Houston":99,"Marvin Gaye":99,"Aretha Franklin":100,"James Brown":99,"Jimi Hendrix":99,"Led Zeppelin":99,"Pink Floyd":99,"Bob Dylan":99,"Johnny Cash":98,"Dolly Parton":98,"Bob Marley & The Wailers":99,"Miles Davis":98,"Nina Simone":98,
  "The Rolling Stones":98,"Fleetwood Mac":95,"Bruce Springsteen":98,"U2":95,"Guns N' Roses":93,"The Cure":92,"Dire Straits":90,"Van Halen":93,"The Police":95,"Talking Heads":93,"AC/DC":95,"Eagles":96,"Aerosmith":90,"The Clash":93,"The Who":95,"The Doors":94,"The Beach Boys":96,"Metallica":98,"Black Sabbath":97,"Iron Maiden":94,"Ozzy Osbourne":94,
  "Janet Jackson":95,"Mariah Carey":96,"Britney Spears":92,"Rihanna":96,"Lady Gaga":95,"Adele":95,"The Weeknd":95,"Bruno Mars":93,"Ariana Grande":92,"Dua Lipa":89,"Billie Eilish":93,"Miley Cyrus":89,"Shakira":95,
  "Eminem":98,"Jay-Z":97,"Kanye West":96,"OutKast":95,"Nas":95,"Snoop Dogg":92,"Lil Wayne":93,"Missy Elliott":94,"Drake":95,"Kendrick Lamar":99,"J. Cole":90,"Travis Scott":89,"Nicki Minaj":92,"Tyler, the Creator":92,"Public Enemy":94,"N.W.A":93,"Wu-Tang Clan":94,"2Pac":98,"The Notorious B.I.G.":98,
  "Frank Ocean":94,"SZA":94,"Usher":93,"Alicia Keys":92,"Erykah Badu":92,"Lauryn Hill":96,"D’Angelo":93,"D'Angelo":93,"Sade":95,"TLC":92,"Amy Winehouse":95,
  "Radiohead":97,"Nirvana":98,"Coldplay":92,"Pearl Jam":91,"Red Hot Chili Peppers":92,"Oasis":91,"Foo Fighters":90,"Green Day":90,"The White Stripes":89,"The Killers":87,"Arctic Monkeys":90,"Muse":88,"Linkin Park":90,
  "Daft Punk":98,"Kraftwerk":96,"New Order":92,"Depeche Mode":93,"The Chemical Brothers":91,"The Prodigy":90,"Justice":89,"LCD Soundsystem":90,"Calvin Harris":89,"Disclosure":86,"Skrillex":89,"Aphex Twin":93,"Björk":95,"Massive Attack":93,"Portishead":92,
  "The Smiths":92,"Pixies":91,"Blur":89,"Beck":91,"Arcade Fire":90,"The Strokes":90,"Tame Impala":90,"Lana Del Rey":93,"Lorde":89,"Florence + the Machine":88,"Bon Iver":90,
  "Donna Summer":95,"ABBA":97,"Bee Gees":96,"Chic":94,"Diana Ross":96,"Ramones":94,"My Chemical Romance":90,"Paramore":90,
  "Otis Redding":96,"Sam Cooke":97,"Al Green":95,"Curtis Mayfield":95,"Earth, Wind & Fire":95,"Chaka Khan":94,
  "Selena":94,"Daddy Yankee":94,"Bad Bunny":97,"Rosalía":91,"Karol G":90,
  "Garth Brooks":96,"Shania Twain":95,"George Strait":95,"Reba McEntire":92,"Willie Nelson":98,"Chris Stapleton":93,"Kacey Musgraves":91,"Zach Bryan":87,
  "Herbie Hancock":96,"Ella Fitzgerald":98,"Thelonious Monk":98,"Charles Mingus":97,"John Coltrane":99,"Pat Metheny Group":92,"Wynton Marsalis":91,"Esperanza Spalding":89,"Kamasi Washington":88,
  "Peter Tosh":94,"Jimmy Cliff":94,"Toots and the Maytals":94,"Burning Spear":93,"Sean Paul":90,"Damian Marley":89,
  "Neil Young":96,"Joni Mitchell":99,"Leonard Cohen":96,"Simon & Garfunkel":96,"Carole King":95,"Tracy Chapman":91,"Sufjan Stevens":90,"Phoebe Bridgers":87,
  "Fela Kuti":98,"Burna Boy":93,"Wizkid":91,"Angélique Kidjo":93,"Femi Kuti":90,"Tony Allen":94,"Davido":88,"Tems":87,"Rema":86,
  "BTS":95,"BLACKPINK":92,"BIGBANG":92,"Girls’ Generation":91,"TWICE":89,"IU":91,"SEVENTEEN":89,"Stray Kids":88
};

const PEAK_DECADE={
  "Michael Jackson":"1980s","David Bowie":"1970s","Queen":"1970s","Whitney Houston":"1990s","Marvin Gaye":"1970s","Joni Mitchell":"1970s","Pink Floyd":"1970s",
  "The Rolling Stones":"1970s","Fleetwood Mac":"1970s","Bruce Springsteen":"1980s","U2":"1980s","Guns N' Roses":"1980s","The Cure":"1980s","Dire Straits":"1980s","Van Halen":"1980s","The Police":"1980s","Talking Heads":"1980s","AC/DC":"1980s","Metallica":"1990s",
  "Madonna":"1980s","Janet Jackson":"1990s","Mariah Carey":"1990s","Rihanna":"2010s","Lady Gaga":"2010s","The Weeknd":"2020s","Beyoncé":"2010s","Taylor Swift":"2020s",
  "Eminem":"2000s","Jay-Z":"2000s","Kanye West":"2010s","Nas":"1990s","Snoop Dogg":"1990s","Lil Wayne":"2000s","Drake":"2010s","Kendrick Lamar":"2010s",
  "Daft Punk":"2000s","Depeche Mode":"1990s","Radiohead":"2000s","Coldplay":"2000s","Shakira":"2000s",
  "Johnny Cash":"1960s","Dolly Parton":"1970s","Willie Nelson":"1970s","Bob Dylan":"1960s","George Strait":"1990s","Reba McEntire":"1990s","Garth Brooks":"1990s","Shania Twain":"1990s",
  "Stevie Wonder":"1970s","Prince":"1980s","Aretha Franklin":"1960s","James Brown":"1960s","Herbie Hancock":"1970s","Miles Davis":"1960s","Jimmy Cliff":"1970s","Burning Spear":"1970s","Fela Kuti":"1970s","Burna Boy":"2020s","BTS":"2020s","BLACKPINK":"2020s"
};

// Hand-tuned career curves for artists whose different-decade cards should feel
// substantially different. Positive values are peak-level; negatives are decline/development.
const ERA_CURVES={
  "Michael Jackson":{"1970s":-5,"1980s":2,"1990s":-2},
  "David Bowie":{"1960s":-4,"1970s":2,"1980s":0,"1990s":-4,"2000s":-6,"2010s":-3},
  "Queen":{"1970s":2,"1980s":1,"1990s":-5},
  "Whitney Houston":{"1980s":0,"1990s":2,"2000s":-7},
  "Marvin Gaye":{"1960s":-3,"1970s":2,"1980s":-4},
  "Joni Mitchell":{"1960s":-3,"1970s":2,"1980s":-4,"1990s":-7,"2000s":-10},
  "Pink Floyd":{"1960s":-4,"1970s":2,"1980s":-3,"1990s":-7},
  "Taylor Swift":{"2000s":-8,"2010s":0,"2020s":2},
  "Eminem":{"1990s":-7,"2000s":3,"2010s":-6,"2020s":-15},
  "The Rolling Stones":{"1960s":-1,"1970s":2,"1980s":-5,"1990s":-9,"2000s":-12,"2010s":-14,"2020s":-16},
  "Bruce Springsteen":{"1970s":-2,"1980s":2,"1990s":-7,"2000s":-5,"2010s":-7,"2020s":-9},
  "U2":{"1980s":1,"1990s":2,"2000s":-2,"2010s":-8,"2020s":-12},
  "Metallica":{"1980s":0,"1990s":2,"2000s":-5,"2010s":-7,"2020s":-6},
  "Dolly Parton":{"1960s":-6,"1970s":2,"1980s":0,"1990s":-4,"2000s":-7,"2010s":-7,"2020s":-6},
  "Johnny Cash":{"1960s":2,"1970s":0,"1980s":-7,"1990s":-3,"2000s":1},
  "Bob Dylan":{"1960s":2,"1970s":0,"1980s":-8,"1990s":-8,"2000s":-4,"2010s":-7,"2020s":-8},
  "Madonna":{"1980s":2,"1990s":0,"2000s":-4,"2010s":-10},
  "Beyoncé":{"2000s":-3,"2010s":2,"2020s":1},
  "Rihanna":{"2000s":-3,"2010s":2,"2020s":-6},
  "Lady Gaga":{"2000s":-5,"2010s":2,"2020s":-1},
  "Shakira":{"1990s":-5,"2000s":2,"2010s":-1,"2020s":-4},
  "Jay-Z":{"1990s":-4,"2000s":2,"2010s":-3,"2020s":-10},
  "Kanye West":{"2000s":0,"2010s":2,"2020s":-13},
  "Nas":{"1990s":2,"2000s":-3,"2010s":-8,"2020s":-4},
  "Snoop Dogg":{"1990s":2,"2000s":-5,"2010s":-9,"2020s":-11},
  "Lil Wayne":{"2000s":2,"2010s":-3,"2020s":-8},
  "Drake":{"2000s":-8,"2010s":2,"2020s":-1},
  "Janet Jackson":{"1980s":-2,"1990s":2,"2000s":-4,"2010s":-10},
  "Mariah Carey":{"1990s":2,"2000s":0,"2010s":-7,"2020s":-10},
  "Stevie Wonder":{"1960s":-4,"1970s":2,"1980s":-4,"1990s":-9,"2000s":-12},
  "George Strait":{"1980s":-3,"1990s":2,"2000s":0,"2010s":-5,"2020s":-8},
  "Reba McEntire":{"1980s":-3,"1990s":2,"2000s":-2,"2010s":-7,"2020s":-10},
  "Garth Brooks":{"1990s":2,"2000s":-4,"2010s":-7,"2020s":-9},
  "Shania Twain":{"1990s":2,"2000s":0,"2010s":-9,"2020s":-8},
  "Coldplay":{"2000s":2,"2010s":0,"2020s":-5},
  "Radiohead":{"1990s":-2,"2000s":2,"2010s":-4},
  "Daft Punk":{"1990s":-4,"2000s":2,"2010s":1},
  "Depeche Mode":{"1980s":-1,"1990s":2,"2000s":-5,"2010s":-8,"2020s":-9},
  "Miley Cyrus":{"2000s":-7,"2010s":0,"2020s":2},
  "Herbie Hancock":{"1960s":-3,"1970s":2,"1980s":0,"1990s":-4,"2000s":-3,"2010s":-7},
  "Miles Davis":{"1960s":2,"1970s":0,"1980s":-4,"1990s":-9},
  "Jimmy Cliff":{"1970s":2,"1980s":-3,"1990s":-6,"2000s":-8,"2010s":-10},
  "Burning Spear":{"1970s":2,"1980s":0,"1990s":-4,"2000s":-6,"2010s":-8},
  "Fela Kuti":{"1970s":2,"1980s":0,"1990s":-6},
  "Burna Boy":{"2010s":-3,"2020s":2},"BTS":{"2010s":0,"2020s":2},"BLACKPINK":{"2010s":0,"2020s":2}
};

const CARD_STAT_OVERRIDES={
  "Taylor Swift|2000s":{live:88,hits:91,influence:76,buzz:91,critic:84,catalog:83},
  "Taylor Swift|2010s":{live:96,hits:100,influence:96,buzz:100,critic:92,catalog:96},
  "Taylor Swift|2020s":{live:98,hits:100,influence:99,buzz:100,critic:96,catalog:100},
  "Eminem|1990s":{live:89,hits:86,influence:82,buzz:90,critic:88,catalog:78},
  "Eminem|2000s":{live:98,hits:100,influence:99,buzz:99,critic:94,catalog:99},
  "Eminem|2010s":{live:93,hits:94,influence:95,buzz:88,critic:82,catalog:96},
  "Eminem|2020s":{live:87,hits:82,influence:93,buzz:77,critic:75,catalog:96}
};

let ERA_CONTEXT_CACHE=null;
function eraArtistContexts(){
  if(ERA_CONTEXT_CACHE)return ERA_CONTEXT_CACHE;
  const map=new Map();
  for(const pool of pools)for(const name of pool.artists){
    if(!map.has(name))map.set(name,{appearances:0,genres:new Set(),decades:new Set()});
    const c=map.get(name);c.appearances++;c.genres.add(pool.genre);c.decades.add(pool.decade);
  }
  ERA_CONTEXT_CACHE=map;return map;
}
function inferPeakDecade(name){
  if(PEAK_DECADE[name])return PEAK_DECADE[name];
  const counts={};
  for(const pool of pools)if(pool.artists.includes(name))counts[pool.decade]=(counts[pool.decade]||0)+1;
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]||(DECADE_INDEX[a[0]]??9)-(DECADE_INDEX[b[0]]??9))[0]?.[0]||"2020s";
}
function globalPeakCenter(name){
  if(GLOBAL_STATURE[name])return GLOBAL_STATURE[name]-3;
  const c=eraArtistContexts().get(name)||{appearances:1,genres:new Set(),decades:new Set()};
  const breadth=(c.decades.size||1)*3.3+(c.genres.size||1)*1.8+Math.min(c.appearances||1,10)*.85;
  const jitter=((hashName(name)&255)/255-.5)*7;
  return clamp(Math.round(54+Math.min(24,breadth)+jitter),54,92);
}
function generatedGlobalPeak(name){
  const center=globalPeakCenter(name),h=hashName(name),n=s=>((h>>>s)&15)/15-.5;
  const p={live:center+n(0)*18,hits:center+n(4)*22,influence:center+n(8)*22,buzz:center+n(12)*24,critic:center+n(16)*20,catalog:center+n(20)*22};
  const type=h%8,bump=(k,v)=>p[k]+=v;
  if(type===0){bump("live",12);bump("hits",-7)}
  if(type===1){bump("hits",12);bump("critic",-7)}
  if(type===2){bump("influence",13);bump("catalog",10);bump("buzz",-12)}
  if(type===3){bump("buzz",15);bump("influence",-9);bump("catalog",-9)}
  if(type===4){bump("critic",13);bump("hits",-9)}
  if(type===5){bump("influence",11);bump("critic",9);bump("hits",-10)}
  if(type===6){bump("catalog",14);bump("buzz",-10)}
  const shift=center-overall(p);
  for(const k of ["live","hits","influence","buzz","critic","catalog"])p[k]=clamp(Math.round(p[k]+shift),40,100);
  return p;
}
function globalPeakProfile(name){
  if(OVERRIDES[name]?.live){
    const x={...OVERRIDES[name]};delete x.rarity;
    const fallback=generatedGlobalPeak(name);
    for(const k of ["live","hits","influence","buzz","critic","catalog"])if(x[k]===undefined)x[k]=fallback[k];
    return x;
  }
  return generatedGlobalPeak(name);
}
function eraDelta(name,decade){
  if(ERA_CURVES[name]?.[decade]!==undefined)return ERA_CURVES[name][decade];
  const p=DECADE_INDEX[inferPeakDecade(name)],d=DECADE_INDEX[decade];
  if(p===undefined||d===undefined)return 0;
  return [0,-4,-9,-15,-21,-27,-32][Math.min(Math.abs(d-p),6)];
}
function eraProfileFromPeak(base,name,decade){
  const explicit=CARD_STAT_OVERRIDES[`${name}|${decade}`];if(explicit)return {...explicit};
  const delta=eraDelta(name,decade),peak=DECADE_INDEX[inferPeakDecade(name)],now=DECADE_INDEX[decade],after=now>peak;
  const factors=after?{live:.55,hits:1,influence:.18,buzz:1.15,critic:.55,catalog:.10}:{live:.70,hits:1,influence:.65,buzz:1.05,critic:.55,catalog:.80};
  const p={};for(const k of ["live","hits","influence","buzz","critic","catalog"])p[k]=clamp(Math.round(base[k]+delta*factors[k]),38,100);
  return p;
}

// Overrides the original profile(): cards are now compared on one global scale,
// while different decades of the same artist can have very different values.
function profile(name,decade){
  const era=decade||((typeof state!=="undefined"&&state.currentPool)?state.currentPool.decade:inferPeakDecade(name));
  const p=eraProfileFromPeak(globalPeakProfile(name),name,era);
  p.rarity=rarityFor(name,era);p.overall=overall(p);p.archetype=archetypeFor(p);p.decade=era;return p;
}

// Overrides the original sampler only to make era-specific rarity work.
function weightedSample(items,n,decade){
  const era=decade||((typeof state!=="undefined"&&state.currentPool)?state.currentPool.decade:null),pool=[...items],out=[];
  while(out.length<n&&pool.length){
    const weights=pool.map(name=>RARITY_WEIGHT[rarityFor(name,era)]),total=weights.reduce((a,b)=>a+b,0);let r=Math.random()*total,idx=0;
    for(;idx<pool.length;idx++){r-=weights[idx];if(r<=0)break}
    out.push(pool.splice(Math.min(idx,pool.length-1),1)[0]);
  }
  return out;
}
