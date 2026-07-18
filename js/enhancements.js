/* Reveal the first-screen sequence after the first paint, without scroll-time layout work. */
(() => {
  requestAnimationFrame(() => document.body.classList.add('page-ready'));
})();
