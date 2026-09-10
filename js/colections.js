const STORAGE_KEYS = {
  OWNED: "my_collection_owned",
  WISHLIST: "my_collection_wishlist"
};

function getOwnedData() {
  const data = localStorage.getItem(STORAGE_KEYS.OWNED);
  return data ? JSON.parse(data) : {};
}

function saveOwnedData(data) {
  localStorage.setItem(STORAGE_KEYS.OWNED, JSON.stringify(data));
}

function getWishlistData() {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}

function saveWishlistData(data) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(data));
}

function getOwnedQuantity(serialNumber) {
  const owned = getOwnedData();
  return owned[serialNumber] || 0;
}

function setOwnedQuantity(serialNumber, quantity) {
  const owned = getOwnedData();
  const newQty = Math.max(0, quantity);

  if (newQty === 0) {
    delete owned[serialNumber];
  } else {
    owned[serialNumber] = newQty;
  }

  saveOwnedData(owned);
  updateCardBadges(serialNumber);
}

function changeOwnedQuantity(serialNumber, delta) {
  const currentQty = getOwnedQuantity(serialNumber);
  setOwnedQuantity(serialNumber, currentQty + delta);
}

function isInWishlist(serialNumber) {
  const wishlist = getWishlistData();
  return wishlist.includes(serialNumber);
}

function toggleWishlist(serialNumber) {
  let wishlist = getWishlistData();

  if (wishlist.includes(serialNumber)) {
    wishlist = wishlist.filter((id) => id !== serialNumber);
  } else {
    wishlist.push(serialNumber);
  }

  saveWishlistData(wishlist);
  updateCardBadges(serialNumber);
}

function updateCardBadges(serialNumber) {
  const qty = getOwnedQuantity(serialNumber);
  const inWishlist = isInWishlist(serialNumber);

  const cardElements = document.querySelectorAll(`[data-serial="${serialNumber}"]`);
  cardElements.forEach((cardElement) => {
    const qtyDisplay = cardElement.querySelector(".owned-count");
    if (qtyDisplay) {
      qtyDisplay.textContent = qty;
    }

    const ownedControl = cardElement.querySelector(".owned-control");
    if (ownedControl) {
      ownedControl.classList.toggle("active", qty > 0);
    }

    const wishlistBtn = cardElement.querySelector(".btn-wishlist");
    if (wishlistBtn) {
      wishlistBtn.classList.toggle("active", inWishlist);
    }
  });
}