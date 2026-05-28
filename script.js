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

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function cambiarSlide(direccion) {
    // Si no hay diapositivas en la página, detiene la función para evitar errores
    if (slides.length === 0) return;

    // Quita la clase activa de la imagen actual
    slides[slideIndex].classList.remove('active');
    
    // Calcula la posición de la siguiente imagen
    slideIndex += direccion;
    
    // Si llega al final, regresa a la primera
    if (slideIndex >= slides.length) { slideIndex = 0; }
    // Si va hacia atrás desde la primera, va a la última
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    
    // Agrega la clase activa a la nueva imagen
    slides[slideIndex].classList.add('active');
}

// Hacer que cambie solo cada 5 segundos de forma automática
setInterval(() => {
    cambiarSlide(1);
}, 5000);
