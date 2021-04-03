const d = document;

export default function searchBar(btn, box) {
  const $btn = d.querySelector(btn),
    $box = d.querySelector(box);

  let open = false;
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if (!open) {
        $box.style.marginTop = 0;
        $box.querySelector("input").focus();
        open = true;
      } else {
        $box.style.marginTop = "-42px";
        open = false;
      }
    }
  });
}
