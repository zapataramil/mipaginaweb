/* =========================================================
   1. CONFIGURACIÓN — EDITÁ ESTA PARTE
   ========================================================= */

const GITHUB_USER = "zapataramil";

const proyectos = [
  {
    emoji: "🔑",
    titulo: "Claves SSH",
    desc: "Configuración de claves SSH",
    tags: ["git", "terminator", "linux"],
    repo: "https://github.com/zapataramil/ssh",
    color: "#52b788"
  },
  {
    emoji: "🎁",
    titulo: "JOJO",
    desc: "Aplicación para intercambio de bienes, servicios y experiencias",
    tags: ["JavaScript", "Phyton"],
    repo: "https://github.com/zapataramil/jojo",
    color: "#74c69d"
  },
  {
    emoji: "📊",
    titulo: "Rescate de Datos",
    desc: "Herramienta para la recuperación de datos.",
    tags: ["terminator", "linux"],
    repo: "https://github.com/zapataramil/rescateDeDatos",
    color: "#40916c"
  }
];

/* =========================================================
   2. RENDER DE PROYECTOS
   ========================================================= */

const gridProyectos = document.getElementById("grid-proyectos");

if (gridProyectos) {
  gridProyectos.innerHTML = proyectos.map((p, i) => `
    <div class="reveal" style="transition-delay:${i * 70}ms">
      <a class="card"
         href="${p.repo}"
         target="_blank"
         rel="noopener noreferrer"
         style="--accent:${p.color}"
         aria-label="Abrir el repositorio de ${p.titulo} en GitHub">
        <span class="card-spot" aria-hidden="true"></span>
        <div class="card-head">
          <span class="card-emoji" aria-hidden="true">${p.emoji}</span>
          <span class="card-arrow" aria-hidden="true">↗</span>
        </div>
        <h3>${p.titulo}</h3>
        <p>${p.desc}</p>
        <div class="tags">
          ${p.tags.map(t => `<span>${t}</span>`).join("")}
        </div>
      </a>
    </div>
  `).join("");
}

/* =========================================================
   3. REVEAL ON SCROLL
   ========================================================= */

const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      observadorReveal.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal:not(.in)").forEach((el) => observadorReveal.observe(el));

/* =========================================================
   4. TILT 3D + SPOTLIGHT
   ========================================================= */

const elementosTilt = document.querySelectorAll(".card, .empresa");

elementosTilt.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotX = ((y / r.height) - 0.5) * -7;
    const rotY = ((x / r.width) - 0.5) * 7;

    el.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-7px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

/* =========================================================
   5. TEXTO QUE SE ESCRIBE SOLO
   ========================================================= */

const palabras = ["aplicaciones.", "ideas.", "proyectos."];
const typedEl = document.getElementById("typed");

let indicePalabra = 0;
let indiceChar = 0;
let borrando = false;

function escribir() {
  const palabra = palabras[indicePalabra];

  if (!borrando) {
    indiceChar++;
    typedEl.textContent = palabra.slice(0, indiceChar);
    if (indiceChar === palabra.length) {
      borrando = true;
      return setTimeout(escribir, 1700);
    }
    return setTimeout(escribir, 70 + Math.random() * 60);
  }

  indiceChar--;
  typedEl.textContent = palabra.slice(0, indiceChar);
  if (indiceChar === 0) {
    borrando = false;
    indicePalabra = (indicePalabra + 1) % palabras.length;
    return setTimeout(escribir, 380);
  }
  return setTimeout(escribir, 35);
}

if (typedEl) setTimeout(escribir, 900);

/* =========================================================
   6. CONTADORES ANIMADOS
   ========================================================= */

function animarContador(el) {
  const objetivo = parseInt(el.dataset.count, 10);
  const sufijo = el.dataset.suffix || "";
  const duracion = 1500;
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const suavizado = 1 - Math.pow(1 - progreso, 3);
    el.textContent = Math.round(objetivo * suavizado) + sufijo;
    if (progreso < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

const observadorContadores = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      animarContador(e.target);
      observadorContadores.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((el) => observadorContadores.observe(el));

/* =========================================================
   7. MARQUEE INFINITO
   ========================================================= */

const marquee = document.getElementById("marquee");
if (marquee) marquee.innerHTML += marquee.innerHTML;

/* =========================================================
   8. BARRA DE PROGRESO
   ========================================================= */

const progress = document.getElementById("progress");

function actualizarProgreso() {
  const scrollTop = window.scrollY;
  const alto = document.documentElement.scrollHeight - window.innerHeight;
  const porcentaje = alto > 0 ? (scrollTop / alto) * 100 : 0;
  if (progress) progress.style.width = `${porcentaje}%`;
}

window.addEventListener("scroll", actualizarProgreso, { passive: true });
actualizarProgreso();

/* =========================================================
   9. HALO QUE SIGUE AL MOUSE
   ========================================================= */

const glow = document.getElementById("cursorGlow");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function animarGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  if (glow) glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animarGlow);
})();

/* =========================================================
   10. AÑO DINÁMICO
   ========================================================= */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   11. NAV: SCROLL SUAVE
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    const href = enlace.getAttribute("href");
    if (href === "#") return;
    const destino = document.querySelector(href);
    if (!destino) return;
    e.preventDefault();
    const y = destino.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});