const d = document;

export default function searchBar(
  searchBtn = ".search-btn",
  searchBox = ".search-box",
  searchBoxHeight = "2.625rem"
) {
  const $box = d.querySelector(searchBox);

  let searchBoxOpen = false;

  //By clicking
  d.addEventListener("click", (e) => {
    //Click on the search button
    if (e.target.matches(searchBtn)) {
      const $input = $box.querySelector("input");
      if (!searchBoxOpen) {
        $box.style.marginTop = 0;
        $input.focus();
        searchBoxOpen = true;
      } else {
        $input.value = "";
        d.querySelectorAll(".task").forEach((el) => {
          el.classList.remove("filtered");
        });
        $box.style.marginTop = `-${searchBoxHeight}`;
        searchBoxOpen = false;
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
