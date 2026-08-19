// Long careers and genre-crossing careers create multiple era cards.
// A name can appear in many pools, but each decade gets its own stats in profile().
function addCareerCard(name, genre, decade){
  const pool=pools.find(p=>p.genre===genre && p.decade===decade);
  if(pool && !pool.artists.includes(name))pool.artists.push(name);
}
const CAREER_EXPANSIONS = [
  ["Michael Jackson",[["R&B","1970s"],["R&B","1980s"],["R&B","1990s"],["Pop","1980s"],["Pop","1990s"]]],
  ["David Bowie",[["Rock","1960s"],["Rock","1970s"],["Rock","1980s"],["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Indie / Alternative","1980s"],["Indie / Alternative","1990s"]]],
  ["Queen",[["Rock","1970s"],["Rock","1980s"],["Rock","1990s"]]],
  ["Whitney Houston",[["Pop","1980s"],["Pop","1990s"],["Pop","2000s"],["R&B","1980s"],["R&B","1990s"],["R&B","2000s"]]],
  ["Marvin Gaye",[["Soul / Funk","1960s"],["Soul / Funk","1970s"],["Soul / Funk","1980s"],["R&B","1970s"],["R&B","1980s"]]],
  ["Joni Mitchell",[["Folk / Americana","1960s"],["Folk / Americana","1970s"],["Folk / Americana","1980s"],["Folk / Americana","1990s"],["Folk / Americana","2000s"]]],
  ["Pink Floyd",[["Rock","1960s"],["Rock","1970s"],["Rock","1980s"],["Rock","1990s"]]],
  ["Taylor Swift",[["Country","2000s"],["Country","2010s"],["Pop","2000s"],["Pop","2010s"],["Pop","2020s"]]],
  ["Eminem",[["Hip-Hop","1990s"],["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Beyoncé",[["R&B","2000s"],["R&B","2010s"],["R&B","2020s"],["Pop","2000s"],["Pop","2010s"],["Pop","2020s"],["Country","2020s"]]],
  ["Madonna",[["Pop","1980s"],["Pop","1990s"],["Pop","2000s"],["Pop","2010s"],["Dance / Disco","1980s"],["Dance / Disco","1990s"],["Dance / Disco","2000s"],["Dance / Disco","2010s"]]],
  ["Prince",[["Pop","1980s"],["Pop","1990s"],["R&B","1980s"],["R&B","1990s"],["Soul / Funk","1980s"],["Soul / Funk","1990s"],["Soul / Funk","2000s"]]],
  ["The Rolling Stones",[["Rock","1960s"],["Rock","1970s"],["Rock","1980s"],["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Rock","2020s"]]],
  ["Bruce Springsteen",[["Rock","1970s"],["Rock","1980s"],["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Rock","2020s"]]],
  ["U2",[["Rock","1980s"],["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Rock","2020s"]]],
  ["Metallica",[["Metal","1980s"],["Metal","1990s"],["Metal","2000s"],["Metal","2010s"],["Metal","2020s"],["Rock","1980s"],["Rock","1990s"]]],
  ["Dolly Parton",[["Country","1960s"],["Country","1970s"],["Country","1980s"],["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Willie Nelson",[["Country","1960s"],["Country","1970s"],["Country","1980s"],["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Johnny Cash",[["Country","1960s"],["Country","1970s"],["Country","1980s"],["Country","1990s"],["Country","2000s"],["Folk / Americana","1960s"],["Folk / Americana","1970s"],["Folk / Americana","1980s"],["Folk / Americana","1990s"],["Folk / Americana","2000s"]]],
  ["Bob Dylan",[["Folk / Americana","1960s"],["Folk / Americana","1970s"],["Folk / Americana","1980s"],["Folk / Americana","1990s"],["Folk / Americana","2000s"],["Folk / Americana","2010s"],["Folk / Americana","2020s"],["Rock","1960s"],["Rock","1970s"]]],
  ["Shakira",[["Latin","1990s"],["Latin","2000s"],["Latin","2010s"],["Latin","2020s"],["Pop","2000s"],["Pop","2010s"],["Pop","2020s"]]],
  ["Rihanna",[["Pop","2000s"],["Pop","2010s"],["Pop","2020s"],["R&B","2000s"],["R&B","2010s"]]],
  ["Lady Gaga",[["Pop","2000s"],["Pop","2010s"],["Pop","2020s"],["Dance / Disco","2000s"],["Dance / Disco","2010s"],["Dance / Disco","2020s"]]],
  ["The Weeknd",[["R&B","2010s"],["R&B","2020s"],["Pop","2010s"],["Pop","2020s"]]],
  ["Kendrick Lamar",[["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Jay-Z",[["Hip-Hop","1990s"],["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Kanye West",[["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Nas",[["Hip-Hop","1990s"],["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Snoop Dogg",[["Hip-Hop","1990s"],["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Lil Wayne",[["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Drake",[["Hip-Hop","2000s"],["Hip-Hop","2010s"],["Hip-Hop","2020s"]]],
  ["Janet Jackson",[["Pop","1980s"],["Pop","1990s"],["Pop","2000s"],["Pop","2010s"],["R&B","1980s"],["R&B","1990s"],["R&B","2000s"]]],
  ["Mariah Carey",[["Pop","1990s"],["Pop","2000s"],["Pop","2010s"],["Pop","2020s"],["R&B","1990s"],["R&B","2000s"],["R&B","2010s"]]],
  ["Stevie Wonder",[["Soul / Funk","1960s"],["Soul / Funk","1970s"],["Soul / Funk","1980s"],["Soul / Funk","1990s"],["Soul / Funk","2000s"],["R&B","1970s"],["R&B","1980s"]]],
  ["Aretha Franklin",[["Soul / Funk","1960s"],["Soul / Funk","1970s"],["Soul / Funk","1980s"],["Soul / Funk","1990s"]]],
  ["James Brown",[["Soul / Funk","1960s"],["Soul / Funk","1970s"],["Soul / Funk","1980s"],["Soul / Funk","1990s"]]],
  ["George Strait",[["Country","1980s"],["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Reba McEntire",[["Country","1980s"],["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Garth Brooks",[["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Shania Twain",[["Country","1990s"],["Country","2000s"],["Country","2010s"],["Country","2020s"]]],
  ["Coldplay",[["Rock","2000s"],["Rock","2010s"],["Rock","2020s"],["Indie / Alternative","2000s"],["Indie / Alternative","2010s"]]],
  ["Radiohead",[["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Indie / Alternative","1990s"],["Indie / Alternative","2000s"],["Indie / Alternative","2010s"]]],
  ["Daft Punk",[["Electronic","1990s"],["Electronic","2000s"],["Electronic","2010s"],["Dance / Disco","1990s"],["Dance / Disco","2000s"],["Dance / Disco","2010s"]]],
  ["The Cure",[["Rock","1980s"],["Rock","1990s"],["Rock","2000s"],["Rock","2010s"],["Indie / Alternative","1980s"],["Indie / Alternative","1990s"],["Indie / Alternative","2000s"],["Indie / Alternative","2010s"]]],
  ["Depeche Mode",[["Electronic","1980s"],["Electronic","1990s"],["Electronic","2000s"],["Electronic","2010s"],["Electronic","2020s"],["Indie / Alternative","1980s"],["Indie / Alternative","1990s"]]],
  ["Miley Cyrus",[["Pop","2000s"],["Pop","2010s"],["Pop","2020s"],["Country","2010s"],["Country","2020s"]]],
  ["Björk",[["Electronic","1990s"],["Electronic","2000s"],["Electronic","2010s"],["Electronic","2020s"],["Indie / Alternative","1990s"],["Indie / Alternative","2000s"],["Indie / Alternative","2010s"]]],
  ["Herbie Hancock",[["Jazz","1960s"],["Jazz","1970s"],["Jazz","1980s"],["Jazz","1990s"],["Jazz","2000s"],["Jazz","2010s"]]],
  ["Miles Davis",[["Jazz","1960s"],["Jazz","1970s"],["Jazz","1980s"],["Jazz","1990s"]]],
  ["Burning Spear",[["Reggae","1970s"],["Reggae","1980s"],["Reggae","1990s"],["Reggae","2000s"],["Reggae","2010s"]]],
  ["Jimmy Cliff",[["Reggae","1970s"],["Reggae","1980s"],["Reggae","1990s"],["Reggae","2000s"],["Reggae","2010s"]]],
  ["Fela Kuti",[["Afrobeats / Afrobeat","1970s"],["Afrobeats / Afrobeat","1980s"],["Afrobeats / Afrobeat","1990s"]]],
  ["Burna Boy",[["Afrobeats / Afrobeat","2010s"],["Afrobeats / Afrobeat","2020s"]]],
  ["BTS",[["K-Pop","2010s"],["K-Pop","2020s"]]],
  ["BLACKPINK",[["K-Pop","2010s"],["K-Pop","2020s"]]]
];
for(const [name,cards] of CAREER_EXPANSIONS)for(const [genre,decade] of cards)addCareerCard(name,genre,decade);

// Era rarity can differ from career rarity. Rarity affects pull odds only, never stats.
const CARD_RARITY_OVERRIDES = {
  "Michael Jackson|1970s":"Epic","Michael Jackson|1980s":"Legendary","Michael Jackson|1990s":"Legendary",
  "David Bowie|1960s":"Epic","David Bowie|1970s":"Legendary","David Bowie|1980s":"Legendary","David Bowie|1990s":"Epic","David Bowie|2000s":"Epic","David Bowie|2010s":"Epic",
  "Queen|1970s":"Legendary","Queen|1980s":"Legendary","Queen|1990s":"Epic",
  "Whitney Houston|1980s":"Legendary","Whitney Houston|1990s":"Legendary","Whitney Houston|2000s":"Epic",
  "Marvin Gaye|1960s":"Legendary","Marvin Gaye|1970s":"Legendary","Marvin Gaye|1980s":"Epic",
  "Joni Mitchell|1960s":"Legendary","Joni Mitchell|1970s":"Legendary","Joni Mitchell|1980s":"Epic","Joni Mitchell|1990s":"Epic","Joni Mitchell|2000s":"Rare",
  "Pink Floyd|1960s":"Epic","Pink Floyd|1970s":"Legendary","Pink Floyd|1980s":"Epic","Pink Floyd|1990s":"Epic",
  "Taylor Swift|2000s":"Rare","Taylor Swift|2010s":"Epic","Taylor Swift|2020s":"Legendary",
  "Eminem|1990s":"Rare","Eminem|2000s":"Epic","Eminem|2010s":"Epic","Eminem|2020s":"Rare",
  "The Rolling Stones|1960s":"Legendary","The Rolling Stones|1970s":"Legendary","The Rolling Stones|1980s":"Epic","The Rolling Stones|1990s":"Epic","The Rolling Stones|2000s":"Rare","The Rolling Stones|2010s":"Rare","The Rolling Stones|2020s":"Rare",
  "Johnny Cash|1960s":"Legendary","Johnny Cash|1970s":"Legendary","Johnny Cash|1980s":"Epic","Johnny Cash|1990s":"Epic","Johnny Cash|2000s":"Legendary",
  "Dolly Parton|1970s":"Legendary","Dolly Parton|1980s":"Legendary","Dolly Parton|1990s":"Epic","Dolly Parton|2000s":"Epic","Dolly Parton|2010s":"Epic","Dolly Parton|2020s":"Epic",
  "Metallica|1980s":"Legendary","Metallica|1990s":"Legendary","Metallica|2000s":"Epic","Metallica|2010s":"Epic","Metallica|2020s":"Epic"
};
function rarityFor(name,decade){
  const era=decade||((typeof state!=="undefined"&&state.currentPool)?state.currentPool.decade:null);
  const card=era?CARD_RARITY_OVERRIDES[`${name}|${era}`]:null;
  if(card)return card;
  if(OVERRIDES[name]?.rarity)return OVERRIDES[name].rarity;
  if(LEGENDARY.has(name))return "Legendary";
  if(EPIC.has(name))return "Epic";
  if(RARE.has(name))return "Rare";
  if(UNCOMMON.has(name))return "Uncommon";
  return "Common";
}
