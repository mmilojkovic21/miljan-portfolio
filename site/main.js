"use strict";

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

// Scroll progress, eased toward the real position.
const progress = $("#progress");
let shown = 0;
let ticking = false;
function target() {
  const max = document.documentElement.scrollHeight - innerHeight;
  return max > 0 ? scrollY / max : 0;
}
function drawProgress() {
  const goal = target();
  shown = calm ? goal : shown + (goal - shown) * 0.18;
  progress.style.transform = `scaleX(${shown})`;
  if (Math.abs(goal - shown) > 0.0005) requestAnimationFrame(drawProgress);
  else ticking = false;
}
function queueProgress() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(drawProgress);
}
addEventListener("scroll", queueProgress, { passive: true });
addEventListener("resize", queueProgress);
queueProgress();

// Stagger indexes, set before anything is revealed.
$$("[data-stagger]").forEach((list) => {
  [...list.children].forEach((child, i) => child.style.setProperty("--i", i));
});

// Reveal on scroll.
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    if (!calm) entry.target.querySelectorAll(".label, .group").forEach((el) => scramble(el, 600));
    revealer.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -60px" });
$$(".reveal, [data-stagger]").forEach((el) => revealer.observe(el));

if (!calm) {
  splitName();
  typePrompt();
  countYears();
  startDots();
  heroParallax();
}
if (finePointer) {
  trackSpotlight();
  if (!calm) {
    enableTilt();
    enableMagnet();
    $$(".site-header nav a, .site-footer a").forEach((link) => {
      link.addEventListener("pointerenter", () => scramble(link, 400));
    });
  }
}

function splitName() {
  const name = $("#name");
  name.setAttribute("aria-label", "Miljan Milojković");
  let i = 0;
  name.querySelectorAll(".line").forEach((line) => {
    const letters = [...line.textContent];
    line.textContent = "";
    letters.forEach((letter) => {
      const char = document.createElement("span");
      char.className = "char";
      char.setAttribute("aria-hidden", "true");
      char.style.setProperty("--i", i++);
      char.textContent = letter;
      line.append(char);
    });
  });
}

function typePrompt() {
  const el = $("#prompt");
  const text = el.textContent;
  let i = 0;
  el.textContent = "";
  setTimeout(function type() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(type, 45 + Math.random() * 60);
  }, 250);
}

function countYears() {
  const el = $("#years");
  const end = Number(el.textContent);
  el.textContent = "0";
  const watcher = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    watcher.disconnect();
    const start = performance.now();
    requestAnimationFrame(function tick(now) {
      const t = Math.min((now - start) / 1100, 1);
      el.textContent = Math.round(end * (1 - (1 - t) ** 3));
      if (t < 1) requestAnimationFrame(tick);
    });
  });
  watcher.observe(el);
}

function trackSpotlight() {
  document.addEventListener("pointermove", (event) => {
    const card = event.target.closest?.(".card");
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  }, { passive: true });
}

function enableTilt() {
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Hero dot field: a slow wave, plus a glow and push around the cursor.
function startDots() {
  const canvas = $("#dots");
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  const gap = 26;
  const reach = 170;
  let width = 0;
  let height = 0;
  let mouse = null;
  let running = false;
  let visible = true;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    ctx.clearRect(0, 0, width, height);
    const time = now / 1000;
    for (let x = gap / 2; x < width; x += gap) {
      for (let y = gap / 2; y < height; y += gap) {
        const wave = Math.sin(x * 0.012 + y * 0.018 - time * 0.9);
        let px = x;
        let py = y + wave * 2;
        let heat = 0;
        if (mouse) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < reach) {
            heat = (1 - distance / reach) ** 2;
            const push = heat * 12 / (distance || 1);
            px += dx * push;
            py += dy * push;
          }
        }
        const base = 0.1 + (wave + 1) * 0.08;
        ctx.globalAlpha = Math.min(base + heat * 0.9, 1);
        ctx.fillStyle = heat > 0.02 ? "#c6f432" : "#9aa39d";
        ctx.beginPath();
        ctx.arc(px, py, 1 + heat * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  }

  function run() {
    if (running || !visible || document.hidden) return;
    running = true;
    requestAnimationFrame(frame);
  }

  if (finePointer) {
    hero.addEventListener("pointermove", (event) => {
      const box = hero.getBoundingClientRect();
      mouse = { x: event.clientX - box.left, y: event.clientY - box.top };
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { mouse = null; });
  }
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  }).observe(hero);
  document.addEventListener("visibilitychange", run);
  resize();
  run();
}

// Text "decodes" through random characters back to its real value.
// Only used on monospace text, so the width never changes.
function scramble(el, duration) {
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*/<>";
  const text = el.dataset.text ?? (el.dataset.text = el.textContent);
  const run = (el.scrambleRun = (el.scrambleRun || 0) + 1);
  const start = performance.now();
  requestAnimationFrame(function step(now) {
    if (el.scrambleRun !== run) return;
    const t = Math.min((now - start) / duration, 1);
    el.textContent = [...text].map((char, i, all) => {
      if (!/[A-Za-z0-9]/.test(char) || i / all.length < t * 1.2 - 0.2) return char;
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      return char === char.toLowerCase() ? glyph.toLowerCase() : glyph;
    }).join("");
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = text;
  });
}

function enableMagnet() {
  $$(".btn").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const box = button.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      button.style.translate = `${x * 0.12}px ${y * 0.3}px`;
    });
    button.addEventListener("pointerleave", () => { button.style.translate = ""; });
  });
}

// Hero text drifts slower than the page and fades as it scrolls away.
function heroParallax() {
  const text = $(".hero-text");
  const hero = text.closest(".hero");
  let queued = false;
  function update() {
    queued = false;
    const progress = Math.min(Math.max(scrollY / hero.offsetHeight, 0), 1);
    text.style.translate = `0 ${progress * 70}px`;
    text.style.opacity = String(1 - progress * 0.75);
  }
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}
