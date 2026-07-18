/* Set the color used by the browser UI before the page begins to paint. */
(() => {
  const root = document.documentElement;
  const stored = root.dataset.theme;
  const isDark =
    stored === "dark" ||
    (stored === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", isDark ? "#111113" : "#f7f7f5");
})();
