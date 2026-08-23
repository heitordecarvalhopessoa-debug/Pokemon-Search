let currentPage = 1;
const ITEMS_PER_PAGE = 30;
let currentDataset = [];
let coinsCarouselIndex = 0;

function getFavorites() {
  const favorites = localStorage.getItem("favoriteCards");
  return favorites ? JSON.parse(favorites) : [];
}

function toggleFavorite(serialNumber, event) {
  event.stopPropagation();

  let favorites = getFavorites();
  if (favorites.includes(serialNumber)) {
    favorites = favorites.filter((id) => id !== serialNumber);
  } else {
    favorites.push(serialNumber);
  }

  localStorage.setItem("favoriteCards", JSON.stringify(favorites));

  if (typeof updateCardCounters === "function") {
    updateCardCounters();
  }

  if (typeof filterTable === "function") {
    filterTable();
  } else if (typeof pokemons !== "undefined") {
    renderTable(pokemons);
  }

  renderCoinsCarousel();
}

function createCardElement(pokemon) {
  const favorites = getFavorites();
  const card = document.createElement("div");
  card.className = "card-item";

  const badgeClass = pokemon.Textured === "Yes" ? "badge-yes" : "badge-no";
  const texturedText = pokemon.Textured === "Yes" ? "Textured" : "Non-Textured";
  const isFav = favorites.includes(pokemon.SerialNumber);
  const heartIcon = isFav ? "❤️" : "🤍";

  const formattedPrice1 =
    typeof convertPrice === "function"
      ? convertPrice(pokemon.Price1)
      : pokemon.Price1;

  card.innerHTML = `
    <div class="card-img-wrapper">
      <button class="fav-btn ${isFav ? "active" : ""}" onclick="toggleFavorite('${pokemon.SerialNumber}', event)" title="Favorite">
        ${heartIcon}
      </button>
      <img src="${pokemon.Image}" alt="${pokemon.Name}" class="card-img" onerror="this.src='https://via.placeholder.com/140x195?text=No+Img'">
    </div>
    <div class="card-info">
      <div class="card-title" title="${pokemon.Name}">${pokemon.Name}</div>
      <div class="card-series">${pokemon.SerialNumber}</div>
      <div class="card-set" title="${pokemon.Set || '-'}">${pokemon.Set || '-'}</div>
      <div class="card-badges">
        <span class="${badgeClass}">${texturedText}</span>
      </div>
      <div class="card-price-main">${formattedPrice1}</div>
    </div>
  `;

  card.addEventListener("click", () => {
    openModal(pokemon);
  });

  return card;
}

function renderCoinsCarousel() {
  const track = document.getElementById("coinsCarouselTrack");
  if (!track || typeof pokemons === "undefined") return;

  track.innerHTML = "";
  const coins = pokemons.filter((p) => p.Category === "Coin");

  coins.forEach((coin) => {
    const card = createCardElement(coin);
    card.classList.add("carousel-card");
    track.appendChild(card);
  });
}

function moveCoinsCarousel(direction) {
  const track = document.getElementById("coinsCarouselTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".card-item");
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth + 16;
  const maxIndex = cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth);

  coinsCarouselIndex += direction;

  if (coinsCarouselIndex < 0) {
    coinsCarouselIndex = 0;
  } else if (coinsCarouselIndex > maxIndex) {
    coinsCarouselIndex = Math.max(0, maxIndex);
  }

  track.style.transform = `translateX(-${coinsCarouselIndex * cardWidth}px)`;
}

function renderTable(data) {
  const container = document.getElementById("cardGrid");
  const noResults = document.getElementById("noResults");

  if (!container || !noResults) return;

  container.innerHTML = "";
  currentPage = 1;
  currentDataset = data || [];

  if (currentDataset.length === 0) {
    noResults.style.display = "block";
    updateLoadMoreButton();
    return;
  } else {
    noResults.style.display = "none";
  }

  const initialCards = currentDataset.slice(0, ITEMS_PER_PAGE);
  initialCards.forEach((pokemon) => {
    container.appendChild(createCardElement(pokemon));
  });

  updateLoadMoreButton();
}

function loadMoreCards() {
  const container = document.getElementById("cardGrid");
  if (!container) return;

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const nextCards = currentDataset.slice(startIndex, endIndex);

  nextCards.forEach((pokemon) => {
    container.appendChild(createCardElement(pokemon));
  });

  currentPage++;
  updateLoadMoreButton();
}

function updateLoadMoreButton() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (!loadMoreBtn) return;

  const totalLoaded = currentPage * ITEMS_PER_PAGE;
  if (totalLoaded >= currentDataset.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

function updateModalPrices(pokemon) {
  if (!pokemon) return;

  const price1El = document.getElementById("modalPrice1");
  const price2El = document.getElementById("modalPrice2");
  const price3El = document.getElementById("modalPrice3");

  if (price1El) price1El.innerText = typeof convertPrice === "function" ? convertPrice(pokemon.Price1) : pokemon.Price1;
  if (price2El) price2El.innerText = typeof convertPrice === "function" ? convertPrice(pokemon.Price2) : pokemon.Price2;
  if (price3El) price3El.innerText = typeof convertPrice === "function" ? convertPrice(pokemon.Price3) : pokemon.Price3;
}

function openModal(pokemon) {
  currentModalPokemon = pokemon;

  const zoomContainer = document.getElementById("zoomContainer");
  const modalImg = document.getElementById("modalImg");
  if (zoomContainer && modalImg) {
    zoomContainer.classList.remove("zoomed");
    modalImg.style.transformOrigin = "center center";
  }

  if (modalImg) modalImg.src = pokemon.Image;
  
  const modalNameEl = document.getElementById("modalName");
  if (modalNameEl) modalNameEl.innerText = pokemon.Name;

  const modalSetEl = document.getElementById("modalSet");
  if (modalSetEl) {
    modalSetEl.innerText = pokemon.Set || "-";
  }

  const modalSeriesEl = document.getElementById("modalSeries");
  if (modalSeriesEl) modalSeriesEl.innerText = pokemon.SerialNumber;

  const modalTexturedEl = document.getElementById("modalTextured");
  if (modalTexturedEl) {
    modalTexturedEl.innerText = pokemon.Textured === "Yes" ? "Yes" : "No";
  }

  updateModalPrices(pokemon);

  const cardModal = document.getElementById("cardModal");
  if (cardModal) cardModal.style.display = "flex";
}

function closeModal() {
  currentModalPokemon = null;
  const cardModal = document.getElementById("cardModal");
  if (cardModal) cardModal.style.display = "none";
}

function openCredits() {
  const creditsModal = document.getElementById("creditsModal");
  if (creditsModal) creditsModal.style.display = "flex";
}

function closeCredits() {
  const creditsModal = document.getElementById("creditsModal");
  if (creditsModal) creditsModal.style.display = "none";
}

function initZoomFeature() {
  const zoomContainer = document.getElementById("zoomContainer");
  const modalImg = document.getElementById("modalImg");

  if (!zoomContainer || !modalImg) return;

  zoomContainer.addEventListener("mousemove", (e) => {
    const rect = zoomContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    modalImg.style.transformOrigin = `${x}% ${y}%`;
  });

  zoomContainer.addEventListener("click", () => {
    zoomContainer.classList.toggle("zoomed");
  });

  zoomContainer.addEventListener("mouseleave", () => {
    zoomContainer.classList.remove("zoomed");
    modalImg.style.transformOrigin = "center center";
  });
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
  initZoomFeature();
  renderCoinsCarousel();
});