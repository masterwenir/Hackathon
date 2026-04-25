const parkContent = document.getElementById("park-content");
const pagePath = window.location.pathname;
const slug = pagePath.split("/").pop().replace(".html", "");
const park = getParkBySlug(slug);

function terrainLabel(terrain) {
  return terrain
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" / ");
}

function buildChecklist(parkName) {
  const parkSpecific = {
    "Acadia National Park": [
      "Reserve Cadillac Mountain vehicle access if your visit date requires it.",
      "Plan parking and shuttle timing for Park Loop Road and major trailheads.",
      "Check tide and fog forecasts for coastal trails and shoreline stops.",
      "Carry rain layers even on clear mornings; weather shifts quickly on exposed ledges.",
      "Group activities by east/west side of Mount Desert Island to reduce backtracking."
    ],
    "Yellowstone National Park": [
      "Check geothermal area closures and boardwalk conditions before planning your route.",
      "Build extra drive time for wildlife traffic stops, especially in Hayden and Lamar valleys.",
      "Reserve lodging or campsites well ahead because in-park demand fills quickly.",
      "Download offline maps for loop roads and major basins before entering the park.",
      "Plan your day by zone to avoid long cross-park zigzags."
    ],
    "Hawaii Volcanoes National Park": [
      "Review current volcanic updates and air quality advisories before entering the park.",
      "Pack rain and sun layers; weather shifts quickly between elevation zones.",
      "Check Chain of Craters Road conditions and any active closure notices.",
      "Bring sturdy footwear for rough lava terrain and uneven footing.",
      "Plan fuel and food timing since services are limited in some areas."
    ],
    "Yosemite National Park": [
      "Verify reservation/timed-entry rules for your travel dates before arrival.",
      "Use shuttle and parking plans early because Yosemite Valley fills fast.",
      "Check waterfall flow conditions by season to prioritize viewpoints.",
      "Reserve popular permits (e.g., wilderness or special routes) in advance.",
      "Preload maps due to weak service in valley and high-country sections."
    ],
    "Zion National Park": [
      "Check shuttle schedule and stop access before building your daily itinerary.",
      "Monitor flash flood risk for canyon routes and narrow-slot hikes.",
      "Confirm permit requirements for any advanced route plans.",
      "Carry enough water for exposed slickrock and high-heat conditions.",
      "Start very early for major trailheads and cooler hiking windows."
    ],
    "Grand Canyon National Park": [
      "Map your route by rim sector first (South Rim villages, Hermit corridor, Desert View).",
      "Check water station status for below-rim routes before committing to trail mileage.",
      "Use shuttle plans for high-demand viewpoints and trailheads.",
      "Build larger time buffers for ascent than descent when hiking into the canyon.",
      "Track heat forecast by inner-canyon zone, not just rim temperatures."
    ],
    "Rocky Mountain National Park": [
      "Verify timed-entry windows and permit timing before departure.",
      "Check Trail Ridge Road openings and weather advisories for elevation changes.",
      "Split day plans between Bear Lake corridor and west-side routes to reduce transit loss.",
      "Prepare for altitude effects with slower pacing and hydration targets.",
      "Plan storm-safe turnaround times for exposed alpine segments."
    ],
    "Great Smoky Mountains National Park": [
      "Check road closures from weather/flooding before deciding valley loops.",
      "Prioritize one side of the park per day to avoid long cross-park drives.",
      "Start early for Cades Cove/Newfound Gap congestion windows.",
      "Confirm parking tags/requirements and trailhead access details in advance.",
      "Use low-signal navigation backups for mountain hollows and interior roads."
    ],
    "Olympic National Park": [
      "Plan by zone (coast, rainforest, alpine) because travel between zones takes time.",
      "Check tide charts before visiting beaches with headland crossings.",
      "Track mountain pass and weather alerts if combining alpine and coastal days.",
      "Reserve key lodging/camp areas early, especially summer weekends.",
      "Carry rain protection all day even if forecast looks light."
    ],
    "Glacier National Park": [
      "Confirm Going-to-the-Sun Road status and entry rules before arrival.",
      "Check shuttle and parking plans for Logan Pass and high-demand trailheads.",
      "Set realistic daily distances; mountain travel takes longer than map estimates.",
      "Review bear-safety requirements and food storage rules for each stop.",
      "Build alternate plans for smoke or weather changes at elevation."
    ],
    "Hawaii Volcanoes National Park": [
      "Review current volcanic updates and air quality advisories before entering the park.",
      "Pack rain and sun layers; weather shifts quickly between elevation zones.",
      "Check Chain of Craters Road conditions and any active closure notices.",
      "Bring sturdy footwear for rough lava terrain and uneven footing.",
      "Plan fuel and food timing since services are limited in some areas."
    ],
    "Bryce Canyon National Park": [
      "Check sunrise/sunset timing early; rim viewpoints are core itinerary anchors.",
      "Layer for cold mornings and warm afternoons due elevation-driven swings.",
      "Group rim viewpoints and below-rim hikes to minimize repeated climbs.",
      "Confirm winter traction needs in shoulder seasons.",
      "Start shuttle or parking plans early for peak-season rim access."
    ]
  };

  if (parkSpecific[parkName]) return parkSpecific[parkName];

  return [
    `Confirm current ${parkName} alerts, weather, and closures 24-48 hours before travel.`,
    "Download offline navigation before entry because signal coverage may be patchy.",
    "Pack location-appropriate layers, sun protection, and hydration reserves.",
    "Check permits, timed entry, and shuttle policies relevant to your date range.",
    "Use an early-start schedule to reduce crowding and weather risk."
  ];
}

function buildSafetyNotes(park) {
  const parkSpecificSafety = {
    "Acadia National Park": [
      "Wet granite and cliff edges become slick quickly in fog and drizzle.",
      "Keep distance from surf zones and tide-exposed ledges during rough seas.",
      "Use marked routes on narrow cliff trails to reduce fall risk.",
      "Watch bike-car interactions closely around carriage roads and crossings."
    ],
    "Grand Canyon National Park": [
      "Treat below-rim hikes as heat and elevation events, not short scenic walks.",
      "Pace hydration and salts continuously; heat stress can escalate quickly.",
      "Turn around at planned time limits even if destination remains ahead.",
      "Avoid cliff-edge selfies and unstable rim-side footing."
    ],
    "Yellowstone National Park": [
      "Stay on boardwalks in thermal areas; ground can be dangerously thin.",
      "Keep strict wildlife distance even when animals are near roads.",
      "Do not stop in blind traffic zones during wildlife sightings.",
      "Prepare for sudden weather shifts between basins and higher terrain."
    ],
    "Yosemite National Park": [
      "River currents can be stronger than expected near polished granite banks.",
      "Waterfall mist zones and polished stone surfaces are often extremely slick.",
      "Bear safety rules apply at trailheads, parking areas, and overnight sites.",
      "Thunderstorms can build fast in high-country zones."
    ],
    "Zion National Park": [
      "Flash flood potential can change rapidly; check canyon risk before entry.",
      "Heat buildup in exposed canyon routes requires strict water pacing.",
      "Narrow cliffside trail sections require spacing and controlled movement.",
      "Use shuttle-based safety planning to avoid stranded returns."
    ]
  };

  if (parkSpecificSafety[park.name]) return parkSpecificSafety[park.name];

  const terrainSafety = {
    desert: [
      "Heat load rises fast in exposed terrain; prioritize early and late hiking windows.",
      "Carry electrolyte replacement, not just water, on longer desert routes.",
      "Avoid stepping off-trail on fragile desert soils and biological crusts.",
      "Watch for flash-flood-prone washes after storms."
    ],
    canyon: [
      "Do not underestimate return climbs; uphill exit is usually the harder segment.",
      "Use turnaround times to avoid late-day heat and fatigue stacking.",
      "Keep distance from cliff edges and unstable crumbly ledges.",
      "Check river and weather updates before entering narrow canyon systems."
    ],
    "mountain-forest": [
      "Mountain weather changes quickly; bring rain and warmth backups even on clear mornings.",
      "Store all food correctly and follow local bear safety guidance.",
      "Check storm and lightning forecasts before high-elevation exposure.",
      "Carry traction support when snow patches or wet granite may be present."
    ],
    "geothermal-mountain": [
      "Never step off geothermal boardwalks; crust can be unstable and dangerous.",
      "Plan for long distances between major basins and services.",
      "Wildlife can be near roads and trails; keep legal distance and avoid crowding.",
      "Prepare for rapid temperature swings between morning and evening."
    ],
    "active-volcanic": [
      "Monitor volcanic gas and ash advisories throughout your visit.",
      "Remain outside closed zones and respect all active hazard signage.",
      "Use eye and respiratory protection if air conditions worsen.",
      "Treat fresh lava surfaces as sharp and unstable underfoot."
    ]
  };

  return (
    terrainSafety[park.terrain] || [
      `Respect wildlife distance rules in ${park.name}; never feed or approach animals.`,
      "Stay on marked trails and designated surfaces to protect habitat and avoid hazards.",
      "Turn around early if conditions degrade or group safety margins narrow.",
      "Share route and return plans with someone before longer outings."
    ]
  );
}

function buildWhatToBring(park) {
  const parkSpecificBring = {
    "Acadia National Park": [
      "Wind/rain shell, traction-capable shoes, and warm layer for summit wind exposure.",
      "Compact tide chart access and waterproof day-pack setup for coastal stops.",
      "For Acadia, bring flexible layering for rapid fog/sun/wind transitions."
    ],
    "Yellowstone National Park": [
      "Layering system for cold mornings and variable basin conditions.",
      "Long-day car kit (water, snacks, extra layers) for wide park travel distances.",
      "For Yellowstone, bring binoculars/zoom for safe long-distance wildlife viewing."
    ],
    "Yosemite National Park": [
      "Durable footwear with grip for wet granite and mixed trail surfaces.",
      "Hydration setup sized for valley heat and climb-heavy trail choices.",
      "For Yosemite, bring storage discipline for all scented items in bear country."
    ],
    "Zion National Park": [
      "High water capacity and sun-protective clothing for exposed canyon routes.",
      "Supportive footwear for slickrock, sand, and uneven canyon footing.",
      "For Zion, add trekking support and dry bag options for wet-route plans."
    ],
    "Grand Canyon National Park": [
      "Electrolyte-forward hydration plus high-calorie food for return climbs.",
      "Sun-reflective protection and shade aids for open rim/trail exposure.",
      "For the Grand Canyon, bring conservative reserve water beyond planned needs."
    ],
    "Rocky Mountain National Park": [
      "Altitude-ready layering and weatherproof shell for alpine wind and storms.",
      "Warm accessories even in summer for early-start alpine routes.",
      "For Rocky Mountain, bring lightning-aware turnaround discipline tools (watch/timing)."
    ],
    "Great Smoky Mountains National Park": [
      "Rain-focused setup (shell + quick-dry layers) for humid mountain weather.",
      "Trekking support for muddy roots/rocky trail surfaces after rain.",
      "For the Smokies, pack insect protection and low-light backup for wooded routes."
    ],
    "Olympic National Park": [
      "Waterproof outer layers and spare dry clothing for coastal/rainforest overlap days.",
      "Footwear adaptable to wet roots, beach access, and mountain segments.",
      "For Olympic, bring tide-safe planning tools for coast-route timing."
    ],
    "Glacier National Park": [
      "Bear spray where recommended and proven food storage setup.",
      "Layered cold-weather readiness for high passes and changing mountain weather.",
      "For Glacier, bring extra insulation even during summer shoulder windows."
    ],
    "Hawaii Volcanoes National Park": [
      "Sturdy shoes for sharp lava and uneven volcanic surfaces.",
      "Sun/rain combo protection for mixed elevation and weather zones.",
      "For Hawaiʻi Volcanoes, include comfort gear for air-quality-sensitive conditions."
    ]
  };

  if (parkSpecificBring[park.name]) return parkSpecificBring[park.name];

  const byTerrain = {
    desert: [
      "High water capacity, electrolyte mix, sun hat, and UV-protective clothing.",
      "Cooling support (neck wrap/light towel) and blister-ready footwear kit."
    ],
    canyon: [
      "Hydration system with reserve capacity and high-energy snacks.",
      "Trekking support for steep climbs and descent impact control."
    ],
    "mountain-forest": [
      "Layering system: base, insulation, and weather shell for fast condition shifts.",
      "Bear-safe food storage approach and weatherproof day-pack setup."
    ],
    "geothermal-mountain": [
      "Warm-cool adaptable layers plus wind shell for open basin areas.",
      "Reliable footwear for boardwalk + mixed terrain transitions."
    ],
    "active-volcanic": [
      "Sturdy footwear for lava surfaces and spare socks for abrasive terrain.",
      "Eye/respiratory comfort items for variable volcanic air quality."
    ]
  };

  const terrainItems = byTerrain[park.terrain] || [
    "Balanced layering, sun/rain protection, and hydration above minimum needs.",
    "Navigation backup, basic first-aid kit, and nutrition for longer windows."
  ];

  return [
    `${terrainItems[0]}`,
    `${terrainItems[1]}`,
    `For ${park.name}, choose gear based on seasonal alerts, elevation, and route commitment level.`
  ];
}

function buildTopAttractions(park) {
  const byPark = {
    "Acadia National Park": [
      { place: "Cadillac Mountain", famousFor: "sunrise views, summit panoramas, and iconic coastal elevation" },
      { place: "Park Loop Road", famousFor: "access to major viewpoints, trailheads, and shoreline scenery" },
      { place: "Jordan Pond", famousFor: "clear water reflections, carriage-road walks, and Bubble Mountain views" }
    ],
    "Yellowstone National Park": [
      { place: "Old Faithful", famousFor: "predictable geyser eruptions and iconic geothermal activity" },
      { place: "Grand Prismatic Spring", famousFor: "vivid rainbow thermal colors and massive hot spring basin" },
      { place: "Lamar Valley", famousFor: "wildlife viewing, especially bison, wolves, and broad valley scenery" }
    ],
    "Hawaii Volcanoes National Park": [
      { place: "Kilauea Caldera", famousFor: "active volcanic landscape, steam vents, and crater viewpoints" },
      { place: "Chain of Craters Road", famousFor: "lava fields, coastal cliffs, and eruption-shaped terrain" },
      { place: "Thurston Lava Tube", famousFor: "walk-through lava tunnel and rainforest transition zone" }
    ],
    "Yosemite National Park": [
      { place: "Yosemite Valley", famousFor: "granite monoliths, waterfalls, and classic Sierra views" },
      { place: "Tunnel View", famousFor: "signature panorama of El Capitan, Half Dome, and Bridalveil Fall" },
      { place: "Glacier Point", famousFor: "high-elevation overlook across Yosemite’s glacial landscape" }
    ],
    "Grand Canyon National Park": [
      { place: "South Rim Overlooks", famousFor: "expansive canyon vistas and dramatic layered geology" },
      { place: "Bright Angel Trail", famousFor: "historic descent route with major elevation change" },
      { place: "Desert View Watchtower", famousFor: "classic east rim perspective and historic architecture" }
    ],
    "Zion National Park": [
      { place: "Zion Canyon Scenic Drive", famousFor: "towering sandstone walls and shuttle-access viewpoints" },
      { place: "The Narrows", famousFor: "river hiking through narrow canyon walls" },
      { place: "Angels Landing Area", famousFor: "dramatic exposure, switchbacks, and iconic ridge views" }
    ]
  };

  if (byPark[park.name]) return byPark[park.name];

  const byTerrain = {
    desert: [
      { place: "Main Scenic Drive", famousFor: "major overlooks and changing desert light" },
      { place: "Signature Trail Corridor", famousFor: "iconic rock formations and route variety" },
      { place: "Sunrise/Sunset Viewpoint", famousFor: "high-contrast color and shadow across terrain" }
    ],
    canyon: [
      { place: "Primary Rim Overlook", famousFor: "wide canyon depth and layered cliff geology" },
      { place: "Popular Canyon Trail", famousFor: "in-canyon perspective and steep terrain transitions" },
      { place: "Scenic Drive Pullouts", famousFor: "multiple canyon angles without long hikes" }
    ],
    "mountain-forest": [
      { place: "Main Valley or Meadow", famousFor: "mountain backdrops and wildlife movement areas" },
      { place: "Signature Waterfall or Lake", famousFor: "alpine water features and seasonal flow changes" },
      { place: "High Overlook Route", famousFor: "broad skyline views and elevation contrast" }
    ],
    "geothermal-mountain": [
      { place: "Thermal Basin Area", famousFor: "geysers, hot springs, and steam features" },
      { place: "Wildlife Valley Zone", famousFor: "large mammals and open landscape viewing" },
      { place: "Grand Scenic Loop", famousFor: "combined geothermal and mountain highlights" }
    ]
  };

  return (
    byTerrain[park.terrain] || [
      { place: "Main Scenic Corridor", famousFor: "most concentrated viewpoints and landmark access" },
      { place: "Signature Landmark Area", famousFor: "the park’s best-known natural feature" },
      { place: "Top Viewpoint Route", famousFor: "classic photo angles and broad landscape context" }
    ]
  );
}

function stripHtml(value) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildAnimalStatus(animalName) {
  const n = animalName.toLowerCase();
  if (/(panther|black-footed ferret|marbled murrelet|hawksbill|leatherback|crocodile|lynx)/.test(n)) {
    return "often considered at-risk or protected in parts of its range";
  }
  if (/(wolf|wolverine|manatee|condor|sea turtle|tortoise|bighorn|pika|hoary bat)/.test(n)) {
    return "closely monitored in many regions due to habitat pressure";
  }
  if (/(deer|squirrel|raccoon|rabbit|cottontail|quail|raven|fox|coyote|turkey)/.test(n)) {
    return "generally common in suitable habitat";
  }
  return "variable by region, season, and habitat quality";
}

function buildAnimalDiet(animalName) {
  const n = animalName.toLowerCase();
  if (/(bear|wolf|cougar|lion|fox|coyote|lynx|bobcat|eagle|falcon|owl|shark|python|crocodile|alligator)/.test(n)) {
    return "mainly meat-based (predator/scavenger)";
  }
  if (/(deer|elk|moose|bison|sheep|rabbit|hare|iguana|tortoise|gecko|manatee)/.test(n)) {
    return "mostly grasses, leaves, shrubs, or other plants";
  }
  if (/(raccoon|otter|crow|raven|gull|seal|sea lion|boar|javelina|badger)/.test(n)) {
    return "omnivorous, eating a mix of plants and animals";
  }
  return "mixed diet depending on season and local food sources";
}

function terrainFindText(terrain) {
  const t = String(terrain || "");
  if (/desert|dunes|badlands/.test(t)) return "desert flats, washes, rocky outcrops, and cooler dawn/dusk zones";
  if (/coast|marine|island|fjord/.test(t)) return "coastal habitat, shorelines, tide zones, and nearshore waters";
  if (/mountain|alpine|glacier|volcanic/.test(t)) return "elevation gradients, forest edges, meadows, and rocky slopes";
  if (/swamp|wetland|river|lakes/.test(t)) return "wetlands, riparian corridors, marsh edges, and shaded water routes";
  if (/forest|rainforest/.test(t)) return "forest edges, canopy gaps, and dawn/dusk movement corridors";
  if (/urban|historic/.test(t)) return "mixed developed-natural edges and quieter green pockets";
  return "natural habitat pockets, water access points, and low-disturbance terrain";
}

function buildAnimalDescription(animalName, park) {
  const status = buildAnimalStatus(animalName);
  const diet = buildAnimalDiet(animalName);
  const where = terrainFindText(park.terrain);
  return `Status: ${status}. Diet: ${diet}. In ${park.name}, look in ${where}.`;
}

function buildWildlifeSection(park) {
  const groups = groupAnimalsByRarity(getAnimalsForPark(park));
  if (!groups.length) {
    return "";
  }

  return `
    <section class="park-section park-wildlife">
      <h3>Wildlife in this Park</h3>
      <div class="rarity-rail">
        ${groups
          .map(
            (g) => `
          <div class="rarity-block rarity-${g.id}">
            <h4 class="rarity-heading">${g.label}</h4>
            <div class="wildlife-grid">
              ${g.animals
                .map((name) => {
                  const key = slugify(name);
                  const desc = buildAnimalDescription(name, park);
                  return `
                    <figure class="wildlife-card" data-animal="${escapeHtml(name)}">
                      <div class="wildlife-photo-wrap">
                        <img class="wildlife-photo" data-animal-key="${key}" alt="${escapeHtml(name)}" loading="lazy" />
                      </div>
                      <figcaption>
                        <strong>${escapeHtml(name)}</strong>
                        <p class="wildlife-desc">${escapeHtml(desc)}</p>
                      </figcaption>
                    </figure>
                  `;
                })
                .join("")}
            </div>
          </div>`
          )
          .join("")}
      </div>
    </section>`;
}

const ANIMAL_IMAGE_CACHE = new Map();
const ATTRACTION_IMAGE_CACHE = new Map();
const IMAGE_CACHE_PREFIX = "nps_img_cache_v1:";

function getCachedImageUrl(key) {
  try {
    return localStorage.getItem(`${IMAGE_CACHE_PREFIX}${key}`) || "";
  } catch (_error) {
    return "";
  }
}

function setCachedImageUrl(key, value) {
  try {
    localStorage.setItem(`${IMAGE_CACHE_PREFIX}${key}`, value || "");
  } catch (_error) {
    // Ignore localStorage issues.
  }
}

async function fetchAnimalImageUrl(animalName) {
  const key = animalName.toLowerCase();
  const stored = getCachedImageUrl(key);
  if (stored) {
    ANIMAL_IMAGE_CACHE.set(key, stored);
    return stored;
  }
  if (ANIMAL_IMAGE_CACHE.has(key)) {
    return ANIMAL_IMAGE_CACHE.get(key);
  }

  const query = `${animalName} wildlife`;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "5",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "640"
  });

  try {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
    if (!response.ok) throw new Error("animal image lookup failed");
    const data = await response.json();
    const pages = Object.values(data?.query?.pages || {});
    const selected = pages
      .map((page) => page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url)
      .find((url) => typeof url === "string" && /\.(jpg|jpeg|png|webp)(\?|$)/i.test(url));
    ANIMAL_IMAGE_CACHE.set(key, selected || "");
    setCachedImageUrl(key, selected || "");
    return selected || "";
  } catch (_error) {
    ANIMAL_IMAGE_CACHE.set(key, "");
    setCachedImageUrl(key, "");
    return "";
  }
}

async function fetchAttractionImageUrl(place, parkName) {
  const key = `${place}__${parkName}`.toLowerCase();
  const stored = getCachedImageUrl(key);
  if (stored) {
    ATTRACTION_IMAGE_CACHE.set(key, stored);
    return stored;
  }
  if (ATTRACTION_IMAGE_CACHE.has(key)) return ATTRACTION_IMAGE_CACHE.get(key);

  const query = `${place} ${parkName}`;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "5",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "720"
  });

  try {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
    if (!response.ok) throw new Error("attraction image lookup failed");
    const data = await response.json();
    const pages = Object.values(data?.query?.pages || {});
    const selected = pages
      .map((page) => page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url)
      .find((url) => typeof url === "string" && /\.(jpg|jpeg|png|webp)(\?|$)/i.test(url));
    ATTRACTION_IMAGE_CACHE.set(key, selected || "");
    setCachedImageUrl(key, selected || "");
    return selected || "";
  } catch (_error) {
    ATTRACTION_IMAGE_CACHE.set(key, "");
    setCachedImageUrl(key, "");
    return "";
  }
}

async function renderWildlifeImages() {
  const cards = Array.from(document.querySelectorAll(".wildlife-card"));
  if (!cards.length) return;

  cards.forEach((card) => {
    const animal = card.dataset.animal || "";
    const img = card.querySelector(".wildlife-photo");
    if (!img || !animal) return;
    img.alt = `${animal} photo`;
    img.dataset.imageLookup = animal;
  });

  setupDeferredImageLoader(".wildlife-photo", async (lookupKey) => {
    const url = await fetchAnimalImageUrl(lookupKey);
    return url;
  });
}

function setupDeferredImageLoader(selector, loader) {
  const candidates = Array.from(document.querySelectorAll(selector)).filter(
    (img) => img.dataset.deferBound !== "1"
  );
  if (!candidates.length) return;

  const reveal = async (img) => {
    img.dataset.deferBound = "1";
    const lookupKey = img.dataset.imageLookup || "";
    if (!lookupKey) return;
    const wrap = img.closest(".wildlife-photo-wrap, .attraction-photo-wrap");
    const url = await loader(lookupKey);
    if (url) {
      img.src = url;
      img.dataset.fullSrc = url;
    } else if (wrap) {
      wrap.classList.add("wildlife-photo-empty");
      wrap.innerHTML = "<span>No photo found</span>";
    }
  };

  if (!("IntersectionObserver" in window)) {
    candidates.forEach((img) => reveal(img));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        obs.unobserve(img);
        reveal(img);
      });
    },
    { rootMargin: "180px 0px" }
  );

  candidates.forEach((img) => observer.observe(img));
}

function ensureWildlifeLightbox() {
  if (document.getElementById("wildlife-lightbox")) return;
  const lightbox = document.createElement("div");
  lightbox.id = "wildlife-lightbox";
  lightbox.className = "wildlife-lightbox";
  lightbox.innerHTML = `
    <div class="wildlife-lightbox-backdrop" data-close="1"></div>
    <div class="wildlife-lightbox-panel" role="dialog" aria-modal="true" aria-label="Wildlife image preview">
      <button type="button" class="wildlife-lightbox-close" data-close="1" aria-label="Close image preview">×</button>
      <div class="wildlife-lightbox-image-wrap">
        <img id="wildlife-lightbox-image" alt="Expanded wildlife photo" />
      </div>
      <p id="wildlife-lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target && event.target.dataset && event.target.dataset.close === "1") {
      lightbox.classList.remove("is-open");
    }
  });
}

function attachWildlifeImageLightbox() {
  ensureWildlifeLightbox();
  const lightbox = document.getElementById("wildlife-lightbox");
  const imageNode = document.getElementById("wildlife-lightbox-image");
  const captionNode = document.getElementById("wildlife-lightbox-caption");
  if (!lightbox || !imageNode || !captionNode) return;
  if (document.body.dataset.photoLightboxBound === "1") return;
  document.body.dataset.photoLightboxBound = "1";

  document.addEventListener("click", (event) => {
    const img = event.target.closest(".wildlife-photo, .photo-card img");
    if (!img) return;
    if (!img.src) return;
    imageNode.src = img.dataset.fullSrc || img.src;
    const animalName = img.closest(".wildlife-card")?.dataset?.animal;
    captionNode.textContent = animalName || "Park photo";
    lightbox.classList.add("is-open");
  });
}

async function renderAttractionImages(park) {
  const cards = Array.from(document.querySelectorAll(".attraction-card"));
  if (!cards.length) return;

  cards.forEach((card) => {
    const place = card.dataset.place || "";
    const img = card.querySelector(".attraction-photo");
    if (!img || !place) return;
    img.alt = `${place} in ${park.name}`;
    img.dataset.imageLookup = place;
  });

  setupDeferredImageLoader(".attraction-photo", async (place) => {
    const url = await fetchAttractionImageUrl(place, park.name);
    return url;
  });
}

function makeSectionsExpandable(park) {
  const sections = Array.from(document.querySelectorAll(".park-section"));
  sections.forEach((section, index) => {
    if (section.dataset.expandableReady === "1") return;
    const heading = section.querySelector("h3");
    if (!heading) return;

    const panelId = `section-panel-${index}`;
    const titleText = heading.textContent || "Section";
    heading.remove();

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "section-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", panelId);
    toggle.innerHTML = `<span>${escapeHtml(titleText)}</span><span class="section-toggle-icon">▾</span>`;

    const content = document.createElement("div");
    content.className = "section-content";
    content.id = panelId;

    while (section.firstChild) {
      content.appendChild(section.firstChild);
    }

    const openSection = () => {
      toggle.setAttribute("aria-expanded", "true");
      section.classList.remove("is-collapsed");
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.style.opacity = "1";
      if (section.dataset.loaded === "1") return;
      if (titleText.includes("Wildlife")) {
        renderWildlifeImages();
        attachWildlifeImageLightbox();
        section.dataset.loaded = "1";
      } else if (titleText.includes("Top Tourist Attractions")) {
        renderAttractionImages(park);
        attachWildlifeImageLightbox();
        section.dataset.loaded = "1";
      }
    };

    const closeSection = () => {
      toggle.setAttribute("aria-expanded", "false");
      section.classList.add("is-collapsed");
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeSection();
      } else {
        openSection();
      }
    });

    section.appendChild(toggle);
    section.appendChild(content);
    section.classList.add("is-collapsed");
    content.style.maxHeight = "0px";
    content.style.opacity = "0";
    section.dataset.expandableReady = "1";
  });
}

function isCreativeCommons(licenseName, licenseUrl) {
  const name = (licenseName || "").toLowerCase();
  const url = (licenseUrl || "").toLowerCase();
  return name.includes("cc") || url.includes("creativecommons.org/licenses");
}

async function fetchCommonsPhotos(park, limit = 3) {
  const searchTerm = `${park.name} national park landscape`;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: searchTerm,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "900"
  });

  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Unable to load Commons images.");

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});

  const photos = pages
    .map((page) => {
      const info = page?.imageinfo?.[0];
      const meta = info?.extmetadata || {};
      const licenseName = stripHtml(meta.LicenseShortName?.value) || "Unknown license";
      const licenseUrl = stripHtml(meta.LicenseUrl?.value);
      const artist = stripHtml(meta.Artist?.value) || "Unknown author";

      return {
        title: (page.title || "").replace(/^File:/, ""),
        imageUrl: info?.thumburl || info?.url,
        sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent((page.title || "").replace(/ /g, "_"))}`,
        author: artist,
        licenseName,
        licenseUrl
      };
    })
    .filter((photo) => photo.imageUrl && isCreativeCommons(photo.licenseName, photo.licenseUrl))
    .slice(0, limit);

  return photos;
}

function shortPhotoCaption(index) {
  const captions = [
    "Scenic overview",
    "Trail and terrain",
    "Park landscape",
    "Natural feature view",
    "Backcountry scene",
    "Visitor area highlight",
    "Lookout perspective",
    "Wilderness detail"
  ];
  return captions[index % captions.length];
}

async function renderCommonsPhotos(park) {
  const grid = document.getElementById("photo-grid");
  if (!grid) return;

  grid.innerHTML = "<p>Loading Creative Commons photos...</p>";

  try {
    const photos = await fetchCommonsPhotos(park, 6);
    if (!photos.length) {
      grid.innerHTML = "<p>No Creative Commons photos found for this park yet.</p>";
      return;
    }

    grid.innerHTML = photos
      .map(
        (photo, index) => `
          <figure class="photo-card">
            <img src="${photo.imageUrl}" alt="Park photo ${index + 1}" loading="lazy" />
            <figcaption>${shortPhotoCaption(index)}</figcaption>
          </figure>
        `
      )
      .join("");

  } catch (_error) {
    grid.innerHTML = "<p>Creative Commons photos are temporarily unavailable.</p>";
  }
}

function prettyPoiType(type) {
  const map = {
    visitor: "Visitor center",
    viewpoint: "Viewpoint",
    camp: "Camp",
    trailhead: "Trailhead"
  };
  return map[type] || "Feature";
}

function makeBounds(south, west, north, east) {
  return { south, west, north, east };
}

function boundsFromCenter(center, latPad = 0.18, lonPad = 0.24) {
  return makeBounds(
    center[0] - latPad,
    center[1] - lonPad,
    center[0] + latPad,
    center[1] + lonPad
  );
}

function boundsFromPoints(points, fallback) {
  if (!points.length) return fallback;
  let south = Infinity;
  let west = Infinity;
  let north = -Infinity;
  let east = -Infinity;
  points.forEach(([lat, lon]) => {
    south = Math.min(south, lat);
    west = Math.min(west, lon);
    north = Math.max(north, lat);
    east = Math.max(east, lon);
  });
  if (!isFinite(south) || !isFinite(west) || !isFinite(north) || !isFinite(east)) {
    return fallback;
  }
  return makeBounds(south, west, north, east);
}

function padBounds(bounds, factor = 0.1) {
  const latSpan = Math.max(0.02, bounds.north - bounds.south);
  const lonSpan = Math.max(0.02, bounds.east - bounds.west);
  const latPad = latSpan * factor;
  const lonPad = lonSpan * factor;
  return makeBounds(
    bounds.south - latPad,
    bounds.west - lonPad,
    bounds.north + latPad,
    bounds.east + lonPad
  );
}

async function fetchMapFeatures(bounds) {
  const south = bounds.south;
  const west = bounds.west;
  const north = bounds.north;
  const east = bounds.east;
  const query = `
    [out:json][timeout:25];
    (
      node(${south},${west},${north},${east})[tourism=viewpoint][name];
      node(${south},${west},${north},${east})[tourism=camp_site][name];
      node(${south},${west},${north},${east})[tourism=information][information=office][name];
      node(${south},${west},${north},${east})[highway=trailhead][name];
      way(${south},${west},${north},${east})[highway~"path|footway|track"][name];
    );
    out geom 100;
  `;
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
    headers: { "Content-Type": "text/plain;charset=UTF-8" }
  });
  if (!response.ok) {
    throw new Error("Feature lookup failed.");
  }
  return response.json();
}

function parseOverpass(data) {
  const elements = data?.elements || [];
  const namedTrails = [];
  const pois = [];

  for (const el of elements) {
    const tags = el.tags || {};
    if (!tags.name) continue;

    if (el.type === "way" && Array.isArray(el.geometry) && el.geometry.length > 1) {
      namedTrails.push({
        name: tags.name,
        geometry: el.geometry.map((g) => [g.lat, g.lon])
      });
      continue;
    }

    if (el.type === "node" && typeof el.lat === "number" && typeof el.lon === "number") {
      let type = "";
      if (tags.tourism === "information") type = "visitor";
      if (tags.tourism === "viewpoint") type = "viewpoint";
      if (tags.tourism === "camp_site") type = "camp";
      if (tags.highway === "trailhead") type = "trailhead";
      if (!type) continue;
      pois.push({
        name: tags.name,
        type,
        lat: el.lat,
        lon: el.lon
      });
    }
  }

  return {
    trails: namedTrails.slice(0, 14),
    pois: pois.slice(0, 20)
  };
}

function buildFallbackTrails(bounds) {
  const latSpan = Math.max(0.04, bounds.north - bounds.south);
  const lonSpan = Math.max(0.04, bounds.east - bounds.west);
  const cLat = (bounds.north + bounds.south) / 2;
  const cLon = (bounds.east + bounds.west) / 2;
  return [
    {
      name: "Ridge Trail",
      geometry: [
        [cLat + latSpan * 0.23, cLon - lonSpan * 0.32],
        [cLat + latSpan * 0.12, cLon - lonSpan * 0.08],
        [cLat + latSpan * 0.05, cLon + lonSpan * 0.18]
      ]
    },
    {
      name: "Valley Loop Trail",
      geometry: [
        [cLat - latSpan * 0.2, cLon - lonSpan * 0.2],
        [cLat - latSpan * 0.08, cLon + lonSpan * 0.22],
        [cLat + latSpan * 0.12, cLon + lonSpan * 0.05],
        [cLat - latSpan * 0.02, cLon - lonSpan * 0.24],
        [cLat - latSpan * 0.2, cLon - lonSpan * 0.2]
      ]
    },
    {
      name: "Creekside Trail",
      geometry: [
        [cLat + latSpan * 0.02, cLon - lonSpan * 0.35],
        [cLat - latSpan * 0.1, cLon - lonSpan * 0.1],
        [cLat - latSpan * 0.22, cLon + lonSpan * 0.2]
      ]
    }
  ];
}

async function geocodePark(park) {
  const query = encodeURIComponent(`${park.name}, ${park.state}, USA`);
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&polygon_geojson=1&q=${query}`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Geocoding failed.");
  const data = await response.json();
  if (!Array.isArray(data) || !data.length) throw new Error("No results.");
  const item = data[0];
  const center = [parseFloat(item.lat), parseFloat(item.lon)];
  const bbox = item.boundingbox
    ? makeBounds(
        parseFloat(item.boundingbox[0]),
        parseFloat(item.boundingbox[2]),
        parseFloat(item.boundingbox[1]),
        parseFloat(item.boundingbox[3])
      )
    : null;
  return {
    center,
    bbox,
    geojson: item.geojson || null
  };
}

function extractBoundaryRings(geojson, fallbackBounds) {
  if (!geojson) {
    return [[
      [fallbackBounds.south, fallbackBounds.west],
      [fallbackBounds.south, fallbackBounds.east],
      [fallbackBounds.north, fallbackBounds.east],
      [fallbackBounds.north, fallbackBounds.west],
      [fallbackBounds.south, fallbackBounds.west]
    ]];
  }
  if (geojson.type === "Polygon" && Array.isArray(geojson.coordinates)) {
    return geojson.coordinates
      .filter((ring) => Array.isArray(ring) && ring.length > 2)
      .map((ring) => ring.map((p) => [p[1], p[0]]));
  }
  if (geojson.type === "MultiPolygon" && Array.isArray(geojson.coordinates)) {
    return geojson.coordinates
      .flatMap((poly) => (Array.isArray(poly) ? poly : []))
      .filter((ring) => Array.isArray(ring) && ring.length > 2)
      .map((ring) => ring.map((p) => [p[1], p[0]]));
  }
  return [[
    [fallbackBounds.south, fallbackBounds.west],
    [fallbackBounds.south, fallbackBounds.east],
    [fallbackBounds.north, fallbackBounds.east],
    [fallbackBounds.north, fallbackBounds.west],
    [fallbackBounds.south, fallbackBounds.west]
  ]];
}

function buildStaticMapSvg(bounds, boundaryRings, trails, pois) {
  const width = 900;
  const height = 500;
  const project = (lat, lon) => {
    const x = ((lon - bounds.west) / (bounds.east - bounds.west || 1)) * width;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south || 1)) * height;
    return [Math.max(0, Math.min(width, x)), Math.max(0, Math.min(height, y))];
  };

  const boundaryPaths = boundaryRings
    .map((ring) => {
      const d = ring
        .map(([lat, lon], i) => {
          const [x, y] = project(lat, lon);
          return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");
      return `${d} Z`;
    })
    .join(" ");

  const trailSvg = trails
    .slice(0, 14)
    .map((trail) => {
      const d = trail.geometry
        .map(([lat, lon], i) => {
          const [x, y] = project(lat, lon);
          return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");
      const mid = trail.geometry[Math.floor(trail.geometry.length / 2)] || trail.geometry[0];
      const [tx, ty] = project(mid[0], mid[1]);
      return `
        <path d="${d}" class="park-trail-line" />
        <text x="${tx.toFixed(2)}" y="${(ty - 4).toFixed(2)}" class="park-trail-label">${escapeHtml(trail.name)}</text>
      `;
    })
    .join("");

  const poiSvg = pois
    .slice(0, 18)
    .map((poi) => {
      const [x, y] = project(poi.lat, poi.lon);
      const abbrev = { visitor: "VC", viewpoint: "VP", camp: "CP", trailhead: "TH" }[poi.type] || "POI";
      return `
        <g>
          <rect x="${(x - 13).toFixed(2)}" y="${(y - 10).toFixed(2)}" width="26" height="16" rx="4" class="park-poi-pill park-poi-${poi.type}" />
          <text x="${x.toFixed(2)}" y="${(y + 1.5).toFixed(2)}" class="park-poi-abbrev">${abbrev}</text>
          <text x="${(x + 16).toFixed(2)}" y="${(y - 2).toFixed(2)}" class="park-poi-name">${escapeHtml(poi.name)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg class="park-static-map" viewBox="0 0 ${width} ${height}" role="img" aria-label="Static park map">
      <defs>
        <pattern id="parkPaperGrid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="0.8"></path>
        </pattern>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" class="park-map-bg"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#parkPaperGrid)"></rect>
      <path d="${boundaryPaths}" class="park-boundary-fill"></path>
      <path d="${boundaryPaths}" class="park-boundary-line"></path>
      ${trailSvg}
      ${poiSvg}
    </svg>
  `;
}

async function getPreferredMapImageUrl(park) {
  if (typeof getOfficialNpsMapUrl === "function") {
    const official = getOfficialNpsMapUrl(park);
    if (official) return official;
  }
  return null;
}

function attachStaticMapInteraction() {
  const viewport = document.getElementById("park-map-viewport");
  const frame = document.getElementById("park-map-frame");
  const zoomInBtn = document.getElementById("map-zoom-in");
  const zoomOutBtn = document.getElementById("map-zoom-out");
  if (!viewport || !frame || !zoomInBtn || !zoomOutBtn) return;

  const MIN_SCALE = 1; // full park extent, cannot zoom out farther
  const MAX_SCALE = 5;
  const STEP = 0.25;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let dragStart = null;
  let rafId = 0;

  const clampPan = () => {
    const maxX = ((scale - 1) * frame.clientWidth) / 2;
    const maxY = ((scale - 1) * frame.clientHeight) / 2;
    tx = Math.max(-maxX, Math.min(maxX, tx));
    ty = Math.max(-maxY, Math.min(maxY, ty));
  };

  const applyTransform = () => {
    if (scale <= MIN_SCALE) {
      tx = 0;
      ty = 0;
    } else {
      clampPan();
    }
    viewport.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    zoomOutBtn.disabled = scale <= MIN_SCALE;
    zoomInBtn.disabled = scale >= MAX_SCALE;
  };

  const update = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      applyTransform();
    });
  };

  zoomInBtn.addEventListener("click", () => {
    scale = Math.min(MAX_SCALE, +(scale + STEP).toFixed(2));
    update();
  });

  zoomOutBtn.addEventListener("click", () => {
    scale = Math.max(MIN_SCALE, +(scale - STEP).toFixed(2));
    update();
  });

  frame.addEventListener("pointerdown", (event) => {
    if (scale <= MIN_SCALE) return;
    event.preventDefault();
    dragStart = {
      x: event.clientX,
      y: event.clientY,
      tx,
      ty
    };
    frame.setPointerCapture(event.pointerId);
    frame.classList.add("is-dragging");
  });

  frame.addEventListener("pointermove", (event) => {
    if (!dragStart) return;
    event.preventDefault();
    tx = dragStart.tx + (event.clientX - dragStart.x);
    ty = dragStart.ty + (event.clientY - dragStart.y);
    update();
  });

  const endDrag = (event) => {
    if (dragStart) {
      dragStart = null;
      frame.classList.remove("is-dragging");
    }
    if (event && typeof frame.releasePointerCapture === "function") {
      try {
        frame.releasePointerCapture(event.pointerId);
      } catch (_error) {
        // Ignore release errors.
      }
    }
  };

  frame.addEventListener("pointerup", endDrag);
  frame.addEventListener("pointercancel", endDrag);
  frame.addEventListener("pointerleave", (event) => {
    if (event.buttons === 0) endDrag(event);
  });

  // Trackpad two-finger gesture support: pan map with wheel deltas.
  frame.addEventListener(
    "wheel",
    (event) => {
      if (scale <= MIN_SCALE) return;
      event.preventDefault();
      tx -= event.deltaX;
      ty -= event.deltaY;
      update();
    },
    { passive: false }
  );

  applyTransform();
}

async function renderParkMap(park) {
  const mapNode = document.getElementById("park-map");
  if (!mapNode) return;

  const mapImageUrl = await getPreferredMapImageUrl(park);
  mapNode.innerHTML = `
    <div class="map-static-shell">
      <div class="map-zoom-controls" role="group" aria-label="Map zoom controls">
        <button id="map-zoom-out" type="button" aria-label="Zoom out">-</button>
        <button id="map-zoom-in" type="button" aria-label="Zoom in">+</button>
      </div>
      <div class="map-static-frame" id="park-map-frame">
        <div id="park-map-viewport" class="map-static-viewport">
          ${
            mapImageUrl
              ? `<img class="park-map-image" src="${escapeHtml(mapImageUrl)}" alt="${escapeHtml(
                  park.name
                )} park map" loading="eager" fetchpriority="high" decoding="async" />`
              : `<div class="map-unavailable">Official park map image is not available yet for this park.</div>`
          }
        </div>
      </div>
    </div>
  `;
  attachStaticMapInteraction();
}

if (!park) {
  parkContent.innerHTML = `
    <a class="back-link" href="../index.html">Back to all parks</a>
    <h2>Park not found</h2>
    <p>We could not find this park page.</p>
  `;
} else {
  const tips = getTips(park);
  const checklist = buildChecklist(park.name);
  const safety = buildSafetyNotes(park);
  const attractions = buildTopAttractions(park);
  const whatToBring = buildWhatToBring(park);
  const wildlifeSection = buildWildlifeSection(park);

  parkContent.innerHTML = `
    <a class="back-link" href="../index.html">Back to all parks</a>
    <a class="back-link secondary-link" href="../protect-parks.html">Park protection and Leave No Trace guide</a>
    <h2>${park.name}</h2>
    <p class="park-meta"><strong>State/Territory:</strong> ${park.state}</p>
    <div class="park-intro" role="region" aria-label="Park summary">
      <p class="intro-line">
        <strong>National park:</strong> ${park.name}
      </p>
      <p class="intro-line">
        <strong>Terrain type:</strong> ${terrainLabel(park.terrain)}
      </p>
      <p class="intro-line">
        Use the notes below as a practical planning baseline, then verify current
        conditions with the National Park Service before travel.
      </p>
    </div>

    ${wildlifeSection}

    <section class="park-section">
      <h3>Park Photos</h3>
      <p>
        Images below come from Wikimedia Commons and are filtered to Creative
        Commons licenses.
      </p>
      <div class="photo-grid" id="photo-grid"></div>
    </section>

    <section class="park-section">
      <h3>Park Map</h3>
      <div class="map-wrap" id="park-map" role="img" aria-label="Map of ${park.name}"></div>
    </section>

    <section class="park-section">
      <h3>Top Visit Guidelines ⛰️</h3>
      <ul>
        ${tips.map((tip) => `<li>${tip}</li>`).join("")}
      </ul>
    </section>

    <section class="park-section">
      <h3>Pre-Trip Planning Checklist 🧭</h3>
      <ul>
        ${checklist.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="park-section">
      <h3>Safety and Leave No Trace Notes 🛡️</h3>
      <ul>
        ${safety.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="park-section">
      <h3>Top Tourist Attractions ✨</h3>
      <div class="attraction-grid">
        ${attractions
          .map(
            (item) =>
              `<article class="attraction-card" data-place="${escapeHtml(item.place)}">
                 <div class="attraction-photo-wrap">
                   <img class="attraction-photo" alt="${escapeHtml(item.place)}" loading="lazy" />
                 </div>
                 <h4>${escapeHtml(item.place)}</h4>
                 <p>Famous for ${escapeHtml(item.famousFor)}.</p>
               </article>`
          )
          .join("")}
      </div>
    </section>

    <section class="park-section">
      <h3>What to Bring 🎒</h3>
      <ul>
        ${whatToBring.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;

  renderParkMap(park);
  renderCommonsPhotos(park);
  attachWildlifeImageLightbox();
  makeSectionsExpandable(park);
}
