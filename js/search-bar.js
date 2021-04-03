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
        $box.querySelector("input").value = "";
        d.querySelectorAll("textarea").forEach((el) => {
          el.parentElement.classList.remove("filtered");
        });
        $box.style.marginTop = "-42px";
        open = false;
      }
    }
  });
  d.addEventListener("keyup", (e) => {
    if (e.target === $box.querySelector("input")) {
      d.querySelectorAll("textarea").forEach((el) => {
        // console.log(el);
        el.value.toLowerCase().includes(e.target.value)
          ? el.parentElement.classList.remove("filtered")
          : el.parentElement.classList.add("filtered");
      });
    }
    // console.log(e.target.value);
  });
}
