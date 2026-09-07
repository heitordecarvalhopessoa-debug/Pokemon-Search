let selectedCard1 = null;
let selectedCard2 = null;

document.addEventListener("DOMContentLoaded", () => {
    initComparePage();
});

function initComparePage() {
    populateCardSelects();

    const select1 = document.getElementById("cardSelect1");
    const select2 = document.getElementById("cardSelect2");

    if (select1) {
        select1.addEventListener("change", (e) => {
            selectedCard1 = findPokemonBySerialOrIndex(e.target.value);
            updateCompareView();
        });
    }

    if (select2) {
        select2.addEventListener("change", (e) => {
            selectedCard2 = findPokemonBySerialOrIndex(e.target.value);
            updateCompareView();
        });
    }

    setupSearchInput(1);
    setupSearchInput(2);

    if (typeof fetchExchangeRates === "function") {
        fetchExchangeRates();
    }
}

function setupSearchInput(slotIndex) {
    const searchInput = document.getElementById(`cardSearchInput${slotIndex}`);
    const suggestionsList = document.getElementById(`suggestionsList${slotIndex}`);

    if (!searchInput || !suggestionsList) return;

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        suggestionsList.innerHTML = "";

        if (query.length === 0 || typeof pokemons === "undefined") {
            suggestionsList.style.display = "none";
            return;
        }

        const matches = pokemons
            .map((card, index) => ({ card, index }))
            .filter(({ card }) => card.Name.toLowerCase().includes(query) || card.Set.toLowerCase().includes(query))
            .slice(0, 8);

        if (matches.length === 0) {
            suggestionsList.style.display = "none";
            return;
        }

        matches.forEach(({ card, index }) => {
            const li = document.createElement("li");
            li.textContent = `${card.Name} (${card.Set} - ${card.SerialNumber})`;
            li.addEventListener("click", () => {
                selectCardFromSearch(index, slotIndex);
                searchInput.value = "";
                suggestionsList.style.display = "none";
            });
            suggestionsList.appendChild(li);
        });

        suggestionsList.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
            suggestionsList.style.display = "none";
        }
    });
}

function selectCardFromSearch(cardIndex, slotIndex) {
    const selectEl = document.getElementById(`cardSelect${slotIndex}`);

    if (slotIndex === 1) {
        selectedCard1 = pokemons[cardIndex];
        if (selectEl) selectEl.value = cardIndex;
    } else if (slotIndex === 2) {
        selectedCard2 = pokemons[cardIndex];
        if (selectEl) selectEl.value = cardIndex;
    }

    updateCompareView();
}

function populateCardSelects() {
    const select1 = document.getElementById("cardSelect1");
    const select2 = document.getElementById("cardSelect2");

    if (!select1 || !select2 || typeof pokemons === "undefined") return;

    select1.innerHTML = '<option value="">-- Choose Card 1 --</option>';
    select2.innerHTML = '<option value="">-- Choose Card 2 --</option>';

    pokemons.forEach((card, index) => {
        const optionText = `${card.Name} (${card.Set} - ${card.SerialNumber})`;

        const opt1 = document.createElement("option");
        opt1.value = index;
        opt1.textContent = optionText;
        select1.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = index;
        opt2.textContent = optionText;
        select2.appendChild(opt2);
    });
}

function findPokemonBySerialOrIndex(identifier) {
    if (identifier === "" || identifier === null) return null;
    if (typeof pokemons === "undefined") return null;
    return pokemons[identifier] || null;
}

function parsePriceValue(priceStr) {
    if (!priceStr || priceStr === "-" || priceStr.trim() === "") return null;
    const cleanStr = priceStr.replace(/[^\d.-]/g, "").replace(",", ".");
    const val = parseFloat(cleanStr);
    return isNaN(val) || val === 0 ? null : val;
}

function getMinPrice(card) {
    if (!card) return null;
    const prices = [
        parsePriceValue(card.Price1),
        parsePriceValue(card.Price2),
        parsePriceValue(card.Price3)
    ].filter(p => p !== null);

    return prices.length > 0 ? Math.min(...prices) : null;
}

function renderCardSlot(card, slotNumber) {
    const imgEl = document.getElementById(`compareImg${slotNumber}`);
    const nameEl = document.getElementById(`compareName${slotNumber}`);
    const setEl = document.getElementById(`compareSet${slotNumber}`);
    const serialEl = document.getElementById(`compareSerial${slotNumber}`);
    const price1El = document.getElementById(`price1Slot${slotNumber}`);
    const price2El = document.getElementById(`price2Slot${slotNumber}`);
    const price3El = document.getElementById(`price3Slot${slotNumber}`);
    const minPriceEl = document.getElementById(`minPriceSlot${slotNumber}`);

    if (!card) {
        if (imgEl) imgEl.src = "Assets/ico/Logo.png";
        if (nameEl) nameEl.textContent = "Select a card";
        if (setEl) setEl.textContent = "-";
        if (serialEl) serialEl.textContent = "-";
        if (price1El) price1El.textContent = "-";
        if (price2El) price2El.textContent = "-";
        if (price3El) price3El.textContent = "-";
        if (minPriceEl) minPriceEl.textContent = "-";
        return;
    }

    if (imgEl) imgEl.src = card.Image || "Assets/ico/Logo.png";
    if (nameEl) nameEl.textContent = card.Name;
    if (setEl) setEl.textContent = card.Set;
    if (serialEl) serialEl.textContent = card.SerialNumber;

    const formatPrice = (p) => typeof convertPrice === "function" ? convertPrice(p) : p;

    if (price1El) price1El.textContent = formatPrice(card.Price1);
    if (price2El) price2El.textContent = formatPrice(card.Price2);
    if (price3El) price3El.textContent = formatPrice(card.Price3);

    const minP = getMinPrice(card);
    if (minPriceEl) {
        minPriceEl.textContent = minP !== null ? formatPrice(`$ ${minP.toFixed(2)}`) : "-";
    }
}

function updateCompareView() {
    renderCardSlot(selectedCard1, 1);
    renderCardSlot(selectedCard2, 2);

    const diffContainer = document.getElementById("compareDifference");
    if (!diffContainer) return;

    if (!selectedCard1 || !selectedCard2) {
        diffContainer.innerHTML = "<p>Select two cards to view a detailed price comparison.</p>";
        return;
    }

    const min1 = getMinPrice(selectedCard1);
    const min2 = getMinPrice(selectedCard2);

    if (min1 === null || min2 === null) {
        diffContainer.innerHTML = "<p>Insufficient pricing data to compare one or both cards.</p>";
        return;
    }

    const diff = Math.abs(min1 - min2);
    const formattedDiff = typeof convertPrice === "function" ? convertPrice(`$ ${diff.toFixed(2)}`) : `$ ${diff.toFixed(2)}`;

    let resultHTML = "";
    if (min1 < min2) {
        const percent = (((min2 - min1) / min2) * 100).toFixed(1);
        resultHTML = `
            <div class="comparison-summary winner-card1">
                <h3>Card 1 is cheaper!</h3>
                <p><strong>Minimum price difference:</strong> ${formattedDiff} (${percent}% cheaper)</p>
            </div>
        `;
    } else if (min2 < min1) {
        const percent = (((min1 - min2) / min1) * 100).toFixed(1);
        resultHTML = `
            <div class="comparison-summary winner-card2">
                <h3>Card 2 is cheaper!</h3>
                <p><strong>Minimum price difference:</strong> ${formattedDiff} (${percent}% cheaper)</p>
            </div>
        `;
    } else {
        resultHTML = `
            <div class="comparison-summary draw">
                <h3>Both cards have the same lowest price!</h3>
            </div>
        `;
    }

    diffContainer.innerHTML = resultHTML;
}

const originalSelectCurrency = window.selectCurrency;
if (typeof originalSelectCurrency === "function") {
    window.selectCurrency = function(code) {
        originalSelectCurrency(code);
        updateCompareView();
    };
}