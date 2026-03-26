// ===============================
// UI Interactions (global)
// ===============================

// Mobile nav toggle
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => mobileNav.classList.toggle("open"));
}

// Header scroll effect
const topbar = document.querySelector(".topbar");
window.addEventListener("scroll", () => {
  if (!topbar) return;
  topbar.classList.toggle("scrolled", window.scrollY > 8);
});

// Cursor glow overlay
(function cursorGlow() {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    glow.style.setProperty("--x", `${x}%`);
    glow.style.setProperty("--y", `${y}%`);
  });
})();

// Reveal on scroll (adds .in-view)
(function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en, index) => {
        if (en.isIntersecting) {
          setTimeout(() => {
            en.target.classList.add("in-view");
          }, index * 100); // Stagger by 100ms
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => {
    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("in-view");
    }
    obs.observe(el);
  });
})();

// Button ripple effect
(function rippleButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    const r = document.createElement("span");
    r.className = "ripple";

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${e.clientX - rect.left - size / 2}px`;
    r.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
})();

// Tilt effect (add class="tilt" to any card)
(function tiltCards() {
  const targets = document.querySelectorAll(".tilt");
  if (!targets.length) return;

  const max = 10; // tilt intensity
  targets.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;  // 0..1
      const y = (e.clientY - rect.top) / rect.height;  // 0..1
      const rx = (y - 0.5) * -max;
      const ry = (x - 0.5) * max;
      card.style.transform = `translateY(-2px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
