const DATA = [...DATA_PART_1,...DATA_PART_2,...DATA_PART_3,...DATA_PART_4];
const pools = DATA.map(([genre, decade, artists]) => ({genre, decade, artists}));

const RARITY_ORDER = ["Common","Uncommon","Rare","Epic","Legendary"];
const RARITY_WEIGHT = {Common:1.0,Uncommon:.68,Rare:.34,Epic:.15,Legendary:.045};
const BASE = {Common:68,Uncommon:75,Rare:82,Epic:88,Legendary:94};

const LEGENDARY = new Set(["Michael Jackson","The Beatles","Prince","Beyoncé","Taylor Swift","Stevie Wonder","Madonna","David Bowie","Daft Punk","Kendrick Lamar","Queen","Whitney Houston","Marvin Gaye","Johnny Cash","Dolly Parton","Bob Dylan","Joni Mitchell","Bob Marley & The Wailers","Miles Davis","John Coltrane","Nina Simone","Metallica","Black Sabbath","Aretha Franklin","James Brown","Jimi Hendrix","Led Zeppelin","Bruce Springsteen","Radiohead","Nirvana","Pink Floyd","2Pac","The Notorious B.I.G.","Fela Kuti","Bad Bunny","BTS"]);
const EPIC = new Set(["The Rolling Stones","Fleetwood Mac","U2","Rihanna","Lady Gaga","Adele","The Weeknd","Frank Ocean","SZA","Jay-Z","Eminem","Kanye West","OutKast","Lauryn Hill","Amy Winehouse","Billie Eilish","Lana Del Rey","The Cure","The Clash","Janet Jackson","Sade","Earth, Wind & Fire","Willie Nelson","Garth Brooks","Shania Twain","George Strait","Patsy Cline","Loretta Lynn","Merle Haggard","Chris Stapleton","Kacey Musgraves","Iron Maiden","Tool","Slayer","Megadeth","System of a Down","Slipknot","Herbie Hancock","Ella Fitzgerald","Thelonious Monk","Charles Mingus","Peter Tosh","Jimmy Cliff","Toots and the Maytals","Burning Spear","Neil Young","Leonard Cohen","Simon & Garfunkel","Carole King","Burna Boy","Wizkid","Angélique Kidjo","BLACKPINK","BIGBANG","Girls’ Generation","Kraftwerk","Ramones","Donna Summer","ABBA","Diana Ross","Al Green","Curtis Mayfield","Selena","Shakira","Daddy Yankee"]);
const RARE = new Set(["The Who","The Doors","Janis Joplin","Pearl Jam","Red Hot Chili Peppers","Oasis","Foo Fighters","Green Day","The White Stripes","The Killers","Arctic Monkeys","Muse","Linkin Park","Coldplay","The Beach Boys","The Kinks","AC/DC","The Police","Talking Heads","R.E.M.","Soundgarden","Alice in Chains","The Smashing Pumpkins","Rage Against the Machine","Nine Inch Nails","Queens of the Stone Age","Britney Spears","Mariah Carey","Bruno Mars","Ariana Grande","Dua Lipa","Olivia Rodrigo","Doja Cat","Harry Styles","George Michael","Tina Turner","Kate Bush","Miley Cyrus","Charli xcx","RAYE","Run-D.M.C.","Public Enemy","Beastie Boys","N.W.A","Nas","Wu-Tang Clan","Snoop Dogg","Lil Wayne","Missy Elliott","Drake","J. Cole","Travis Scott","Nicki Minaj","Future","Tyler, the Creator","A Tribe Called Quest","Dr. Dre","Ice Cube","The Roots","TLC","Mary J. Blige","Usher","Aaliyah","Alicia Keys","Erykah Badu","Solange","Miguel","D’Angelo","Maxwell","New Order","Depeche Mode","The Chemical Brothers","The Prodigy","Justice","LCD Soundsystem","Calvin Harris","Disclosure","Skrillex","Fred again..","Jamie xx","Aphex Twin","Björk","Massive Attack","Portishead","Four Tet","The Smiths","Pixies","Blur","Beck","Arcade Fire","The Strokes","Vampire Weekend","Tame Impala","Lorde","Florence + the Machine","PJ Harvey","Pavement","Bon Iver","Bee Gees","Chic","My Chemical Romance","Fall Out Boy","Paramore","Blink-182","Otis Redding","Sam Cooke","Anderson .Paak","Janelle Monáe","Rosalía","Karol G","Celia Cruz","Marc Anthony","Reba McEntire","Waylon Jennings","Emmylou Harris","Carrie Underwood","Miranda Lambert","Zach Bryan","Tyler Childers","Sturgill Simpson","Pantera","Ozzy Osbourne","Dio","Deftones","Gojira","Ghost","Mastodon","Pat Metheny Group","Wynton Marsalis","Esperanza Spalding","Kamasi Washington","Pharoah Sanders","Sun Ra","Robert Glasper","Sean Paul","Damian Marley","Buju Banton","Steel Pulse","Chronixx","Koffee","Tracy Chapman","Jeff Buckley","Elliott Smith","Sufjan Stevens","Fleet Foxes","Phoebe Bridgers","Hozier","Femi Kuti","Tony Allen","Youssou N’Dour","Davido","Tems","Rema","Tyla","2NE1","SHINee","TWICE","EXO","IU","SEVENTEEN","Stray Kids"]);
const UNCOMMON = new Set(["Sabrina Carpenter","Chappell Roan","Megan Thee Stallion","JID","Little Simz","Victoria Monét","Steve Lacy","Giveon","Peggy Gou","RÜFÜS DU SOL","Bicep","boygenius","Japanese Breakfast","Big Thief","Wet Leg","Clairo","Jessie Ware","Kaytranada","Jungle","Turnstile","Måneskin","Sam Fender","Mitski","HAIM","Gracie Abrams","Tate McRae","Teddy Swims","Fontaines D.C.","The Smile","IDLES","Jelly Roll","Lainey Wilson","Megan Moroney","Sleep Token","Spiritbox","Knocked Loose","BADBADNOTGOOD","Yussef Dayes","Laufey","Samara Joy","Nubya Garcia","Ezra Collective","Protoje","Popcaan","Shenseea","Noah Kahan","Waxahatchee","Adrianne Lenker","Sierra Ferrell","Asake","Ayra Starr","Fireboy DML","Omah Lay","Amaarae","NewJeans","aespa","LE SSERAFIM","IVE","(G)I-DLE","ATEEZ"]);

const OVERRIDES = {
  "Michael Jackson":{rarity:"Legendary",live:99,hits:100,influence:100,buzz:87,critic:94,catalog:100},
  "Benson Boone":{rarity:"Common",live:78,hits:82,influence:55,buzz:93,critic:69,catalog:58},
  "Beyoncé":{rarity:"Legendary",live:100,hits:99,influence:100,buzz:95,critic:99,catalog:100},
  "Prince":{rarity:"Legendary",live:100,hits:97,influence:100,buzz:85,critic:100,catalog:99},
  "The Beatles":{rarity:"Legendary",live:95,hits:100,influence:100,buzz:80,critic:100,catalog:100},
  "Taylor Swift":{rarity:"Legendary",live:97,hits:100,influence:98,buzz:100,critic:92,catalog:100},
  "Daft Punk":{rarity:"Legendary",live:99,hits:93,influence:100,buzz:81,critic:99,catalog:96},
  "Kendrick Lamar":{rarity:"Legendary",live:98,hits:94,influence:100,buzz:96,critic:100,catalog:98},
  "Stevie Wonder":{rarity:"Legendary",live:99,hits:98,influence:100,buzz:72,critic:100,catalog:100},
  "David Bowie":{rarity:"Legendary",live:96,hits:94,influence:100,buzz:92,critic:100},
  "Queen":{rarity:"Legendary",live:100,hits:98,influence:97,buzz:95,critic:91},
  "Whitney Houston":{rarity:"Legendary",live:99,hits:98,influence:96,buzz:91,critic:94},
  "Marvin Gaye":{rarity:"Legendary",live:96,hits:96,influence:100,buzz:87,critic:100},
  "Johnny Cash":{rarity:"Legendary",live:96,hits:94,influence:100,buzz:72,critic:98,catalog:100},
  "Dolly Parton":{rarity:"Legendary",live:95,hits:96,influence:99,buzz:82,critic:97,catalog:100},
  "Bob Dylan":{rarity:"Legendary",live:88,hits:91,influence:100,buzz:66,critic:100,catalog:100},
  "Joni Mitchell":{rarity:"Legendary",live:94,hits:91,influence:100,buzz:88,critic:100},
  "Bob Marley & The Wailers":{rarity:"Legendary",live:98,hits:96,influence:100,buzz:78,critic:98,catalog:98},
  "Miles Davis":{rarity:"Legendary",live:94,hits:72,influence:100,buzz:58,critic:100,catalog:99},
  "John Coltrane":{rarity:"Legendary",live:98,hits:82,influence:100,buzz:86,critic:100},
  "Nina Simone":{rarity:"Legendary",live:98,hits:91,influence:100,buzz:90,critic:100},
  "Metallica":{rarity:"Legendary",live:100,hits:94,influence:98,buzz:82,critic:91,catalog:99},
  "Black Sabbath":{rarity:"Legendary",live:97,hits:90,influence:100,buzz:89,critic:98},
  "Aretha Franklin":{rarity:"Legendary",live:100,hits:97,influence:100,buzz:90,critic:100},
  "James Brown":{rarity:"Legendary",live:100,hits:94,influence:100,buzz:90,critic:98},
  "Jimi Hendrix":{rarity:"Legendary",live:100,hits:91,influence:100,buzz:95,critic:100},
  "Led Zeppelin":{rarity:"Legendary",live:100,hits:96,influence:100,buzz:94,critic:98},
  "Bruce Springsteen":{rarity:"Legendary",live:100,hits:96,influence:99,buzz:92,critic:95},
  "Radiohead":{rarity:"Legendary",live:96,hits:90,influence:100,buzz:93,critic:100},
  "Nirvana":{rarity:"Legendary",live:98,hits:93,influence:100,buzz:95,critic:99},
  "Pink Floyd":{rarity:"Legendary",live:98,hits:97,influence:100,buzz:91,critic:100},
  "2Pac":{rarity:"Legendary",live:96,hits:96,influence:100,buzz:94,critic:92},
  "The Notorious B.I.G.":{rarity:"Legendary",live:91,hits:96,influence:100,buzz:91,critic:97},
  "Fela Kuti":{rarity:"Legendary",live:98,hits:76,influence:100,buzz:63,critic:98,catalog:96},
  "Bad Bunny":{rarity:"Legendary",live:96,hits:96,influence:94,buzz:100,critic:91},
  "BTS":{rarity:"Legendary",live:97,hits:96,influence:93,buzz:98,critic:84,catalog:90},
  "The Rolling Stones":{rarity:"Epic",live:99,hits:98,influence:100,buzz:92,critic:96},
  "Willie Nelson":{rarity:"Epic",live:96,hits:94,influence:99,buzz:88,critic:94},
  "Garth Brooks":{rarity:"Epic",live:99,hits:99,influence:95,buzz:88,critic:83},
  "Shania Twain":{rarity:"Epic",live:96,hits:98,influence:91,buzz:88,critic:86},
  "George Strait":{rarity:"Epic",live:96,hits:98,influence:95,buzz:84,critic:86},
  "Chris Stapleton":{rarity:"Epic",live:99,hits:92,influence:91,buzz:93,critic:94},
  "Iron Maiden":{rarity:"Epic",live:100,hits:91,influence:97,buzz:88,critic:91},
  "Tool":{rarity:"Epic",live:99,hits:84,influence:96,buzz:91,critic:97},
  "Herbie Hancock":{rarity:"Epic",live:96,hits:82,influence:99,buzz:89,critic:99},
  "Ella Fitzgerald":{rarity:"Epic",live:99,hits:93,influence:100,buzz:84,critic:100},
  "Peter Tosh":{rarity:"Epic",live:97,hits:88,influence:97,buzz:83,critic:93},
  "Jimmy Cliff":{rarity:"Epic",live:96,hits:92,influence:96,buzz:84,critic:94},
  "Neil Young":{rarity:"Epic",live:96,hits:93,influence:99,buzz:87,critic:98},
  "Leonard Cohen":{rarity:"Epic",live:90,hits:88,influence:100,buzz:85,critic:100},
  "Burna Boy":{rarity:"Epic",live:97,hits:91,influence:92,buzz:98,critic:90},
  "Wizkid":{rarity:"Epic",live:94,hits:92,influence:90,buzz:94,critic:86},
  "BLACKPINK":{rarity:"Epic",live:98,hits:93,influence:89,buzz:99,critic:84},
  "Billie Eilish":{rarity:"Epic",live:94,hits:94,influence:89,buzz:96,critic:95,catalog:84},
  "Chappell Roan":{rarity:"Uncommon",live:92,hits:84,influence:69,buzz:99,critic:92,catalog:67},
  "Sabrina Carpenter":{rarity:"Uncommon",live:88,hits:91,influence:67,buzz:98,critic:82,catalog:76}
};

function hashName(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function clamp(n,a=50,b=100){return Math.max(a,Math.min(b,n))}
function rarityFor(name){if(OVERRIDES[name]?.rarity)return OVERRIDES[name].rarity;if(LEGENDARY.has(name))return "Legendary";if(EPIC.has(name))return "Epic";if(RARE.has(name))return "Rare";if(UNCOMMON.has(name))return "Uncommon";return "Common"}
