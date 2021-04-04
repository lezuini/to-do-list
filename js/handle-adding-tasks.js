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
          maxlength="50"
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
    let height = `${1.125 * lines.length}rem`;
    $textarea.style.height = height;

    let value = JSON.stringify([$textarea.value, false, height]);
    setInStorage(taskNumber, value);
    taskNumber++;
  };

  //Get data
  taskNumber = loadStorage(templateHTML, $spacer);
  updateStats();

  //Hacer click
  d.addEventListener("click", (e) => {
    const $template = d.createElement("li");

    $template.classList.add("task", "incompleted");
    $template.setAttribute("id", taskNumber);
    $template.insertAdjacentHTML("beforeend", templateHTML);

    const $textarea = $template.querySelector("textarea");

    //Hacer click en el boton de añadir
    if (e.target.matches(addBtn)) {
      //Si no hay una tarea agregandose
      if (!inAddition) {
        //a
        inAddition = true;

        $deleteBtn.classList.add("show");
        $container.scroll({
          top: $container.scrollHeight,
          behavior: "smooth",
        });

        //Añadir el template a el DOM
        $spacer.insertAdjacentElement("beforebegin", $template);
        $template.querySelector("textarea").focus();

        //Actualizar estadisticas
        updateStats();
      }
      //Si ya hay una tarea agragandose
      else {
        showAlert("Add the task with Enter first");
      }
    }

    //Hacer click en el boton de eliminar
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      if (inAddition) {
        let currentTask = d.getElementById(taskNumber);
        currentTask.remove();
        $deleteBtn.classList.remove("show");

        inAddition = false;

        updateStats();
      }
    }

    //Presionar una tecla
    d.addEventListener("keydown", (e) => {
      //Presionar una tecla dentro del textarea
      if (e.target === $template.querySelector("textarea")) {
        //Solo si se presiona unicamente Enter
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          //Si el conteido del textarea es mayor que 0
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
