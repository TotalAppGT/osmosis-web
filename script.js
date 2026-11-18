/* ============================================================
   OSMOSIS PREMIUM — interacciones
   ============================================================ */

// CAMBIAR AQUÍ LOS DATOS REALES
const OSMOSIS = {
  whatsapp: "50200000000", // número con código de país, sin + ni espacios
  email: "hola@osmosispremium.com",
  instagram: "https://instagram.com/osmosispremium",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const isPlaceholderPhone = () => OSMOSIS.whatsapp === "50200000000";

function waLink(message) {
  return "https://wa.me/" + OSMOSIS.whatsapp + "?text=" + encodeURIComponent(message);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3400);
}

/* WhatsApp genérico en botones y links */
$$("[data-wa]").forEach((link) => {
  link.href = waLink("Hola Osmosis Premium. Quiero cotizar un evento.");
  link.target = "_blank";
  link.rel = "noopener";
});

/* Header */
const header = $("#header");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Menú móvil */
const menuBtn = $("#menuBtn");
const nav = $("#nav");

function closeMenu() {
  if (!menuBtn || !nav) return;
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Abrir menú");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    nav.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  $$(".nav-links a", nav).forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* Reveal on scroll */
const reveals = $$(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => obs.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* Fecha mínima = hoy */
const dateInput = $("#eventDate");
if (dateInput) {
  const d = new Date();
  const min = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  dateInput.min = min;
}

/* Año del footer */
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

/* Formulario de cotización -> WhatsApp */
const form = $("#quoteForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isPlaceholderPhone()) {
      showToast("Configurá el WhatsApp real en script.js para activar el formulario.");
      return;
    }

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const tipo = String(data.get("tipo") || "").trim();
    const fecha = String(data.get("fecha") || "").trim();
    const ciudad = String(data.get("ciudad") || "").trim();
    const detalles = String(data.get("detalles") || "").trim();

    const message =
      "Hola Osmosis Premium.\n\n" +
      "Quiero cotizar un evento.\n\n" +
      "Nombre: " + nombre + "\n" +
      "Tipo de evento: " + tipo + "\n" +
      "Fecha: " + fecha + "\n" +
      "Ciudad / lugar: " + ciudad + "\n" +
      "Detalles: " + detalles;

    window.open(waLink(message), "_blank", "noopener");
    showToast("Abriendo WhatsApp con tu cotización…");
    form.reset();
  });
}
