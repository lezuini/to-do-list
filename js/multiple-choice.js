import localStorage from "./localStorage.js";
import { updateStats, showAlert } from "./utilities.js";

const d = document;

export default function multipleChoice(
  taskName = ".task",
  addBtn = ".add-btn",
  deleteBtn = ".delete-btn",
  selectBtn = ".select-btn",
  discardBtn = ".discard-btn"
) {
  const $addBtn = d.querySelector(addBtn),
    $deleteBtn = d.querySelector(deleteBtn),
    $selectBtn = d.querySelector(selectBtn),
    $discardBtn = d.querySelector(discardBtn),
    classDelete1 = "useless",
    classDelete2 = "red-mark",
    normalMode = "normal",
    discardMode = "discard";

  let mode = normalMode;

  d.addEventListener("click", (e) => {
    //Enlistar todas las tareas disponibles
    let $tasks = d.querySelectorAll(taskName);

    //Si se da click en el boton de descarte
    if (e.target.matches(discardBtn) || e.target.matches(`${discardBtn} *`)) {
      //Si no se muestra el boton de eliminar
      if (!$deleteBtn.classList.contains("show") || mode === discardMode) {
        //El modo es normal
        if (mode === normalMode) {
          mode = discardMode;
          $addBtn.classList.remove("show");
          $deleteBtn.classList.add("show");
          $selectBtn.classList.add("show");

          $tasks.forEach((el) => {
            el.querySelector(".checker").classList.add("checking");
          });
        }
        //El modo es descarte
        else {
          mode = normalMode;
          $addBtn.classList.add("show");
          $deleteBtn.classList.remove("show");
          $selectBtn.classList.remove("show");

          $tasks.forEach((el) => {
            el.classList.remove(classDelete1);
            el.querySelector(".checker").classList.remove(
              "checking",
              classDelete2
            );
          });
        }
      } else {
        showAlert("Add the task with Enter first");
      }

      $discardBtn.classList.add("shake");
      setTimeout(() => {
        $discardBtn.classList.remove("shake");
      }, 250);
    }

    //Cambiar estado cuando se le da click a una tarea
    if (e.target.matches(taskName) || e.target.matches(`${taskName} *`)) {
      let $t;
      if (e.target.classList.contains("task")) {
        $t = e.target;
      } else {
        $t = e.target.parentElement;
      }

      if (mode === discardMode) {
        if (!$t.classList.contains("incompleted")) {
          if ($t.classList.contains(classDelete1)) {
            $t.classList.remove(classDelete1);
            $t.querySelector(".checker").classList.remove(classDelete2);
          } else {
            $t.classList.add(classDelete1);
            $t.querySelector(".checker").classList.add(classDelete2);
          }
        }
      } else {
        if (!$t.classList.contains("incompleted")) {
          if ($t.classList.contains("completed")) {
            $t.classList.remove("completed");
            $t.querySelector(".checker").classList.remove("check");
          } else {
            $t.classList.add("completed");
            $t.querySelector(".checker").classList.add("check");
          }
          updateStats();
        }
      }
    }

    //Al presionar el boton de eliminar
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      let $uselessTasks = d.querySelectorAll(`${taskName}.${classDelete1}`);

      $uselessTasks.forEach((el) => {
        el.classList.add("eraseAnimation");

        // let taskNumber = el.getAttribute("id");
        // console.log(Number(taskNumber));
        // storage.removeItem(Number(taskNumber));

        setTimeout(() => {
          el.remove();
          updateStats();
        }, 250);
      });

      setTimeout(() => {
        $tasks = d.querySelectorAll(taskName);

        if ($tasks.length === 0) {
          $addBtn.classList.add("show");
          $deleteBtn.classList.remove("show");
          $selectBtn.classList.remove("show");
          mode = normalMode;
        }
      }, 300);
    }

    //Al presionar el boton de seleccionar
    if (e.target.matches(selectBtn) || e.target.matches(`${selectBtn} *`)) {
      $tasks.forEach((el) => {
        if (el.classList.contains(classDelete1)) {
          el.classList.remove(classDelete1);
          el.querySelector(".checker").classList.remove(classDelete2);
        } else {
          el.classList.add(classDelete1);
          el.querySelector(".checker").classList.add(classDelete2);
        }
      });
    }
  });
}
