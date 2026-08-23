function parsePrice(priceStr) {
  if (!priceStr || priceStr === "-") return 0;
  
  if (typeof convertPrice === "function") {
    const convertedStr = convertPrice(priceStr);
    const clean = convertedStr.replace(/[^\d.-]/g, "");
    return parseFloat(clean) || 0;
  }

  const clean = priceStr.replace(/[^\d.-]/g, "").replace(",", ".");
  return parseFloat(clean) || 0;
}

function toggleFilterDrawer() {
  const drawer = document.getElementById("filterDrawer");
  const overlay = document.getElementById("filterOverlay");
  if (drawer && overlay) {
    drawer.classList.toggle("open");
    overlay.classList.toggle("active");
  }
}

function closeFilterDrawer() {
  const drawer = document.getElementById("filterDrawer");
  const overlay = document.getElementById("filterOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
  }
}

function resetFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const textureFilter = document.getElementById("textureFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");

  if (categoryFilter) categoryFilter.value = "ALL";
  if (textureFilter) textureFilter.value = "ALL";
  if (favFilter) favFilter.value = "ALL";
  if (sortOrder) sortOrder.value = "default";

  filterTable();
}

function updateActiveFilterBadge(category, texture, fav, sort) {
  const badge = document.getElementById("activeFilterBadge");
  if (!badge) return;

  let activeCount = 0;
  if (category !== "ALL") activeCount++;
  if (texture !== "ALL") activeCount++;
  if (fav !== "ALL") activeCount++;
  if (sort !== "default") activeCount++;

  if (activeCount > 0) {
    badge.innerText = activeCount;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}

function getPageDataset() {
  if (typeof pokemons === "undefined") return [];

  const currentUrl = window.location.pathname.toLowerCase();

  if (currentUrl.includes("collections.html")) {
    const collectionFilter = typeof selectedCollection !== "undefined" ? selectedCollection : "ALL";
    if (collectionFilter === "ALL") {
      return pokemons;
    }
    return pokemons.filter(p => (p.Set || "Unknown") === collectionFilter);
  }

  if (currentUrl.includes("pokemons.html")) {
    return pokemons;
  } 

  if (!window.homeRandomSelection) {
    const shuffled = [...pokemons].sort(() => 0.5 - Math.random());
    window.homeRandomSelection = shuffled.slice(0, 30);
  }
  return window.homeRandomSelection;
}

function setupAutocomplete() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  if (searchInput.parentElement) {
    searchInput.parentElement.style.position = "relative";
  }

  let suggestionsBox = document.getElementById("searchSuggestions");
  if (!suggestionsBox) {
    suggestionsBox = document.createElement("ul");
    suggestionsBox.id = "searchSuggestions";
    suggestionsBox.className = "suggestions-list";
    searchInput.parentElement.appendChild(suggestionsBox);
  }

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!term) {
      suggestionsBox.style.display = "none";
      filterTable();
      return;
    }

    const baseData = getPageDataset();
    
    const matches = Array.from(
      new Set(
        baseData
          .filter(p => p.Name.toLowerCase().includes(term))
          .map(p => p.Name)
      )
    ).slice(0, 6);

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      filterTable();
      return;
    }

    matches.forEach(name => {
      const li = document.createElement("li");
      const regex = new RegExp(`(${term})`, "gi");
      const highlightedName = name.replace(regex, "<strong>$1</strong>");
      
      li.innerHTML = `🔍 ${highlightedName}`;
      
      li.addEventListener("click", () => {
        searchInput.value = name;
        suggestionsBox.style.display = "none";
        filterTable();
      });

      suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = "block";
    filterTable();
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
}

function filterTable() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const textureFilter = document.getElementById("textureFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");

  const baseData = getPageDataset();
  if (!baseData) return;

  const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value : "ALL";
  const selectedTexture = textureFilter ? textureFilter.value : "ALL";
  const selectedFav = favFilter ? favFilter.value : "ALL";
  const selectedSort = sortOrder ? sortOrder.value : "default";

  updateActiveFilterBadge(
    selectedCategory,
    selectedTexture,
    selectedFav,
    selectedSort
  );

  const favorites = typeof getFavorites === "function" ? getFavorites() : [];

  let filtered = baseData.filter((p) => {
    const matchesSearch =
      p.Name.toLowerCase().includes(term) ||
      p.SerialNumber.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "ALL" || p.Category === selectedCategory;

    const matchesTexture =
      selectedTexture === "ALL" || p.Textured === selectedTexture;

    const matchesFav =
      selectedFav === "ALL" || favorites.includes(p.SerialNumber);

    return matchesSearch && matchesCategory && matchesTexture && matchesFav;
  });

  if (sortOrder) {
    if (selectedSort === "price-asc") {
      filtered.sort((a, b) => parsePrice(a.Price1) - parsePrice(b.Price1));
    } else if (selectedSort === "price-desc") {
      filtered.sort((a, b) => parsePrice(b.Price1) - parsePrice(a.Price1));
    } else if (selectedSort === "name-asc") {
      filtered.sort((a, b) => a.Name.localeCompare(b.Name));
    }
  }

  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.innerText = `Showing ${filtered.length} of ${baseData.length} items`;
  }

  if (typeof renderTable === "function") {
    renderTable(filtered);
  }
  if (typeof updateCardCounters === "function") {
    updateCardCounters();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const textureFilter = document.getElementById("textureFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");

  if (categoryFilter) categoryFilter.addEventListener("change", filterTable);
  if (textureFilter) textureFilter.addEventListener("change", filterTable);
  if (favFilter) favFilter.addEventListener("change", filterTable);
  if (sortOrder) sortOrder.addEventListener("change", filterTable);

  const currentUrl = window.location.href.toLowerCase();
  const isHome = !currentUrl.includes("pokemons");
  if (isHome) {
    const loadBtn = document.getElementById("loadMoreBtn");
    if (loadBtn) loadBtn.style.display = "none";
  }

  setupAutocomplete();
  filterTable();
});