/* ---------------------------------------------------------------------
   Scroll reveal — lightweight, Framer-style fade-up.

   Rebuilt WITHOUT IntersectionObserver. On this project it kept firing
   inconsistently on the visitor's Safari/iOS build (rootMargin edge
   cases, viewport-height changes when the address bar shows/hides,
   etc.), which left whole sections stuck at opacity:0 well past 80%
   of the page. A plain scroll-position check has none of those edge
   cases: it just measures where each element actually is on screen.
   Hero entrance (page-ready system in enhancements.js) is untouched.
---------------------------------------------------------------------- */
(() => {
  let elements = Array.from(document.querySelectorAll(".reveal, .split-reveal"));
  if (!elements.length) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Reveal a little before an element is fully in view, not right at the edge.
  const THRESHOLD_RATIO = 0.9;

  const checkElements = () => {
    if (!elements.length) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const line = vh * THRESHOLD_RATIO;

    elements = elements.filter((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < line) {
        el.classList.add("is-visible");
        return false; // done, stop tracking this element
      }
      return true;
    });

    if (!elements.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      checkElements();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("orientationchange", onScroll, { passive: true });

  // Run once immediately for anything already in view on load (hero
  // section, and any short page where content starts below the fold).
  checkElements();
})();
