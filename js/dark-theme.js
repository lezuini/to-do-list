import { updateTheme } from "./local-storage.js";

const d = document,
  de = d.documentElement;

export default function darkTheme(moonBtn = ".moon-btn") {
  d.addEventListener("click", (e) => {
    if (e.target.matches(moonBtn) || e.target.matches(`${moonBtn} *`)) {
      if (de.classList.contains("dark")) {
        de.classList.remove("dark");
        updateTheme("light");
      } else {
        de.classList.add("dark");
        updateTheme("dark");
      }
    }
  });
}
