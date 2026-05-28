(function () {
  const STORAGE_KEY = "webCourierExpressContent";

  const fields = [
    ["logoImage", "image", "Logo PNG", ".brand", "logo", ""],
    ["logoSize", "select", "Tamano del logo", ".brand", "logoSize", "normal"],
    ["brandName", "text", "Nombre de la marca", ".brand strong", "text", "Andes Express"],
    ["brandSubtitle", "text", "Subtitulo del encabezado", ".site-header .brand small", "text", "Courier & carga"],
    ["topbarPhones", "text", "Telefonos superiores", ".topbar__link", "textWithIcon", "+51 963 276 671 - 906 690 845"],
    ["topbarSchedule", "text", "Horario superior", ".topbar__inner span", "text", "Atencion de lunes a sabado"],
    ["banner1", "image", "Banner principal 1", ".carousel-slide:nth-child(1) img", "image", "img/banner1.jpg"],
    ["banner2", "image", "Banner principal 2", ".carousel-slide:nth-child(2) img", "image", "img/banner2.jpg"],
    ["heroImage", "image", "Imagen de portada", ".hero__media", "background", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80"],
    ["heroEyebrow", "text", "Texto pequeno de portada", ".hero .eyebrow", "text", "Courier internacional desde Peru"],
    ["heroTitle", "textarea", "Titulo principal", "#hero-title", "text", "Envios, compras y carga con seguimiento de punta a punta"],
    ["heroText", "textarea", "Descripcion principal", ".hero__text", "text", "Movemos paquetes, muestras comerciales y carga a destinos internacionales con asesoria clara, recojo coordinado y soporte por WhatsApp."],
    ["trackingTitle", "text", "Titulo de rastreo", ".tracking-card label", "text", "Rastrea tu envio"],
    ["quickCardOne", "text", "Cuadro rapido 1", ".info-card:nth-child(2) span", "text", "Tarifas por caja"],
    ["quickCardTwo", "text", "Cuadro rapido 2", ".info-card:nth-child(3) span", "text", "Asesor comercial"],
    ["packagesTitle", "textarea", "Titulo de cajas", "#paquetes h2", "text", "Elige el formato de caja que necesitas"],
    ["package1Image", "image", "Imagen del cuadro 1", ".package-card:nth-child(1) .package-card__visual", "background", "https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=800&q=80"],
    ["package2Image", "image", "Imagen del cuadro 2", ".package-card:nth-child(2) .package-card__visual", "background", "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"],
    ["package3Image", "image", "Imagen del cuadro 3", ".package-card:nth-child(3) .package-card__visual", "background", "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"],
    ["package4Image", "image", "Imagen del cuadro 4", ".package-card:nth-child(4) .package-card__visual", "background", "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80"],
    ["package1", "textarea", "Caja 1", ".package-card:nth-child(1)", "card", "34 x 20 x 12 cm|Ideal para documentos, muestras pequenas y regalos compactos.|S/ 210"],
    ["package2", "textarea", "Caja 2", ".package-card:nth-child(2)", "card", "39 x 31 x 26 cm|Para paquetes medianos con embalaje seguro y despacho rapido.|S/ 390"],
    ["package3", "textarea", "Caja 3", ".package-card:nth-child(3)", "card", "39 x 29 x 22 cm|Una opcion versatil para textiles, accesorios y productos ligeros.|S/ 480"],
    ["package4", "textarea", "Caja 4", ".package-card:nth-child(4)", "card", "68 x 47 x 39 cm|Mayor volumen para carga consolidada y mercaderia de negocio.|S/ 750"],
    ["servicesTitle", "textarea", "Titulo de servicios", "#servicios h2", "text", "Soluciones para personas y empresas"],
    ["service1", "textarea", "Servicio 1", ".service-card:nth-child(1)", "cardNoPrice", "Courier internacional|Envio puerta a puerta de paquetes, documentos, obsequios y muestras hacia Latinoamerica, USA y Europa."],
    ["service2", "textarea", "Servicio 2", ".service-card:nth-child(2)", "cardNoPrice", "Carga aerea internacional|Despacho de carga pesada o comercial con coordinacion logistica, embalaje y soporte documentario."],
    ["service3", "textarea", "Servicio 3", ".service-card:nth-child(3)", "cardNoPrice", "Agente de compras|Compra, recepcion y despacho de productos para clientes dentro y fuera del Peru."],
    ["service4", "textarea", "Servicio 4", ".service-card:nth-child(4)", "cardNoPrice", "Agencia de viajes|Cotizacion de reservas, boletos, tours y servicios turisticos con atencion personalizada."],
    ["aboutTitle", "textarea", "Titulo de conocenos", "#conocenos h2", "text", "Comercio exterior explicado con claridad"],
    ["aboutImage", "image", "Imagen de conocenos", ".about__photo", "background", "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80"],
    ["locationsTitle", "textarea", "Titulo de sucursales", "#sucursales h2", "text", "Atencion en Lima y coordinacion nacional"],
    ["footerText", "textarea", "Texto del pie de pagina", ".footer__grid > div:first-child p", "text", "Plantilla editable para courier, carga aerea, compras y atencion comercial."]
  ].map(([id, type, label, selector, target, defaultValue]) => ({ id, type, label, selector, target, defaultValue }));

  function loadContent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (error) { return {}; }
  }

  function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  function getValue(field, content) {
    return Object.prototype.hasOwnProperty.call(content, field.id) ? content[field.id] : field.defaultValue;
  }

  function keepIconText(element, value) {
    const icon = element.querySelector("svg");
    element.textContent = value;
    if (icon) element.prepend(icon);
  }

  function setCard(element, value, hasPrice) {
    const parts = String(value || "").split("|");
    const title = element.querySelector("h3");
    const text = element.querySelector("p");
    const price = element.querySelector("strong");
    if (title) title.textContent = parts[0] || "";
    if (text) text.textContent = parts[1] || "";
    if (hasPrice && price) price.textContent = parts[2] || "";
  }

  function setLogo(element, value) {
    let image = element.querySelector(".brand__logo");
    const mark = element.querySelector(".brand__mark");
    const textBlock = Array.from(element.children).find((child) => child.tagName === "SPAN" && !child.classList.contains("brand__mark"));
    if (!image) {
      image = document.createElement("img");
      image.className = "brand__logo";
      image.alt = "Logo";
      element.insertBefore(image, mark ? mark.nextSibling : element.firstChild);
    }
    image.src = value || "";
    image.style.display = value ? "block" : "none";
    if (mark) mark.style.display = value ? "none" : "grid";
    if (textBlock) textBlock.style.display = value ? "none" : "block";
    element.classList.toggle("brand--image-only", Boolean(value));
  }


  function setLogoSize(element, value) {
    const sizes = {
      small: { width: "108px", maxHeight: "54px", navHeight: "82px" },
      normal: { width: "160px", maxHeight: "74px", navHeight: "94px" },
      large: { width: "230px", maxHeight: "96px", navHeight: "116px" },
      xlarge: { width: "320px", maxHeight: "126px", navHeight: "146px" }
    };
    const size = sizes[value] || sizes.normal;
    const image = element.querySelector(".brand__logo");
    const nav = element.closest(".nav");

    element.classList.remove("brand--logo-small", "brand--logo-normal", "brand--logo-large", "brand--logo-xlarge");
    element.classList.add(`brand--logo-${value || "normal"}`);

    if (image) {
      image.style.width = size.width;
      image.style.maxHeight = size.maxHeight;
    }

    if (nav) {
      nav.style.minHeight = size.navHeight;
    }
  }

  function setBackgroundImage(element, value, fallback) {
    const imageUrl = value || fallback;
    const overlay = "linear-gradient(135deg, rgba(11, 143, 77, 0.16), rgba(244, 197, 66, 0.28))";
    if (element.classList.contains("package-card__visual")) {
      element.style.backgroundImage = `${overlay}, url("${imageUrl}")`;
      return;
    }
    element.style.backgroundImage = `url("${imageUrl}")`;
  }
  function applyField(field, value) {
    document.querySelectorAll(field.selector).forEach((element) => {
      if (field.target === "logo") { setLogo(element, value); return; }
      if (field.target === "logoSize") { setLogoSize(element, value); return; }
      if (field.target === "image") { element.src = value || field.defaultValue; return; }
      if (field.target === "background") { setBackgroundImage(element, value, field.defaultValue); return; }
      if (field.target === "card") { setCard(element, value, true); return; }
      if (field.target === "cardNoPrice") { setCard(element, value, false); return; }
      if (field.target === "textWithIcon") { keepIconText(element, value); return; }
      element.textContent = value;
    });
  }

  function applyContent() {
    const content = loadContent();
    fields.forEach((field) => applyField(field, getValue(field, content)));
  }

  window.EditableContent = { fields, loadContent, saveContent, applyContent, storageKey: STORAGE_KEY };
  document.addEventListener("DOMContentLoaded", applyContent);
})();
