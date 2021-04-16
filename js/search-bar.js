const d = document;

export default function searchBar(
  searchBtn = ".search-btn",
  searchBox = ".search-box",
  searchBoxHeight = "2.625rem",
  deco = "deco"
) {
  const $box = d.querySelector(searchBox),
    $deco = d.getElementById(deco);

  let searchBoxOpen = false;

  //By clicking
  d.addEventListener("click", (e) => {
    //Click on the search button
    if (e.target.matches(searchBtn) || e.target.matches(`${searchBtn} *`)) {
      const $input = $box.querySelector("input");
      if (!searchBoxOpen) {
        searchBoxOpen = true;
        $box.style.marginTop = 0;
        $input.focus();
        $deco.classList.remove("deco");
      } else {
        $input.value = "";
        d.querySelectorAll(".task").forEach((el) => {
          el.classList.remove("filtered");
        });
        $box.style.marginTop = `-${searchBoxHeight}`;
        searchBoxOpen = false;

        let $tasks = d.querySelectorAll(".task");
        if ($tasks.length === 0) {
          setTimeout(() => {
            if (searchBoxOpen === false) {
              $deco.classList.add("deco");
            }
          }, 300);
        }
      }
    }
  });

  //Pressing a key
  d.addEventListener("keyup", (e) => {
    //Press keys in the search box
    if (e.target === $box.querySelector("input")) {
      d.querySelectorAll("textarea").forEach((el) => {
        el.value.toLowerCase().includes(e.target.value.toLowerCase())
          ? el.parentElement.classList.remove("filtered")
          : el.parentElement.classList.add("filtered");
      });
    }
  });
}
