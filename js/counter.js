function updateCardCounters() {
  if (typeof pokemons === "undefined") return;

  const path = window.location.pathname.toLowerCase();
  let totalCards = 0;

  if (path.includes("coins.html")) {
    totalCards = pokemons.filter(p => p.Category === "Coin").length;
  } else if (path.includes("cards.html")) {
    totalCards = pokemons.filter(p => p.Category !== "Coin").length;
  } else {
    totalCards = pokemons.length;
  }
    
  const favorites = typeof getFavorites === "function" ? getFavorites() : [];
  const totalFavorites = favorites.length;

  const totalElement = document.getElementById("totalCardsCount");
  const favElement = document.getElementById("totalFavsCount");

  if (totalElement) totalElement.innerText = totalCards;
  if (favElement) favElement.innerText = totalFavorites;
}