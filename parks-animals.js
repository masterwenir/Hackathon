/**
 * Regionally appropriate wildlife examples per park. Rarities are for
 * at-a-glance interest (not strict biological census). Always follow NPS
 * wildlife distance rules in the field.
 */
const RARITY_ORDER = [
  { id: "common", label: "Common" },
  { id: "rare", label: "Rare" },
  { id: "epic", label: "Epic" },
  { id: "mythic", label: "Mythic" },
  { id: "legendary", label: "Legendary" },
  { id: "ultra-legendary", label: "Ultra legendary" }
];

function slugifyParkName(name) {
  return name
    .toLowerCase()
    .replace(/and preserve/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseWildlifeString(s) {
  if (!s) return [];
  return s.split("|").map((part) => {
    const i = part.lastIndexOf(":");
    const name = (i === -1 ? part : part.slice(0, i)).trim();
    const rarity = (i === -1 ? "common" : part.slice(i + 1)).trim().toLowerCase();
    return { name, rarity: rarity.replace(/\s+/g, "-") };
  });
}

function normalizeRarityId(r) {
  const m = {
    common: "common",
    rare: "rare",
    epic: "epic",
    mythic: "mythic",
    legendary: "legendary",
    "ultra-legendary": "ultra-legendary",
    "ultra legendary": "ultra-legendary"
  };
  return m[r] || "common";
}

const T = {
  NE_MARINE:
    "White-tailed deer:common|Gray squirrel:common|Eastern coyote:rare|Wild turkey:rare|Black bear:epic|Bobcat:mythic|Common loon:legendary|Harbor seal:ultra-legendary",
  PACIFIC_TROPICAL:
    "Gecko:common|Polynesian rat:common|Hermit crab:rare|Fruit bat:rare|Sea turtle:epic|Coconut crab:mythic|Humpback whale:legendary|Reef shark:ultra-legendary",
  UT_PLATEAU:
    "Mule deer:common|Desert cottontail:common|Coyote:rare|Desert bighorn sheep:epic|Kit fox:mythic|Golden eagle:legendary|Mountain lion:ultra-legendary|Great horned owl:rare",
  PRAIRIE_BADLANDS:
    "Pronghorn:common|Prairie dog:common|Coyote:rare|Mule deer:rare|Bighorn sheep:epic|Bison:mythic|Black-footed ferret:legendary|Badger:ultra-legendary",
  CHIHUAHUAN:
    "Black-tailed jackrabbit:common|Desert cottontail:common|Coyote:rare|Javelina:epic|Kit fox:mythic|Greater roadrunner:legendary|Mexican free-tailed bat:ultra-legendary|Mountain lion:rare",
  ATLANTIC_MARINE:
    "Osprey:common|Heron:common|Manatee:rare|Dolphin:epic|American crocodile:mythic|Green sea turtle:legendary|Leatherback sea turtle:ultra-legendary|Coral reef fish:common",
  CHIHUAHUAN_CAVE:
    "Cave cricket:common|Millipede:common|Ringtail:rare|Townsend's big-eared bat:epic|Cave swallow:mythic|Javelina:legendary|Mexican free-tailed bat:ultra-legendary|Porcupine:rare",
  CA_CHANNEL:
    "Harbor seal:common|Sea lion:common|Island fox:epic|Garibaldi:common|Bald eagle:legendary|Leatherback sea turtle:ultra-legendary|Blue whale:mythic|Dolphin:rare",
  SOUTHEAST_SWAMP:
    "Prothonotary warbler:common|Wading birds:common|Raccoon:rare|Barred owl:epic|Otter:mythic|Alligator:legendary|Cottonmouth:rare|Black bear:ultra-legendary",
  CASCADES:
    "Black-tailed deer:common|Douglas squirrel:common|American pika:rare|Hoary marmot:epic|Black bear:legendary|Elk:mythic|Wolverine:ultra-legendary|Cougar:rare",
  MIDWEST_FOREST:
    "White-tailed deer:common|Gray fox:rare|Coyote:common|Beaver:epic|Bald eagle:legendary|River otter:mythic|Timber wolf:ultra-legendary|Box turtle:rare",
  MOJAVE:
    "Desert cottontail:common|Black-tailed jackrabbit:common|Coyote:rare|Desert bighorn sheep:epic|Desert tortoise:legendary|Kit fox:mythic|Leopard lizard:ultra-legendary|Sidewinder:rare",
  ALASKA_TAIGA:
    "Arctic ground squirrel:common|Snowshoe hare:common|Dall sheep:epic|Grizzly bear:legendary|Caribou:mythic|Gray wolf:ultra-legendary|Lynx:rare|Wolverine:mythic",
  ARCTIC:
    "Arctic ground squirrel:common|Lemming:common|Dall sheep:epic|Arctic fox:rare|Grizzly bear:legendary|Caribou:mythic|Wolf:ultra-legendary|Peregrine falcon:mythic",
  URBAN:
    "Eastern cottontail:common|Gray squirrel:common|Chimney swift:common|Red-tailed hawk:rare|Peregrine falcon:epic|Bald eagle:legendary|Coyote:ultra-legendary|Deer:mythic",
  ALASKA_MARINE:
    "Steller sea lion:common|Harbor seal:common|Bald eagle:rare|Humpback whale:epic|Orca:legendary|Sea otter:mythic|Brown bear:ultra-legendary|Puffin:rare",
  NORTHERN_ROCKIES:
    "Mule deer:common|Bighorn sheep:epic|Grizzly bear:legendary|Wolf:ultra-legendary|Lynx:mythic|Osprey:common|Bald eagle:rare|Elk:epic",
  CO_PLATEAU:
    "Mule deer:common|Coyote:rare|Elk:epic|Bighorn sheep:legendary|Bobcat:mythic|Golden eagle:ultra-legendary|California condor:mythic|Raven:common",
  BASIN:
    "Mule deer:common|Pygmy rabbit:epic|Coyote:rare|Bighorn sheep:epic|Pronghorn:mythic|Long-nosed leopard lizard:legendary|Elk:ultra-legendary|Bobcat:rare",
  ROCKY_DUNES:
    "Elk:common|Deer:common|Coyote:rare|Pronghorn:epic|Black bear:legendary|Bobcat:mythic|Bighorn sheep:ultra-legendary|Badger:rare",
  APPALACHIAN:
    "White-tailed deer:common|Black bear:epic|Wild turkey:common|Bobcat:mythic|Copperhead:rare|Timber rattlesnake:legendary|Elk:ultra-legendary|Scarlet tanager:common",
  HAWAII:
    "Hawaiian goose:epic|Gecko:common|Monarch butterfly:common|Dolphin:rare|Humpback whale:legendary|Hawaiian hoary bat:mythic|Hawksbill sea turtle:ultra-legendary|Nene:legendary",
  OZARK:
    "White-tailed deer:common|Raccoon:common|Armadillo:rare|Bald eagle:epic|Black bear:legendary|Beaver:mythic|Elk:ultra-legendary|Fox:rare",
  GREAT_LAKES:
    "White-tailed deer:common|Coyote:rare|Red fox:common|Sandhill crane:epic|Bald eagle:legendary|Black bear:ultra-legendary|Badger:mythic|Toad:common",
  BOREAL_ISLE:
    "Moose:common|Beaver:common|Gray wolf:legendary|Loons:common|River otter:mythic|Lynx:ultra-legendary|Arctic hare:rare|Snowshoe hare:epic",
  ALASKA_BROWN:
    "Coastal brown bear:ultra-legendary|Bald eagle:common|Salmon:common|Harbor seal:rare|Sea otter:epic|Killer whale:legendary|Wolf:mythic|Puffin:rare",
  SIERRA:
    "Mule deer:common|Black bear:epic|Sierra Nevada bighorn:legendary|Mountain lion:ultra-legendary|Pika:mythic|Marmot:common|Goshawk:rare|Cougar:epic",
  PNW_PEN:
    "Roosevelt elk:common|Black-tailed deer:common|Black bear:epic|Cougar:ultra-legendary|Gray whale:mythic|Bald eagle:common|Salmon:legendary|Bobcat:rare",
  PNW_RAIN:
    "Roosevelt elk:epic|Black bear:common|Salmon:legendary|Cougar:ultra-legendary|Marbled murrelet:mythic|Banana slug:common|Owl:mythic|Raven:common",
  SOUTHERN_ROCKIES:
    "Elk:common|Abert's squirrel:common|Mule deer:epic|Bighorn sheep:legendary|Moose:mythic|Lynx:ultra-legendary|Bald eagle:rare|Black bear:epic",
  SONORAN:
    "Saguaro:common|Gila woodpecker:common|Gambel's quail:common|Coyote:rare|Javelina:epic|Desert bighorn:legendary|Mountain lion:ultra-legendary|Gila monster:mythic",
  CA_COAST_INLAND:
    "California quail:common|Gray fox:rare|Condor:ultra-legendary|Bobcat:epic|Badger:legendary|Tule elk:mythic|Rattlesnake:rare|Salamander:common",
  YELLOWSTONE:
    "Bison:common|Elk:common|Grizzly bear:legendary|Gray wolf:ultra-legendary|Pronghorn:epic|Bald eagle:mythic|Bobcat:rare|Trumpeter swan:legendary",
  EVERGLADES:
    "Wading birds:common|Anhinga:common|Raccoon:rare|Alligator:epic|Burmese python:mythic|West Indian manatee:legendary|American crocodile:ultra-legendary|White-tailed deer:common",
  ZION:
    "Mule deer:common|Rock squirrel:common|Canyon wren:common|Bighorn sheep:epic|Ringtail:legendary|Condor:ultra-legendary|Mountain lion:mythic|Rattlesnake:rare",
  CARIB_TROP:
    "Iguana:common|Gecko:common|Deer:common|Donkey:mythic|Hawksbill sea turtle:ultra-legendary|Coral fish:common|Dolphin:epic|Hummingbird:rare",
  BOREAL_LAKES:
    "Moose:common|Beaver:common|Loons:epic|Black bear:legendary|Wolf:ultra-legendary|Bald eagle:common|Lynx:mythic|Otter:rare"
};

const SLUG_TO_TEMPLATE = {
  "acadia-national-park": "NE_MARINE",
  "american-samoa-national-park": "PACIFIC_TROPICAL",
  "arches-national-park": "UT_PLATEAU",
  "badlands-national-park": "PRAIRIE_BADLANDS",
  "big-bend-national-park": "CHIHUAHUAN",
  "biscayne-national-park": "ATLANTIC_MARINE",
  "black-canyon-of-the-gunnison-national-park": "UT_PLATEAU",
  "bryce-canyon-national-park": "UT_PLATEAU",
  "canyonlands-national-park": "UT_PLATEAU",
  "capitol-reef-national-park": "UT_PLATEAU",
  "carlsbad-caverns-national-park": "CHIHUAHUAN_CAVE",
  "channel-islands-national-park": "CA_CHANNEL",
  "congaree-national-park": "SOUTHEAST_SWAMP",
  "crater-lake-national-park": "CASCADES",
  "cuyahoga-valley-national-park": "MIDWEST_FOREST",
  "death-valley-national-park": "MOJAVE",
  "denali-national-park": "ALASKA_TAIGA",
  "dry-tortugas-national-park": "ATLANTIC_MARINE",
  "everglades-national-park": "EVERGLADES",
  "gates-of-the-arctic-national-park": "ARCTIC",
  "gateway-arch-national-park": "URBAN",
  "glacier-bay-national-park": "ALASKA_MARINE",
  "glacier-national-park": "NORTHERN_ROCKIES",
  "grand-canyon-national-park": "CO_PLATEAU",
  "grand-teton-national-park": "NORTHERN_ROCKIES",
  "great-basin-national-park": "BASIN",
  "great-sand-dunes-national-park": "ROCKY_DUNES",
  "great-smoky-mountains-national-park": "APPALACHIAN",
  "guadalupe-mountains-national-park": "CHIHUAHUAN",
  "haleakala-national-park": "HAWAII",
  "hawaii-volcanoes-national-park": "HAWAII",
  "hot-springs-national-park": "OZARK",
  "indiana-dunes-national-park": "GREAT_LAKES",
  "isle-royale-national-park": "BOREAL_ISLE",
  "joshua-tree-national-park": "MOJAVE",
  "katmai-national-park": "ALASKA_BROWN",
  "kenai-fjords-national-park": "ALASKA_MARINE",
  "kings-canyon-national-park": "SIERRA",
  "kobuk-valley-national-park": "ARCTIC",
  "lake-clark-national-park": "ALASKA_BROWN",
  "lassen-volcanic-national-park": "CASCADES",
  "mammoth-cave-national-park": "APPALACHIAN",
  "mesa-verde-national-park": "CO_PLATEAU",
  "mount-rainier-national-park": "CASCADES",
  "new-river-gorge-national-park": "APPALACHIAN",
  "north-cascades-national-park": "CASCADES",
  "olympic-national-park": "PNW_PEN",
  "petrified-forest-national-park": "CO_PLATEAU",
  "pinnacles-national-park": "CA_COAST_INLAND",
  "redwood-national-park": "PNW_RAIN",
  "rocky-mountain-national-park": "SOUTHERN_ROCKIES",
  "saguaro-national-park": "SONORAN",
  "sequoia-national-park": "SIERRA",
  "shenandoah-national-park": "APPALACHIAN",
  "theodore-roosevelt-national-park": "PRAIRIE_BADLANDS",
  "virgin-islands-national-park": "CARIB_TROP",
  "voyageurs-national-park": "BOREAL_LAKES",
  "white-sands-national-park": "CHIHUAHUAN",
  "wind-cave-national-park": "PRAIRIE_BADLANDS",
  "wrangell-st-elias-national-park": "ALASKA_TAIGA",
  "yellowstone-national-park": "YELLOWSTONE",
  "yosemite-national-park": "SIERRA",
  "zion-national-park": "ZION"
};

function getAnimalsForPark(park) {
  const slug = slugifyParkName(park.name);
  const key = SLUG_TO_TEMPLATE[slug];
  if (!key || !T[key]) {
    return parseWildlifeString(T.UT_PLATEAU);
  }
  const list = parseWildlifeString(T[key]);
  return list.map((a) => ({
    name: a.name,
    rarity: normalizeRarityId(a.rarity)
  }));
}

function groupAnimalsByRarity(animals) {
  const orderIndex = RARITY_ORDER.reduce((acc, r, i) => {
    acc[r.id] = i;
    return acc;
  }, {});
  const groups = RARITY_ORDER.map((r) => ({ ...r, animals: [] }));
  for (const a of animals) {
    const id = RARITY_ORDER.some((r) => r.id === a.rarity) ? a.rarity : "common";
    const slot = groups.find((g) => g.id === id);
    if (slot && !slot.animals.includes(a.name)) {
      slot.animals.push(a.name);
    }
  }
  return groups.filter((g) => g.animals.length);
}
