function renderTable(data) {
  const container = document.getElementById("cardGrid");
  const noResults = document.getElementById("noResults");

  if (!container || !noResults) return;

  container.innerHTML = "";

  if (data.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  data.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card-item";

    const badgeClass = pokemon.Textured === "Yes" ? "badge-yes" : "badge-no";
    const texturedText =
      pokemon.Textured === "Yes" ? "Textured" : "Non-Textured";

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${pokemon.Image}" alt="${pokemon.Name}" class="card-img" onerror="this.src='https://via.placeholder.com/140x195?text=No+Img'">
      </div>
      <div class="card-info">
        <div class="card-title" title="${pokemon.Name}">${pokemon.Name}</div>
        <div class="card-series">${pokemon.SerialNumber}</div>
        <div class="card-badges">
          <span class="${badgeClass}">${texturedText}</span>
        </div>
        <div class="card-price-main">${pokemon.Price1}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(pokemon);
    });

    container.appendChild(card);
  });
}

function openModal(pokemon) {
  document.getElementById("modalImg").src = pokemon.Image;
  document.getElementById("modalName").innerText = pokemon.Name;
  document.getElementById("modalSeries").innerText = pokemon.SerialNumber;
  document.getElementById("modalTextured").innerText =
    pokemon.Textured === "Yes" ? "Yes" : "No";

  document.getElementById("modalPrice1").innerText = pokemon.Price1;
  document.getElementById("modalPrice2").innerText = pokemon.Price2;
  document.getElementById("modalPrice3").innerText = pokemon.Price3;

  document.getElementById("cardModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("cardModal").style.display = "none";
}

function openCredits() {
  document.getElementById("creditsModal").style.display = "flex";
}

function closeCredits() {
  document.getElementById("creditsModal").style.display = "none";
}

window.onclick = function (event) {
  const cardModal = document.getElementById("cardModal");
  const creditsModal = document.getElementById("creditsModal");

  if (event.target === cardModal) {
    closeModal();
  }
  if (event.target === creditsModal) {
    closeCredits();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof pokemons !== "undefined") {
    renderTable(pokemons);
  }
});
