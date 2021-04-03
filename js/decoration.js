const d = document;

export default function decoration(deco) {
  const $deco = d.getElementById(deco);
  setTimeout(() => {
    $deco.classList.add("deco");
  }, 100);

  d.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === d.querySelector(".add-btn")) {
      $deco.classList.remove("deco");
    } else if (
      e.target === d.querySelector(".delete-btn") ||
      e.target === d.querySelector(".delete-btn > *")
    ) {
      setTimeout(() => {
        if (d.querySelectorAll(".task").length === 0) {
          console.log("3");
          $deco.classList.add("deco");
        }
      }, 350);
    }
  });
}
