let currentCurrency = "USD";
let currentModalPokemon = null;

let exchangeRates = {
  BRL: 1.0,
  USD: 0.18,
  EUR: 0.16,
  CNY: 1.25,
  KRW: 240.0,
  JPY: 24.0,
  UK: 0.14,
  AUS: 0.25,
  CHF: 0.17,
  CAD: 0.24,
  HKD: 1.40,
  SGD: 0.24,
  ARS: 175.0,
  MXN: 3.10,
  CLP: 165.0,
};

async function fetchExchangeRates() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,KRW-BRL,HKD-BRL,SGD-BRL,ARS-BRL,MXN-BRL,CLP-BRL");
    if (!response.ok) throw new Error("Error in count [122]");
    
    const data = await response.json();

    const pairs = {
      USD: data.USDBRL,
      EUR: data.EURBRL,
      CNY: data.CNYBRL,
      KRW: data.KRWBRL,
      JPY: data.JPYBRL,
      UK: data.GBPBRL,
      AUS: data.AUDBRL,
      CHF: data.CHFBRL,
      CAD: data.CADBRL,
      HKD: data.HKDBRL,
      SGD: data.SGDBRL,
      ARS: data.ARSBRL,
      MXN: data.MXNBRL,
      CLP: data.CLPBRL
    };

    for (const [key, value] of Object.entries(pairs)) {
      if (value && value.bid) {
        exchangeRates[key] = 1 / parseFloat(value.bid);
      }
    }

    if (typeof filterTable === "function") filterTable();
  } catch (error) {
    console.warn("Usando taxas de câmbio padrão (fallback).[cite: 1]", error);
  }
}

function convertPrice(priceStr, targetCurrency = currentCurrency) {
  if (!priceStr || priceStr === "-" || priceStr.trim() === "") return "-";

  const numericValue = parseFloat(priceStr.replace(/[^\d.-]/g, "").replace(",", "."));
  if (isNaN(numericValue) || numericValue === 0) return "-";

  const rate = exchangeRates[targetCurrency] || 1;
  const convertedValue = numericValue * rate;

  const currencySymbols = {
    USD: `$ ${convertedValue.toFixed(2)}`,
    EUR: `€ ${convertedValue.toFixed(2)}`,
    CNY: `¥ ${convertedValue.toFixed(2)}`,
    KRW: `₩ ${convertedValue.toFixed(0)}`,
    JPY: `¥ ${convertedValue.toFixed(0)}`,
    UK:  `£ ${convertedValue.toFixed(2)}`,
    AUS: `$ ${convertedValue.toFixed(2)}`,
    CHF: `CHF ${convertedValue.toFixed(2)}`,
    CAD: `$ ${convertedValue.toFixed(2)}`,
    HKD: `$ ${convertedValue.toFixed(2)}`,
    SGD: `$ ${convertedValue.toFixed(2)}`,
    ARS: `$ ${convertedValue.toFixed(2)}`,
    MXN: `$ ${convertedValue.toFixed(2)}`,
    CLP: `$ ${convertedValue.toFixed(0)}`,
    BRL: `R$ ${convertedValue.toFixed(2).replace(".", ",")}`
  };

  return currencySymbols[targetCurrency] || currencySymbols["BRL"];
}

window.openCurrencyModal = function() {
  const modal = document.getElementById("currencyModal");
  if (modal) {
    modal.style.setProperty("display", "flex", "important");
  } else {
    console.error("Elemento currencyModal não encontrado[cite: 1]");
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

  const labels = { 
    BRL: "BRL (R$)", USD: "USD ($)", EUR: "EUR (€)", CNY: "CNY (¥)", KRW: "KRW (₩)", 
    JPY: "JPY (¥)", UK: "UK (£)", AUS: "AUS ($)", CHF: "CHF (CHF)", CAD: "CAD ($)", 
    HKD: "HKD ($)", SGD: "SGD ($)", ARS: "ARS ($)", MXN: "MXN ($)", CLP: "CLP ($)" 
  };
  
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