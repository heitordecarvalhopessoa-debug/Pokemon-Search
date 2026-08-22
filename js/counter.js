function updateCardCounters() {
    if (typeof pokemons === "undefined") return;

    let totalCards = 0;

    if (window.PAGE_TYPE === "coins") {
        totalCards = pokemons.filter(p => p.Category === "Coin").length;
    } else if (window.PAGE_TYPE === "cards") {
        totalCards = pokemons.filter(p => p.Category !== "Coin").length;
    } else {
        const path = window.location.pathname.toLowerCase();
        if (path.includes("coins")) {
            totalCards = pokemons.filter(p => p.Category === "Coin").length;
        } else if (path.includes("cards")) {
            totalCards = pokemons.filter(p => p.Category !== "Coin").length;
        } else {
            totalCards = pokemons.length;
        }
    }

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