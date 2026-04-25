const animalsContent = document.getElementById("animals-content");
const animalsSlug = window.location.pathname.split("/").pop().replace(".html", "");
const parkSlug = animalsSlug.replace(/-animals$/, "");
const animalsPark = getParkBySlug(parkSlug);

function escapeAnimalsHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAnimalsPage(park) {
  const groups = groupAnimalsByRarity(getAnimalsForPark(park));

  animalsContent.innerHTML = `
    <a class="back-link" href="../index.html">Back to all parks</a>
    <a class="back-link secondary-link" href="../parks/${slugify(park.name)}.html">Back to park page</a>
    <h2>${escapeAnimalsHtml(park.name)} Wildlife List</h2>
    <p class="park-meta"><strong>State/Territory:</strong> ${escapeAnimalsHtml(park.state)}</p>
    <section class="park-section park-wildlife">
      <h3>Animals by Rarity</h3>
      <div class="rarity-rail">
        ${groups
          .map(
            (group) => `
          <div class="rarity-block rarity-${group.id}">
            <h4 class="rarity-heading">${group.label}</h4>
            <ul class="wildlife-list">
              ${group.animals.map((name) => `<li>${escapeAnimalsHtml(name)}</li>`).join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

if (!animalsPark) {
  animalsContent.innerHTML = `
    <a class="back-link" href="../index.html">Back to all parks</a>
    <h2>Animals page not found</h2>
    <p>We could not find the matching national park for this animals page.</p>
  `;
} else {
  renderAnimalsPage(animalsPark);
}
