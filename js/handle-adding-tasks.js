import { loadStorage, setInStorage } from "./localStorage.js";
import { updateStats, showAlert } from "./utilities.js";

const d = document;

export default function handleAddingTasks(
  addBtn = ".add-btn",
  deleteBtn = ".delete-btn",
  taskListName = ".tasks",
  spacer = ".spacer",
  container = ".container"
) {
  const $taskList = d.querySelector(taskListName),
    $container = d.querySelector(container),
    $deleteBtn = d.querySelector(deleteBtn),
    $spacer = $taskList.querySelector(spacer);

  let inAddition = false,
    taskNumber = 0;

  const templateHTML = `
        <textarea
          maxlength="80"
          minlength="1"
          rows="5"
          class="text"
          placeholder="Write something here"
          autofocus
        ></textarea>
          <span class="checker"></span>
      `;

  const finishWritingTask = ($textarea) => {
    $textarea.classList.add("disabled");
    $textarea.readOnly = "true";
    $textarea.parentElement.classList.remove("incompleted");

    let lines = $textarea.value.split(`\n`);
    console.log(lines.length);
    let height = "";
    if (lines.length === 1) {
      console.log($textarea.value.length);
      lines = 1;
      for (let i = 1; i < 5; i++) {
        if ($textarea.value.length >= i * 16) {
          lines++;
        }
      }
      height = `${1.1375 * lines}rem`;
    } else {
      height = `${1.1375 * lines.length}rem`;
    }

    $textarea.style.height = height;

    let value = JSON.stringify([$textarea.value, false, height]);
    setInStorage(taskNumber, value);
    taskNumber++;
  };

  //Get the data
  taskNumber = loadStorage(templateHTML, $spacer);
  updateStats();

  //Click
  d.addEventListener("click", (e) => {
    const $template = d.createElement("li");

    $template.classList.add("task", "incompleted");
    $template.setAttribute("id", taskNumber);
    $template.insertAdjacentHTML("beforeend", templateHTML);

    const $textarea = $template.querySelector("textarea");

    //Click on the add button
    if (e.target.matches(addBtn)) {
      //If there is no task being added
      if (!inAddition) {
        inAddition = true;

        $deleteBtn.classList.add("show");
        $container.scroll({
          top: $container.scrollHeight,
          behavior: "smooth",
        });

        //Add the template to the DOM
        $spacer.insertAdjacentElement("beforebegin", $template);
        $template.querySelector("textarea").focus();

        updateStats();
      }
      //If there is already a task being added
      else {
        showAlert("Add the task with Enter first");
      }
    }

    //Click on the delete button
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      if (inAddition) {
        let currentTask = d.getElementById(taskNumber);
        currentTask.remove();
        $deleteBtn.classList.remove("show");

        inAddition = false;

        updateStats();
      }
    }

    //Press a key
    d.addEventListener("keydown", (e) => {
      //Press a key within the textarea
      if (e.target === $template.querySelector("textarea")) {
        //Only if Enter is pressed only
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          //If the content of the textarea is greater than 0
          if ($textarea.value.length > 0) {
            finishWritingTask($textarea);
            $deleteBtn.classList.remove("show");

            inAddition = false;
          } else {
            showAlert("Minimum 1 character");
          }

          updateStats();
        }
      }
    });
  });
}
