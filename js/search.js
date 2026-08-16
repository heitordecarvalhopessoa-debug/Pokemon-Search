function filterTable() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput || typeof pokemons === "undefined") return;

  const term = searchInput.value.toLowerCase();

  const filtered = pokemons.filter((p) => {
    return (
      p.Name.toLowerCase().includes(term) ||
      p.SerialNumber.toLowerCase().includes(term) ||
      (p.Textured === "Yes" && "yes".includes(term)) ||
      (p.Textured === "No" && "no".includes(term))
    );
  });

  renderTable(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", filterTable);
  }
});
