// 1. Count the stats up once, when they scroll into view.
const nums = document.querySelectorAll('[data-count]');
const run = (el) => {
  const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, t0 = performance.now();
  const step = (t) => {
    const p = Math.min((t - t0) / 1000, 1);
    el.textContent = (end * p).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  });
  nums.forEach((n) => io.observe(n));
}

// 2. Random fact button.
const facts = [
  'Elephants use their trunks to breathe, smell, drink, and pick up food.',
  'A trunk has tens of thousands of muscle units and can lift a single leaf.',
  'Elephants communicate with low rumbles that travel far across the ground.',
  'Calves stay close to their mothers and are cared for by other females in the herd.',
  'Mud baths protect elephant skin from sun and insects.',
  'Elephants walk long distances between feeding areas and water.',
];
let last = 0;
document.getElementById('next').addEventListener('click', () => {
  let i;
  do { i = Math.floor(Math.random() * facts.length); } while (i === last);
  last = i;
  document.getElementById('fact').textContent = facts[i];
});

// 3. Click the hero elephant to make it flap faster for a moment.
const ele = document.getElementById('hero-ele');
ele.addEventListener('click', () => {
  ele.classList.add('fast');
  setTimeout(() => ele.classList.remove('fast'), 1500);
});

// 4. Floating dark / light mode toggle (remembers the choice).
const root = document.documentElement, tbtn = document.getElementById('theme-toggle');
const setTheme = (t) => {
  root.dataset.theme = t;
  tbtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('theme', t); } catch (e) {}
};
tbtn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
tbtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
