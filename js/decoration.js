const d = document;

export default function decoration(deco) {
  const $deco = d.getElementById(deco);

  d.addEventListener("click", (e) => {
    if (e.target === d.querySelector(".add-btn")) {
      $deco.classList.remove("deco");
    } else if (
      e.target === d.querySelector(".delete-btn") ||
      e.target === d.querySelector(".delete-btn *")
    ) {
      console.log("1");
      setTimeout(() => {
        console.log("2");
        if (d.querySelectorAll(".task").length === 0) {
          console.log("3");
          $deco.classList.add("deco");
        }
      }, 300);
    }
  });
}
