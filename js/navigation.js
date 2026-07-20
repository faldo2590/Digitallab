(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const links = document.querySelectorAll("[data-menu-link]");
  let lastY = 0;
  let ticking = false;

  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    menu.setAttribute("aria-hidden", String(!open));
  };
  toggle.addEventListener("click", () =>
    setMenu(!menu.classList.contains("is-open")),
  );
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 1);
    // Header stays put at all times now — no more hide-on-scroll-down.
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
})();
