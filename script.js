const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#site-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const trackingForm = document.querySelector(".tracking-card");

if (trackingForm) {
  trackingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = new FormData(trackingForm).get("tracking-code");
    const cleanCode = String(code || "").trim();

    if (!cleanCode) {
      alert("Ingresa tu codigo de tracking para buscar el envio.");
      return;
    }

    alert(`Tracking recibido: ${cleanCode}. Aqui puedes conectar tu sistema real de rastreo.`);
  });
}

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
