const parks = [
  { name: "Acadia National Park", state: "Maine", terrain: "coast-mountain" },
  { name: "American Samoa National Park", state: "American Samoa", terrain: "tropical-coast" },
  { name: "Arches National Park", state: "Utah", terrain: "desert" },
  { name: "Badlands National Park", state: "South Dakota", terrain: "badlands" },
  { name: "Big Bend National Park", state: "Texas", terrain: "desert-mountain" },
  { name: "Biscayne National Park", state: "Florida", terrain: "marine" },
  { name: "Black Canyon of the Gunnison National Park", state: "Colorado", terrain: "canyon" },
  { name: "Bryce Canyon National Park", state: "Utah", terrain: "high-desert" },
  { name: "Canyonlands National Park", state: "Utah", terrain: "canyon" },
  { name: "Capitol Reef National Park", state: "Utah", terrain: "desert" },
  { name: "Carlsbad Caverns National Park", state: "New Mexico", terrain: "cave-desert" },
  { name: "Channel Islands National Park", state: "California", terrain: "island-coast" },
  { name: "Congaree National Park", state: "South Carolina", terrain: "swamp-forest" },
  { name: "Crater Lake National Park", state: "Oregon", terrain: "volcanic-mountain" },
  { name: "Cuyahoga Valley National Park", state: "Ohio", terrain: "river-forest" },
  { name: "Death Valley National Park", state: "California / Nevada", terrain: "extreme-desert" },
  { name: "Denali National Park", state: "Alaska", terrain: "arctic-mountain" },
  { name: "Dry Tortugas National Park", state: "Florida", terrain: "remote-marine" },
  { name: "Everglades National Park", state: "Florida", terrain: "wetland" },
  { name: "Gates of the Arctic National Park", state: "Alaska", terrain: "remote-arctic" },
  { name: "Gateway Arch National Park", state: "Missouri", terrain: "urban" },
  { name: "Glacier Bay National Park", state: "Alaska", terrain: "glacier-coast" },
  { name: "Glacier National Park", state: "Montana", terrain: "mountain" },
  { name: "Grand Canyon National Park", state: "Arizona", terrain: "canyon" },
  { name: "Grand Teton National Park", state: "Wyoming", terrain: "mountain-valley" },
  { name: "Great Basin National Park", state: "Nevada", terrain: "high-desert-mountain" },
  { name: "Great Sand Dunes National Park", state: "Colorado", terrain: "dunes" },
  { name: "Great Smoky Mountains National Park", state: "Tennessee / North Carolina", terrain: "mountain-forest" },
  { name: "Guadalupe Mountains National Park", state: "Texas", terrain: "desert-mountain" },
  { name: "Haleakala National Park", state: "Hawaii", terrain: "volcanic" },
  { name: "Hawaii Volcanoes National Park", state: "Hawaii", terrain: "active-volcanic" },
  { name: "Hot Springs National Park", state: "Arkansas", terrain: "historic-forest" },
  { name: "Indiana Dunes National Park", state: "Indiana", terrain: "dunes-lakeshore" },
  { name: "Isle Royale National Park", state: "Michigan", terrain: "remote-island" },
  { name: "Joshua Tree National Park", state: "California", terrain: "desert" },
  { name: "Katmai National Park", state: "Alaska", terrain: "remote-bear-coast" },
  { name: "Kenai Fjords National Park", state: "Alaska", terrain: "fjord-glacier" },
  { name: "Kings Canyon National Park", state: "California", terrain: "mountain-canyon" },
  { name: "Kobuk Valley National Park", state: "Alaska", terrain: "remote-arctic-dunes" },
  { name: "Lake Clark National Park", state: "Alaska", terrain: "remote-lakes-mountain" },
  { name: "Lassen Volcanic National Park", state: "California", terrain: "volcanic-mountain" },
  { name: "Mammoth Cave National Park", state: "Kentucky", terrain: "cave-forest" },
  { name: "Mesa Verde National Park", state: "Colorado", terrain: "mesa-cultural" },
  { name: "Mount Rainier National Park", state: "Washington", terrain: "volcanic-mountain" },
  { name: "New River Gorge National Park and Preserve", state: "West Virginia", terrain: "river-gorge" },
  { name: "North Cascades National Park", state: "Washington", terrain: "alpine" },
  { name: "Olympic National Park", state: "Washington", terrain: "coast-rainforest-mountain" },
  { name: "Petrified Forest National Park", state: "Arizona", terrain: "desert-badlands" },
  { name: "Pinnacles National Park", state: "California", terrain: "rocky-canyon" },
  { name: "Redwood National Park", state: "California", terrain: "coastal-forest" },
  { name: "Rocky Mountain National Park", state: "Colorado", terrain: "alpine-mountain" },
  { name: "Saguaro National Park", state: "Arizona", terrain: "desert" },
  { name: "Sequoia National Park", state: "California", terrain: "mountain-forest" },
  { name: "Shenandoah National Park", state: "Virginia", terrain: "mountain-forest" },
  { name: "Theodore Roosevelt National Park", state: "North Dakota", terrain: "badlands" },
  { name: "Virgin Islands National Park", state: "US Virgin Islands", terrain: "tropical-island" },
  { name: "Voyageurs National Park", state: "Minnesota", terrain: "lakes-forest" },
  { name: "White Sands National Park", state: "New Mexico", terrain: "desert-dunes" },
  { name: "Wind Cave National Park", state: "South Dakota", terrain: "cave-prairie" },
  { name: "Wrangell-St. Elias National Park", state: "Alaska", terrain: "remote-mountain-glacier" },
  { name: "Yellowstone National Park", state: "Wyoming / Montana / Idaho", terrain: "geothermal-mountain" },
  { name: "Yosemite National Park", state: "California", terrain: "granite-mountain" },
  { name: "Zion National Park", state: "Utah", terrain: "canyon" }
];

const terrainTips = {
  "coast-mountain": ["Arrive before 9 AM in peak season to avoid parking limits and crowds.", "Pack layers and a rain shell; weather can shift quickly on exposed summits.", "Use marked trails on fragile cliffs and tide areas."],
  "tropical-coast": ["Plan transport in advance; inter-island and village access can be limited.", "Bring reef-safe sunscreen, bug protection, and hydration for humid heat.", "Respect local culture and avoid stepping on coral or marine habitat."],
  desert: ["Carry more water than you expect to need and start hikes early.", "Watch for heat illness signs and avoid long midday exposure.", "Stay on marked routes to protect cryptobiotic soils and desert vegetation."],
  badlands: ["Bring sun protection and water; shade is limited across exposed terrain.", "Avoid cliff edges and unstable crumbly formations.", "Check thunderstorm forecasts before long overlooks or backcountry routes."],
  "desert-mountain": ["Prepare for hot days and cooler nights with layered clothing.", "Fuel up and top off water before entering remote sections.", "Keep extra tire repair/safety gear for long-distance roads."],
  marine: ["Most experiences require a boat tour; reserve transportation early.", "Check marine weather and wind conditions before departure.", "Use reef-safe sunscreen and respect no-touch marine wildlife rules."],
  canyon: ["Do not underestimate elevation change; descent is easier than the climb back.", "Carry water, electrolytes, and salty snacks on long trails.", "Check for road, rim, or shuttle closures before arrival."],
  "high-desert": ["Expect strong sun during the day and cool temperatures after sunset.", "Storms can create slick trails; wear traction-friendly footwear.", "Stay behind safety barriers at hoodoo and rim viewpoints."],
  "cave-desert": ["Book timed cave entry early during busy periods.", "Bring a light layer for cool cave interiors and warm surface temperatures.", "Follow cave biosecurity guidance to help prevent white-nose syndrome spread."],
  "island-coast": ["Boat transport can be weather-dependent; keep backup plans.", "Bring food, water, and sun protection since services are limited.", "Respect wildlife nesting zones and fragile island vegetation."],
  "swamp-forest": ["Bring insect repellent and wear light long sleeves for buggy zones.", "Use boardwalks to protect floodplain ecosystems and avoid hidden hazards.", "Check trail water levels after heavy rain."],
  "volcanic-mountain": ["Snow can linger into summer; confirm road openings before visiting.", "At high elevation, pace yourself and hydrate often.", "Stay on designated paths around geothermal or volcanic features."],
  "river-forest": ["Weekends can be busy; choose early starts for trailhead parking.", "Carry rain layers and check stream conditions after storms.", "Use designated bike and hike corridors to reduce congestion."],
  "extreme-desert": ["Avoid strenuous activity during extreme heat windows.", "Carry extra water in your vehicle and on all hikes.", "Cell service is limited; download maps and park alerts ahead of time."],
  "arctic-mountain": ["Transit options and weather windows are tight; book logistics early.", "Pack true cold-weather layers even in summer shoulder periods.", "Keep long wildlife distance and carry bear-aware safety gear."],
  "remote-marine": ["Transportation depends on boat or seaplane; reserve far in advance.", "Bring all food, water, and essentials; services are minimal.", "Watch ocean conditions and follow all ranger marine safety guidance."],
  wetland: ["Visit in cooler hours to reduce heat and mosquito stress.", "Use boardwalks and marked paddling routes to protect habitat.", "Never feed wildlife and keep substantial distance from alligators."],
  "remote-arctic": ["This is a true wilderness trip; navigation and emergency prep are essential.", "Use satellite communication tools where cell coverage is absent.", "Travel with experienced backcountry planning and weather margins."],
  urban: ["Reserve timed entry tickets when required in busy seasons.", "Use nearby transit or parking garages to simplify arrival.", "Combine indoor and outdoor stops for weather-flexible planning."],
  "glacier-coast": ["Many visits rely on cruise or charter schedules; confirm route details.", "Dress for cold, wind, and wet marine weather conditions.", "Observe calving glacier zones from safe distances."],
  mountain: ["Roads and passes can close unexpectedly; confirm conditions day-of.", "Carry layers for rapid weather changes and temperature swings.", "Give wildlife right-of-way and maintain long viewing distances."],
  "mountain-valley": ["Popular corridors fill early; use shuttles or sunrise starts.", "Be bear-aware with food storage and trail etiquette.", "Afternoon storms are common in summer; plan summit timing."],
  "high-desert-mountain": ["Expect strong sun plus cooler mountain nights; pack both shade and layers.", "Remote roads require fuel planning and backup supplies.", "Dark-sky activities are best with red lights and night safety prep."],
  dunes: ["Sand surface temperatures can be extreme by midday.", "Wind can reduce visibility; secure gear and eye protection.", "Use traction-friendly footwear and carry extra water."],
  "mountain-forest": ["Arrive early for popular trailheads and scenic drives.", "Check for seasonal closures, storms, and downed-tree impacts.", "Store food safely and keep wildlife interactions strictly distant."],
  volcanic: ["Weather changes quickly across elevation zones; bring layers.", "Sun exposure is intense at elevation; use hat and sunscreen.", "Stay on marked trails near crater edges and unstable terrain."],
  "active-volcanic": ["Monitor current volcanic alerts and air quality before entry.", "Volcanic gases can affect breathing; avoid restricted areas.", "Bring sturdy shoes for rough lava surfaces and uneven ground."],
  "historic-forest": ["Mix of urban and natural areas means variable crowds and parking patterns.", "Hydrate during warm months and check trail conditions after rain.", "Follow posted guidance for both bathhouse district and backcountry trails."],
  "dunes-lakeshore": ["Lake weather can turn quickly; check wind and water safety conditions.", "Hot sand and steep dunes require extra water and pacing.", "Use designated beach access points to protect sensitive dune systems."],
  "remote-island": ["Ferry or seaplane schedules can shift with weather; build flexibility.", "Backcountry trips require permit planning and self-sufficiency.", "Practice strict Leave No Trace on fragile island ecosystems."],
  "remote-bear-coast": ["Bear-viewing logistics often require flights and guided planning.", "Carry bear-safe storage and maintain very large wildlife distance.", "Weather delays are common; include schedule buffer days."],
  "fjord-glacier": ["Boat and kayaking plans should match tide and weather windows.", "Glacier zones can be cold and windy even in summer.", "Keep safe distance from calving fronts and floating ice."],
  "mountain-canyon": ["Steep terrain and elevation demand slower pace and hydration.", "Check road and fire updates before entering mountain corridors.", "Use bear-safe food storage at all campgrounds and trailheads."],
  "remote-arctic-dunes": ["Access is limited and weather-sensitive; plan logistics early.", "Self-rescue and navigation capability are essential in remote terrain.", "Protect fragile dune and tundra habitat by minimizing impact."],
  "remote-lakes-mountain": ["Transport often depends on chartered flights or boats.", "Carry full backcountry safety systems and emergency communications.", "Track weather closely; conditions can change quickly around peaks and lakes."],
  "cave-forest": ["Book cave tours ahead and arrive early for check-in.", "Cave temps stay cool year-round; bring a light jacket.", "Stay on cave paths and follow decontamination rules where posted."],
  "mesa-cultural": ["Respect cultural sites: do not touch or climb masonry features.", "Timed tours fill quickly; reserve early in busy months.", "Sun and elevation can be intense; carry water and shade gear."],
  "river-gorge": ["Check river levels and weather before boating or gorge hikes.", "Trail footing can be slick after rain; use proper footwear.", "Plan parking and shuttle timing for popular access points."],
  alpine: ["Alpine routes require weather judgment and route planning skills.", "Carry layers, rain protection, and emergency essentials.", "Snowfields may persist; traction tools can be seasonally necessary."],
  "coast-rainforest-mountain": ["Distances are larger than they look; split your itinerary by region.", "Pack rain gear year-round and plan around changing weather windows.", "Check tide tables before visiting coastal sections."],
  "desert-badlands": ["Bring high water capacity and limit exposed midday activity.", "Protect fossil and cultural resources by staying on approved paths.", "Wind can be strong; secure gear and eye protection."],
  "rocky-canyon": ["Summer heat is strong; start hikes early and rest in shade.", "Carry water and watch footing on uneven talus and rocky trails.", "Use caves and climbing areas only where permitted."],
  "coastal-forest": ["Fog and rain are common; wear waterproof layers and footwear.", "Stay on designated paths to protect redwood root systems.", "Watch river and beach conditions before remote outings."],
  "alpine-mountain": ["Timed entry or reservations may be required in peak season.", "Altitude, storms, and cold can all occur in one day.", "Use shuttle systems when available to reduce parking stress."],
  "desert-dunes": ["Sand glare and heat are intense; bring eye protection and water.", "Wind can erase tracks quickly; keep navigation reference points.", "Plan sunset visits for safer temperatures and better traction."],
  "tropical-island": ["Practice reef-safe behavior and avoid stepping on coral.", "Bring sun, hydration, and snorkel safety gear for marine-focused days.", "Respect local communities, cultural sites, and protected zones."],
  "lakes-forest": ["Many routes are water-based; verify boat rules and weather.", "Mosquitoes can be intense in warm months; pack repellant.", "Carry maps and communication backups for low-signal areas."],
  "cave-prairie": ["Book cave tours early and wear layers for cooler cave air.", "Watch for bison and wildlife on prairie roads and trails.", "Stay on marked cave routes to preserve formations."],
  "remote-mountain-glacier": ["Distances are vast; fuel and supply planning are critical.", "Backcountry travel needs advanced skill and emergency readiness.", "Monitor glacier, river, and weather hazards continuously."],
  "geothermal-mountain": ["Stay on boardwalks around thermal features; ground can be unstable.", "Traffic delays from wildlife and congestion are common; add time buffers.", "Prepare for rapid weather changes and carry layers."],
  "granite-mountain": ["Use park shuttle and early starts during peak visitation months.", "Waterfalls and granite can be slippery; choose proper footwear.", "Store food in lockers or bear-safe containers in all shared areas."]
};

const parkOverrides = {
  "Gates of the Arctic National Park": ["No roads or established trails: this is advanced wilderness travel.", "Coordinate air taxis, weather windows, and emergency communication before departure.", "Travel only with strong route-finding and remote backcountry experience."],
  "Death Valley National Park": ["Avoid hiking during extreme daytime heat in late spring through early fall.", "Carry emergency water in your car and never pass a gas stop without refueling.", "Check flash flood and road closure alerts before entering canyons."],
  "Grand Canyon National Park": ["If hiking below the rim, plan for a much slower uphill return.", "Treat water stations as supplemental; carry your own emergency reserve.", "Heat risk is highest in inner canyon sections even when rims are cooler."],
  "Yosemite National Park": ["Arrive very early or use transit to avoid valley parking bottlenecks.", "Expect permit/reservation rules in some seasons; verify before travel.", "Respect river, waterfall, and cliff safety boundaries at all times."],
  "Yellowstone National Park": ["Never leave boardwalks near geothermal basins; crust can be dangerous.", "Wildlife jams cause delays; keep legal viewing distance and patience.", "Plan long drives between areas and avoid overpacking your day."],
  "Zion National Park": ["Use the park shuttle for Zion Canyon access in peak season.", "Flash floods can become life-threatening; check canyon conditions before narrow hikes.", "Bring traction and water for steep slickrock terrain."]
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/and preserve/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTips(park) {
  if (parkOverrides[park.name]) {
    return parkOverrides[park.name];
  }
  return terrainTips[park.terrain] || [
    "Check weather, road status, and alerts before visiting.",
    "Bring water, layers, and sun protection for changing conditions.",
    "Stay on designated trails and follow wildlife distance rules."
  ];
}

function getParkBySlug(slug) {
  return parks.find((park) => slugify(park.name) === slug);
}
