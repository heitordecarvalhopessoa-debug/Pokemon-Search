function applyHolographicEffect() {
  const cardImages = document.querySelectorAll(".card img, .pokemon-card img, .card-item img, .card-img-wrapper img");

  cardImages.forEach((img) => {
    const parent = img.parentElement;

    if (parent && !parent.classList.contains("card-holo")) {
      const wrapper = document.createElement("div");
      wrapper.className = "card-holo";
      
      parent.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
  });

  initHolographicCards();
}

function initHolographicCards() {
  const cards = document.querySelectorAll(".card-holo");

  cards.forEach((card) => {
    if (card.dataset.holoInitialized) return;
    card.dataset.holoInitialized = "true";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -25;
      const rotateY = ((x - centerX) / centerX) * 25;

      const mouseXPercent = (x / rect.width) * 100;
      const mouseYPercent = (y / rect.height) * 100;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.setProperty("--mouse-x", `${mouseXPercent}%`);
      card.style.setProperty("--mouse-y", `${mouseYPercent}%`);
      card.style.setProperty("--holo-x", `${80 + rotateY * 2}%`);
      card.style.setProperty("--holo-y", `${80 + rotateX * 2}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
}

if (typeof window.renderTable === "function") {
  const originalRenderTable = window.renderTable;
  window.renderTable = function (...args) {
    originalRenderTable.apply(this, args);
    applyHolographicEffect();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  applyHolographicEffect();

  const observer = new MutationObserver(() => {
    applyHolographicEffect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
