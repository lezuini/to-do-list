const d = document,
  storage = window.localStorage;

let theme = "light";

export function loadStorage(templateHTML, $spacer) {
  let data = {};

  //Store what was in storage
  for (let i = 0; i < storage.length; i++) {
    let key = storage.key(i);
    let value = storage.getItem(key);

    if (key !== "theme") {
      data[key] = value;
    } else {
      theme = value;
    }
  }
  storage.clear();

  setInStorage("theme", theme);

  //TaskNumber
  let i = 0;

  //Update the storage
  for (let key in data) {
    let value = data[key];

    let parsedValue = JSON.parse(value);

    const $template = d.createElement("li");
    $template.classList.add("task");
    $template.setAttribute("id", i);
    $template.insertAdjacentHTML("beforeend", templateHTML);

    const $textarea = $template.querySelector("textarea");
    $textarea.value = parsedValue[0];
    $textarea.style.height = parsedValue[2];
    $textarea.classList.add("disabled");
    $textarea.readOnly = "true";

    if (parsedValue[1]) {
      $template.classList.add("completed");
      $template.querySelector(".checker").classList.add("check");
    }

    $spacer.insertAdjacentElement("beforebegin", $template);

    setInStorage(i, value);
    i++;
  }
  return i;
}

export function setInStorage(key, value) {
  storage.setItem(key, value);
}

export function modifyInStorage(key, value) {
  let keyValue = JSON.parse(storage.getItem(key));
  let newValue = JSON.stringify([keyValue[0], value, keyValue[2]]);
  setInStorage(key, newValue);
}

export function deleteFromStorage(key) {
  storage.removeItem(key);
}

export function updateTheme(mode) {
  storage.setItem("theme", mode);
}
