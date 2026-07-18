(() => {
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");
  const media = matchMedia("(prefers-color-scheme: dark)");
  const updateColor = () => {
    const setting = root.dataset.theme;
    const dark = setting === "dark" || (setting === "system" && media.matches);
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", dark ? "#111113" : "#f7f7f5");
  };
  button.addEventListener("click", () => {
    const dark =
      root.dataset.theme === "dark" ||
      (root.dataset.theme === "system" && media.matches);
    root.dataset.theme = dark ? "light" : "dark";
    localStorage.setItem("digital-lab-theme", root.dataset.theme);
    updateColor();
  });
  media.addEventListener("change", () => {
    if (root.dataset.theme === "system") updateColor();
  });
})();
