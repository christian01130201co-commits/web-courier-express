const form = document.querySelector("#admin-form");
const resetButton = document.querySelector("#reset-content");
const toast = document.querySelector("#toast");

const groups = [
  { title: "Marca y encabezado", ids: ["logoImage", "logoSize", "topbarPhones", "topbarSchedule"] },
  { title: "Banners e imagenes", ids: ["banner1", "banner2", "heroImage", "aboutImage"] },
  { title: "Portada y accesos rapidos", ids: ["heroEyebrow", "heroTitle", "heroText", "trackingTitle", "quickCardOne", "quickCardTwo"] },
  { title: "Cuadros de cajas", ids: ["packagesTitle", "package1Image", "package1", "package2Image", "package2", "package3Image", "package3", "package4Image", "package4"] },
  { title: "Servicios y pie de pagina", ids: ["servicesTitle", "service1", "service2", "service3", "service4", "aboutTitle", "locationsTitle", "footerText"] }
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function getSavedValue(field, content) {
  return Object.prototype.hasOwnProperty.call(content, field.id) ? content[field.id] : field.defaultValue;
}

function fieldById(id) {
  return window.EditableContent.fields.find((field) => field.id === id);
}

function createTextField(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = field.type === "textarea" ? "field field--wide" : "field";

  const label = document.createElement("label");
  label.htmlFor = field.id;
  label.textContent = field.label;

  const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
  input.id = field.id;
  input.name = field.id;
  input.value = value || "";

  wrapper.append(label, input);

  if (field.target === "card" || field.target === "cardNoPrice") {
    const help = document.createElement("small");
    help.textContent = field.target === "card"
      ? "Formato: titulo | descripcion | precio"
      : "Formato: titulo | descripcion";
    wrapper.append(help);
  }

  return wrapper;
}

function createSelectField(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "field";

  const label = document.createElement("label");
  label.htmlFor = field.id;
  label.textContent = field.label;

  const select = document.createElement("select");
  select.id = field.id;
  select.name = field.id;

  [
    ["small", "Pequeno"],
    ["normal", "Normal"],
    ["large", "Grande"],
    ["xlarge", "Extra grande"]
  ].forEach(([optionValue, optionLabel]) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionLabel;
    option.selected = optionValue === (value || field.defaultValue);
    select.append(option);
  });

  wrapper.append(label, select);
  return wrapper;
}

function createImageField(field, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "field field--wide";

  const label = document.createElement("label");
  label.textContent = field.label;

  const control = document.createElement("div");
  control.className = "image-control";

  const preview = document.createElement("div");
  preview.className = "image-preview";

  const image = document.createElement("img");
  image.alt = field.label;
  image.src = value || "";
  image.style.display = value ? "block" : "none";
  preview.append(image);

  const hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.id = field.id;
  hidden.name = field.id;
  hidden.value = value || "";

  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/png,image/jpeg,image/webp";

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "Link de imagen opcional";
  urlInput.value = value && value.startsWith("data:") ? "" : value || "";

  const buttons = document.createElement("div");
  buttons.className = "image-buttons";

  const clear = document.createElement("button");
  clear.className = "button button--danger";
  clear.type = "button";
  clear.textContent = "Quitar imagen";

  const restore = document.createElement("button");
  restore.className = "button";
  restore.type = "button";
  restore.textContent = "Usar original";

  const help = document.createElement("small");
  help.textContent = "Puedes subir PNG/JPG/WebP. El link es opcional.";

  function updateImage(nextValue) {
    hidden.value = nextValue;
    image.src = nextValue;
    image.style.display = nextValue ? "block" : "none";
    if (!nextValue.startsWith("data:")) urlInput.value = nextValue;
  }

  file.addEventListener("change", () => {
    const selectedFile = file.files && file.files[0];
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => updateImage(String(reader.result || "")));
    reader.readAsDataURL(selectedFile);
  });

  urlInput.addEventListener("input", () => updateImage(urlInput.value.trim()));
  clear.addEventListener("click", () => { updateImage(""); file.value = ""; });
  restore.addEventListener("click", () => { updateImage(field.defaultValue || ""); file.value = ""; });

  buttons.append(clear, restore);
  control.append(preview, file, urlInput, buttons, help, hidden);
  wrapper.append(label, control);
  return wrapper;
}

// 1. LE AGREGAMOS ASYNC PORQUE ADENTRO LLAMARÁ A INTERNET
async function renderForm() {
  // 2. AGREGAMOS AWAIT PARA ESPERAR A SUPABASE
  const content = await window.EditableContent.loadContent();
  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "admin-section";

    const title = document.createElement("h2");
    title.textContent = group.title;

    const grid = document.createElement("div");
    grid.className = "field-grid";

    group.ids.forEach((id) => {
      const field = fieldById(id);
      if (!field) return;
      const value = getSavedValue(field, content);
      grid.append(field.type === "image" ? createImageField(field, value) : field.type === "select" ? createSelectField(field, value) : createTextField(field, value));
    });

    section.append(title, grid);
    fragment.append(section);
  });

  form.append(fragment);
}

function collectFormData() {
  const formData = new FormData(form);
  const nextContent = {};
  window.EditableContent.fields.forEach((field) => {
    nextContent[field.id] = String(formData.get(field.id) || "").trim();
  });
  return nextContent;
}

// 3. LE AGREGAMOS ASYNC AL SUBMIT PORQUE LA NUEVA FUNCIÓN SAVECONTENT TARDA MILISEGUNDOS
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // 4. AGREGAMOS AWAIT PARA QUE ESPERE EL PROCESO DE ALMACENAMIENTO EN SUPABASE
  await window.EditableContent.saveContent(collectFormData());
  showToast("¡Cambios guardados globalmente en la base de datos de Supabase!");
});

// 5. MODIFICAMOS EL BOTÓN DE RESET PARA REACCIONAR CON ASYNC/AWAIT
resetButton.addEventListener("click", async () => {
  const confirmed = confirm("Quieres borrar todos los cambios y volver al contenido original?");
  if (!confirmed) return;
  
  // Ahora el reset limpia el formulario y vuelve a renderizar con asincronía
  form.textContent = "";
  await renderForm();
  showToast("Contenido restaurado en pantalla.");
});

// 6. LANZAMOS LA FUNCIÓN INICIAL
renderForm();