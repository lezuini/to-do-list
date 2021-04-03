const d = document,
  el = d.documentElement;

let inFullscreen = false;

export default function fullscreen(btn) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn) || e.target.matches(`${btn} *`)) {
      if (!inFullscreen) {
        d.documentElement.requestFullscreen();
        inFullscreen = true;
      } else {
        d.exitFullscreen();
        inFullscreen = false;
      }
    }
  });
}
