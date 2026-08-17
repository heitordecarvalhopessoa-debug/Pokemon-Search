let currentCurrency = "BRL";
let currentModalPokemon = null;

let exchangeRates = {
  BRL: 1.0,
  USD: 0.18,
  EUR: 0.16
};

async function fetchExchangeRates() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
    if (!response.ok) throw new Error("Erro ao carregar taxas de câmbio");
    
    const data = await response.json();

    if (data.USDBRL && data.EURBRL) {
      const usdToBrl = parseFloat(data.USDBRL.bid);
      const eurToBrl = parseFloat(data.EURBRL.bid);

      exchangeRates.USD = 1 / usdToBrl;
      exchangeRates.EUR = 1 / eurToBrl;

      if (typeof filterTable === "function") {
        filterTable();
      }
      if (currentModalPokemon && typeof updateModalPrices === "function") {
        updateModalPrices(currentModalPokemon);
      }
    }
  } catch (error) {
    console.warn("Usando taxas de câmbio padrão de fallback.", error);
  }
}

function convertPrice(priceStr, targetCurrency = currentCurrency) {
  if (!priceStr || priceStr === "-" || priceStr.trim() === "") return "-";

  const numericValue = parseFloat(priceStr.replace(/[^\d.-]/g, "").replace(",", "."));
  if (isNaN(numericValue) || numericValue === 0) return "-";

  const rate = exchangeRates[targetCurrency] || 1;
  const convertedValue = numericValue * rate;

  switch (targetCurrency) {
    case "USD":
      return `$ ${convertedValue.toFixed(2)}`;
    case "EUR":
      return `€ ${convertedValue.toFixed(2)}`;
    case "BRL":
    default:
      return `R$ ${convertedValue.toFixed(2).replace(".", ",")}`;
  }
}

function getSelectedCurrency() {
  return currentCurrency;
}

function openCurrencyModal() {
  const modal = document.getElementById("currencyModal");
  if (modal) modal.style.display = "flex";
}

function closeCurrencyModal() {
  const modal = document.getElementById("currencyModal");
  if (modal) modal.style.display = "none";
}

function selectCurrency(currencyCode) {
  currentCurrency = currencyCode;

  const buttons = document.querySelectorAll(".currency-option-btn");
  buttons.forEach((btn) => {
    if (btn.getAttribute("data-currency") === currencyCode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const labels = { BRL: "BRL (R$)", USD: "USD ($)", EUR: "EUR (€)" };
  const labelEl = document.getElementById("currentCurrencyLabel");
  if (labelEl) labelEl.innerText = labels[currencyCode] || currencyCode;

  if (typeof filterTable === "function") {
    filterTable();
  }

  if (currentModalPokemon && typeof updateModalPrices === "function") {
    updateModalPrices(currentModalPokemon);
  }

  closeCurrencyModal();
}

window.addEventListener("click", (event) => {
  const currencyModal = document.getElementById("currencyModal");
  if (event.target === currencyModal) {
    closeCurrencyModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchExchangeRates();
});