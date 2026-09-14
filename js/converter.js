let currentCurrency = "BRL";
let currentModalPokemon = null;

let exchangeRates = {
  BRL: 1.0,
  USD: 0.18,
  EUR: 0.16,
  JPY: 24.0,
  UK: 0.14,
  AUS: 0.25,
  CHF: 0.17,
};

async function fetchExchangeRates() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,AUD-BRL,CHF-BRL");
    if (!response.ok) throw new Error("Failed to load exchange rates");
    
    const data = await response.json();

    if (data.USDBRL && data.EURBRL) {
      const usdToBrl = parseFloat(data.USDBRL.bid);
      const eurToBrl = parseFloat(data.EURBRL.bid);

      exchangeRates.USD = 1 / usdToBrl;
      exchangeRates.EUR = 1 / eurToBrl;

      if (typeof filterTable === "function") filterTable();
    }
  } catch (error) {
    console.warn("Using default fallback exchange rates.", error);
  }
}

function convertPrice(priceStr, targetCurrency = currentCurrency) {
  if (!priceStr || priceStr === "-" || priceStr.trim() === "") return "-";

  const numericValue = parseFloat(priceStr.replace(/[^\d.-]/g, "").replace(",", "."));
  if (isNaN(numericValue) || numericValue === 0) return "-";

  const rate = exchangeRates[targetCurrency] || 1;
  const convertedValue = numericValue * rate;

  switch (targetCurrency) {
    case "USD": return `$ ${convertedValue.toFixed(2)}`;
    case "EUR": return `€ ${convertedValue.toFixed(2)}`;
    case "JPY": return `¥ ${convertedValue.toFixed(0)}`;
    case "UK":  return `£ ${convertedValue.toFixed(2)}`;
    case "AUS": return `$ ${convertedValue.toFixed(2)}`;
    case "CHF": return `CHF ${convertedValue.toFixed(2)}`;
    case "BRL":
    default:
      return `R$ ${convertedValue.toFixed(2).replace(".", ",")}`;
  }
}

window.openCurrencyModal = function() {
  const modal = document.getElementById("currencyModal");
  if (modal) {
    modal.style.setProperty("display", "flex", "important");
  } else {
    console.error("currencyModal element not found");
  }
};

window.closeCurrencyModal = function() {
  const modal = document.getElementById("currencyModal");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
  }
};

window.selectCurrency = function(currencyCode) {
  currentCurrency = currencyCode;

  document.querySelectorAll(".currency-option-btn").forEach((btn) => {
    if (btn.getAttribute("data-currency") === currencyCode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const labels = { BRL: "BRL (R$)", USD: "USD ($)", EUR: "EUR (€)", JPY: "JPY (¥)", UK: "UK (£)", AUS: "AUS ($)", CHF: "CHF (CHF)" };
  const labelEl = document.getElementById("currentCurrencyLabel");
  if (labelEl) labelEl.innerText = labels[currencyCode] || currencyCode;

  if (typeof filterTable === "function") filterTable();
  if (currentModalPokemon && typeof updateModalPrices === "function") {
    updateModalPrices(currentModalPokemon);
  }

  window.closeCurrencyModal();
};

window.addEventListener("click", (event) => {
  const currencyModal = document.getElementById("currencyModal");
  if (event.target === currencyModal) {
    window.closeCurrencyModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchExchangeRates();
});