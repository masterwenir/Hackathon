const parksGrid = document.getElementById("parks-grid");
const searchInput = document.getElementById("park-search");
const stateFilter = document.getElementById("state-filter");
const resultSummary = document.getElementById("result-summary");

function createCard(park) {
  const card = document.createElement("article");
  card.className = "park-card";

  const tips = getTips(park);

  card.innerHTML = `
    <h2>${park.name}</h2>
    <p class="park-meta"><strong>State/Territory:</strong> ${park.state}</p>
    <ul>
      ${tips.slice(0, 2).map((tip) => `<li>${tip}</li>`).join("")}
    </ul>
    <a class="park-link" href="parks/${slugify(park.name)}.html">View park page</a>
  `;

  return card;
}

function getStateList() {
  const uniqueStates = new Set();
  parks.forEach((park) => {
    park.state.split("/").forEach((part) => uniqueStates.add(part.trim()));
  });
  return Array.from(uniqueStates).sort((a, b) => a.localeCompare(b));
}

function fillStateFilter() {
  getStateList().forEach((stateName) => {
    const option = document.createElement("option");
    option.value = stateName;
    option.textContent = stateName;
    stateFilter.appendChild(option);
  });
}

function hasActiveQueryOrState(query, selectedState) {
  if (query.length > 0) return true;
  if (selectedState !== "all") return true;
  return false;
}

function renderParks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedState = stateFilter.value;

  parksGrid.innerHTML = "";

  if (!hasActiveQueryOrState(query, selectedState)) {
    parksGrid.innerHTML = `
      <div class="empty-state empty-state-prompt">
        <p>Search for a park by name or keyword, or choose a state or territory. Results will appear here.</p>
      </div>
    `;
    resultSummary.textContent = "";
    return;
  }

  const filteredParks = parks.filter((park) => {
    const matchesSearch =
      !query ||
      park.name.toLowerCase().includes(query) ||
      park.state.toLowerCase().includes(query) ||
      park.terrain.toLowerCase().includes(query);

    const matchesState =
      selectedState === "all" ||
      park.state.split("/").map((s) => s.trim()).includes(selectedState);

    return matchesSearch && matchesState;
  });

  if (!filteredParks.length) {
    parksGrid.innerHTML = `
      <div class="empty-state">
        <p>No parks matched your search. Try a different name or state.</p>
      </div>
    `;
    resultSummary.textContent = "0 parks shown.";
    return;
  }

  filteredParks
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((park) => parksGrid.appendChild(createCard(park)));

  resultSummary.textContent = `${filteredParks.length} park${
    filteredParks.length === 1 ? "" : "s"
  } shown.`;
}

fillStateFilter();
renderParks();

searchInput.addEventListener("input", renderParks);
stateFilter.addEventListener("change", renderParks);
