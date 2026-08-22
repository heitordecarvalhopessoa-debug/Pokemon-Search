const creditsData = {
  sources: {
    title: "Information Sources",
    name: "LigaPokemon, Amazon, Ebay"
  },
  rights: {
    title: "All rights to original creators",
    name: "Nintendo, Copag"
  },
  version: "1.5.0"
};

function renderCreditsModal() {
  const creditsModal = document.getElementById("creditsModal");
  if (!creditsModal) return;

  creditsModal.innerHTML = `
    <div class="modal-content credits-content">
      <span class="close-btn" onclick="closeCredits()">&times;</span>
      <div class="credits-header">
        <h2>Credits</h2>
      </div>

      <div class="credits-body">
        <div class="credits-card">
          <div>
            <strong>${creditsData.developer.title}</strong>
            <p>${creditsData.developer.name}</p>
          </div>
        </div>

        <div class="credits-card">
          <div>
            <strong>${creditsData.sources.title}</strong>
            <p>${creditsData.sources.name}</p>
          </div>
        </div>

        <div class="credits-card">
          <div>
            <strong>${creditsData.rights.title}</strong>
            <p>${creditsData.rights.name}</p>
          </div>
        </div>

        <div class="credits-footer">
          <span>Version ${creditsData.version}</span>
        </div>
      </div>
    </div>
  `;
}

function openCredits() {
  const modal = document.getElementById("creditsModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeCredits() {
  const modal = document.getElementById("creditsModal");
  if (modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCreditsModal();
});