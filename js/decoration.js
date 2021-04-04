const d = document;

export default function decoration(deco = "deco") {
  const $deco = d.getElementById(deco);
  let $tasks = d.querySelectorAll(".task");

  setTimeout(() => {
    if ($tasks.length === 0) {
      $deco.classList.add("deco");
    }
  }, 100);

  d.addEventListener("click", (e) => {
    if (e.target === d.querySelector(".add-btn")) {
      $deco.classList.remove("deco");
    } else if (
      e.target === d.querySelector(".delete-btn") ||
      e.target === d.querySelector(".delete-btn *")
    ) {
      $tasks = d.querySelectorAll(".task");
      setTimeout(() => {
        if ($tasks.length === 0) {
          $deco.classList.add("deco");
        }
      }, 350);
    }
  });
}
