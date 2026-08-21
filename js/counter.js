function updateCardCounters() {
    if (typeof pokemons === "undefined") return;

    const currentDataset = typeof getPageDataset === "function" ? getPageDataset() : pokemons;
    const totalCards = currentDataset.length;
    
    const favorites = typeof getFavorites === "function" ? getFavorites() : [];
    const totalFavorites = favorites.length;

    const totalElement = document.getElementById("totalCardsCount");
    const favElement = document.getElementById("totalFavsCount");

    if (totalElement) {
        totalElement.innerText = totalCards;
    }

    if (favElement) {
        favElement.innerText = totalFavorites;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCardCounters();
});