const d = document;

export default function fullscreen(btn = ".fullscreen") {
  let inFullscreen = false;

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn) || e.target.matches(`${btn} *`)) {
      if (!inFullscreen) {
        d.documentElement.requestFullscreen();
        inFullscreen = true;
      } else {
        d.exitFullscreen();
        inFullscreen = false;
        setTimeout(() => {
          d.querySelector(btn).blur();
        }, 300);
      }
    }
  });
}
