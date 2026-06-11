/* =====================================================================
   MOMFIES – felles JavaScript
   - GANG: rediger gjengens navn/tagline/tur her, brukes overalt
   - Store: localStorage-hjelpere (brukes på alle sider)
   - Nav + footer injiseres automatisk på hver side
   ===================================================================== */

/* ---- Rediger gjengen her ---- */
const GANG = {
  name: "MOMFIES",
  emoji: "👹",
  tagline: "",
  // neste eventyr (brukes i forside-hero + kalender)
  trip: {
    title: "Albania",
    place: "Golem, Albania",
    start: "2026-06-22",   // YYYY-MM-DD
    end:   "2026-06-29",
    href:  "albania.html"
  }
};

/* ---- Navigasjon (rediger menypunkter her) ---- */
const NAV = [
  { href: "index.html",        label: "Hjem",         icon: "" },
  { href: "albania.html",      label: "Albania",      icon: "🏝️" },
  { href: "hvem.html",         label: "Hvem",         icon: "👯" },
  { href: "turer.html",        label: "Turer",        icon: "🧳" },
  { href: "drikkeleker.html",  label: "Drikkeleker",  icon: "🍹" },
  { href: "minner.html",       label: "Minner", icon: "🌸" },
  { href: "tipping.html", label: "VM Tipping", icon: "⚽" },
];
/* =====================================================================
   localStorage-hjelpere
   ===================================================================== */
const Store = {
  prefix: "bb_",
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? (fallback ?? null) : JSON.parse(raw);
    } catch (e) {
      console.warn("Store.get feilet:", e);
      return fallback ?? null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Store.set feilet:", e);
      return false;
    }
  },
  remove(key) { localStorage.removeItem(this.prefix + key); },
  /* hent eksisterende, eller seed med standardverdi + lagre den */
  seed(key, defaults) {
    const existing = this.get(key);
    if (existing === null) { this.set(key, defaults); return defaults; }
    return existing;
  }
};

/* unik id + escaping */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* dato-hjelpere */
function isoToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatDateNo(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const mnd = ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"];
  return `${d}. ${mnd[m-1]} ${y}`;
}

/* =====================================================================
   Nav + footer injeksjon
   ===================================================================== */
function currentPage() {
  const path = location.pathname.split("/").pop();
  return path && path.length ? path : "index.html";
}

function buildNav() {
  const here = currentPage();
  const header = document.createElement("header");
  header.className = "nav";
  header.innerHTML = `
    <div class="nav__inner">
      <a class="nav__brand" href="index.html">
        <span class="dot">${GANG.emoji}</span>${esc(GANG.name)}
      </a>
      <button class="nav__burger" aria-label="Meny" aria-expanded="false">☰</button>
      <ul class="nav__links">
        ${NAV.map(n => `
          <li><a href="${n.href}" class="${n.href === here ? "is-active" : ""}">
            <span aria-hidden="true">${n.icon}</span>${esc(n.label)}
          </a></li>`).join("")}
      </ul>
    </div>`;
  document.body.prepend(header);

  const burger = header.querySelector(".nav__burger");
  const links = header.querySelector(".nav__links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function buildFooter() {
  const f = document.createElement("footer");
  f.className = "foot";
  f.innerHTML = `
    <div class="foot__brand">${GANG.emoji} ${esc(GANG.name)}</div>
    <p class="muted" style="color:var(--foam)">${esc(GANG.tagline)}</p>
    <p style="margin-top:8px;font-size:.82rem;opacity:.7">.</p>`;
  document.body.appendChild(f);
}

/* =====================================================================
   Toast
   ===================================================================== */
let _toastTimer;
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add("is-on"));
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
}

/* enkel bekreftelse-wrapper (lett å bytte ut senere) */
function confirmAction(msg) { return window.confirm(msg); }

/* kjør på alle sider */
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  buildFooter();
});
