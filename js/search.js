let selectedColor = "ALL";

function selectColorFilter(color) {
  selectedColor = color;

  const buttons = document.querySelectorAll(".color-btn");
  buttons.forEach(btn => {
    if (btn.dataset.color === color) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (typeof currentPage !== "undefined") currentPage = 1;
  filterTable();
}

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
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const textureFilter = document.getElementById("textureFilter");
  const typeFilter = document.getElementById("typeFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");
  const priceRangePreset = document.getElementById("priceRangePreset");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");

  if (searchInput) searchInput.value = "";
  if (categoryFilter) categoryFilter.value = "ALL";
  if (textureFilter) textureFilter.value = "ALL";
  if (typeFilter) typeFilter.value = "ALL";
  if (favFilter) favFilter.value = "ALL";
  if (sortOrder) sortOrder.value = "default";
  if (priceRangePreset) priceRangePreset.value = "ALL";
  if (minPriceInput) minPriceInput.value = "";
  if (maxPriceInput) maxPriceInput.value = "";

  selectColorFilter("ALL");
  filterTable();
}

function updateActiveFilterBadge(category, texture, type, fav, sort, preset, minPrice, maxPrice, color, searchTerm) {
  const badge = document.getElementById("activeFilterBadge");
  if (!badge) return;

  let activeCount = 0;
  if (category !== "ALL") activeCount++;
  if (texture !== "ALL") activeCount++;
  if (type !== "" && type !== "ALL") activeCount++;
  if (fav !== "ALL") activeCount++;
  if (sort !== "default") activeCount++;
  if (preset !== "ALL") activeCount++;
  if (minPrice !== "" && !isNaN(minPrice)) activeCount++;
  if (maxPrice !== "" && !isNaN(maxPrice)) activeCount++;
  if (color && color !== "ALL") activeCount++;
  if (searchTerm && searchTerm.length > 0) activeCount++;

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

    filterTable();

    if (!term) {
      suggestionsBox.style.display = "none";
      return;
    }

    const baseData = getPageDataset();
    const seenNames = new Set();
    const matches = [];

    for (const p of baseData) {
      if (p.Name.toLowerCase().includes(term) && !seenNames.has(p.Name)) {
        seenNames.add(p.Name);
        matches.push(p);
        if (matches.length >= 6) break;
      }
    }

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    matches.forEach(item => {
      const name = typeof item === "object" ? item.Name : item;
      const imageUrl = typeof item === "object" ? (item.Image || item.Img || "") : "";

      const li = document.createElement("li");
      const regex = new RegExp(`(${term})`, "gi");
      const highlightedName = name.replace(regex, "<strong>$1</strong>");
      
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          ${imageUrl ? `<img src="${imageUrl}" alt="${name}" style="width: 24px; height: 32px; object-fit: cover; border: 1px solid #ddd; border-radius: 2px;" />` : '🔍'}
          <span>${highlightedName}</span>
        </div>
      `;
      
      li.addEventListener("click", () => {
        searchInput.value = name;
        suggestionsBox.style.display = "none";
        filterTable();
      });

      suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = "block";
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
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");
  const priceRangePreset = document.getElementById("priceRangePreset");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");

  const baseData = getPageDataset();
  if (!baseData) return;

  const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value : "ALL";
  const selectedTexture = textureFilter ? textureFilter.value : "ALL";
  const selectedType = typeFilter ? typeFilter.value : "ALL";
  const selectedRegion = regionFilter ? regionFilter.value : "ALL";
  const selectedFav = favFilter ? favFilter.value : "ALL";
  const selectedSort = sortOrder ? sortOrder.value : "default";
  const selectedPreset = priceRangePreset ? priceRangePreset.value : "ALL";

  const minPriceVal = minPriceInput ? minPriceInput.value.trim() : "";
  const maxPriceVal = maxPriceInput ? maxPriceInput.value.trim() : "";

  const minPrice = minPriceVal !== "" ? parseFloat(minPriceVal) : null;
  const maxPrice = maxPriceVal !== "" ? parseFloat(maxPriceVal) : null;

  const favorites = typeof getFavorites === "function" ? getFavorites() : [];

  let filtered = baseData.filter((p) => {
    const cardName = p.Name ? p.Name.toLowerCase() : "";
    const cardSerial = p.SerialNumber ? p.SerialNumber.toLowerCase() : "";
    
    const matchesSearch = !term || cardName.includes(term) || cardSerial.includes(term);
    
    const hasStarInName = cardName.includes("star");

    const cardCategory = p.Category || (typeof getCardCategory === "function" ? getCardCategory(p.Name) : "Other");
    const matchesCategory = selectedCategory === "ALL" || cardCategory === selectedCategory;

    const cardTexture = p.Textured || "No";
    const matchesTexture = selectedTexture === "ALL" || cardTexture === selectedTexture;

    const cardType = p.Type || (typeof getCardType === "function" ? getCardType(p.Name) : "Normal");
    const matchesType = selectedType === "ALL" || !selectedType || cardType.toUpperCase() === selectedType.toUpperCase() || (selectedType === "RGB" && (cardType.toUpperCase() === "RGB" || cardName.includes("rgb")));

    const cardRegion = typeof getCardPlace === "function" ? getCardPlace(p.Name) : "All";
    const matchesRegion = selectedRegion === "ALL" || cardRegion === selectedRegion;

    const isFav = favorites.includes(p.SerialNumber);
    let matchesFav = true;
    if (selectedFav === "fav" || selectedFav === "true") {
      matchesFav = isFav;
    } else if (selectedFav === "not-fav" || selectedFav === "false") {
      matchesFav = !isFav;
    }

    const cardColor = p.Color || p.ColorName || "";
    const matchesColor =
      typeof selectedColor === "undefined" || selectedColor === "ALL" || cardColor.toLowerCase() === selectedColor.toLowerCase();

    const itemPrice = parsePrice(p.Price1);
    let matchesPresetPrice = true;

    if (selectedPreset === "under-20") {
      matchesPresetPrice = itemPrice <= 20;
    } else if (selectedPreset === "21-200") {
      matchesPresetPrice = itemPrice >= 21 && itemPrice <= 200;
    } else if (selectedPreset === "200-500") {
      matchesPresetPrice = itemPrice >= 200 && itemPrice <= 500;
    } else if (selectedPreset === "501-1500") {
      matchesPresetPrice = itemPrice >= 501 && itemPrice <= 1500;
    } else if (selectedPreset === "above-1501" || selectedPreset === "above-50") {
      matchesPresetPrice = itemPrice > 1500 || (selectedPreset === "above-50" && itemPrice > 50);
    }

    let matchesMinPrice = true;
    let matchesMaxPrice = true;

    if (minPrice !== null && !isNaN(minPrice)) {
      matchesMinPrice = itemPrice >= minPrice;
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      matchesMaxPrice = itemPrice <= maxPrice;
    }

    return (
      (matchesSearch || hasStarInName) &&
      matchesCategory &&
      matchesTexture &&
      matchesType &&
      matchesRegion &&
      matchesFav &&
      matchesColor &&
      matchesPresetPrice &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  if (sortOrder && filtered.length > 0) {
    if (selectedSort === "price-asc") {
      filtered.sort((a, b) => parsePrice(a.Price1) - parsePrice(b.Price1));
    } else if (selectedSort === "price-desc") {
      filtered.sort((a, b) => parsePrice(b.Price1) - parsePrice(a.Price1));
    } else if (selectedSort === "name-asc") {
      filtered.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
    } else if (selectedSort === "name-desc") {
      filtered.sort((a, b) => (b.Name || "").localeCompare(a.Name || ""));
    }
  }

  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    resultsCount.innerText = `A mostrar ${filtered.length} de ${baseData.length} itens`;
  }

  if (typeof renderTable === "function") {
    renderTable(filtered);
  }
  if (typeof updateCardCounters === "function") {
    updateCardCounters();
  }
  
  if (typeof updateActiveFilterBadge === "function") {
    updateActiveFilterBadge(
      selectedCategory, selectedTexture, selectedType, selectedFav,
      selectedSort, selectedPreset, minPriceVal, maxPriceVal, typeof selectedColor !== "undefined" ? selectedColor : "ALL", term
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const regionFilter = document.getElementById("regionFilter");
  if (regionFilter) regionFilter.addEventListener("change", filterTable);
});

document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const textureFilter = document.getElementById("textureFilter");
  const typeFilter = document.getElementById("typeFilter");
  const favFilter = document.getElementById("favFilter");
  const sortOrder = document.getElementById("sortOrder");
  const priceRangePreset = document.getElementById("priceRangePreset");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");

  if (categoryFilter) categoryFilter.addEventListener("change", filterTable);
  if (textureFilter) textureFilter.addEventListener("change", filterTable);
  if (typeFilter) typeFilter.addEventListener("change", filterTable);
  if (favFilter) favFilter.addEventListener("change", filterTable);
  if (sortOrder) sortOrder.addEventListener("change", filterTable);
  if (priceRangePreset) priceRangePreset.addEventListener("change", filterTable);
  if (minPriceInput) minPriceInput.addEventListener("input", filterTable);
  if (maxPriceInput) maxPriceInput.addEventListener("input", filterTable);

  const currentUrl = window.location.href.toLowerCase();
  const isHome = !currentUrl.includes("pokemons");
  if (isHome) {
    const loadBtn = document.getElementById("loadMoreBtn");
    if (loadBtn) loadBtn.style.display = "none";
  }

  setupAutocomplete();
  filterTable();
});