const d = document,
  storage = window.localStorage;

export default function localStorage(key, value) {
  if (key === undefined) {
    console.log("a");
  } else {
    // storage.setItem(key, value);
  }
}

// for (let i = 0; i < storage.length; i++) {
//   let key = storage.key(i);
//   let value = storage.getItem(key);

//   let newTask = d.createElement("li");
//   newTask.classList.add("task");
//   newTask.setAttribute("id", taskNumber);
//   newTask.insertAdjacentHTML("beforeend", templateHTML);
//   $spacer.insertAdjacentElement("beforebegin", newTask);
//   let textArea = newTask.querySelector("textarea");
//   textArea.value = value;
//   finishWritingTask(textArea);
//   taskNumber++;
// }
