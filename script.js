// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Theme toggle
const root = document.documentElement;
const buttons = document.querySelectorAll('[data-theme-btn]');

const stored = (() => {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
})();
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = stored || (prefersDark ? 'dark' : 'light');
applyTheme(initial);

buttons.forEach((b) => {
  b.addEventListener('click', () => applyTheme(b.dataset.themeBtn));
});

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  buttons.forEach((b) => b.classList.toggle('active', b.dataset.themeBtn === theme));
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

// Events slider (home page only)
const slides = document.querySelectorAll('.event-item');
const dotsWrap = document.querySelector('.events-dots');

if (slides.length && dotsWrap) {
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Event ${i + 1}`);
    dot.classList.toggle('active', i === 0);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  resetTimer();
}
