import { modifyInStorage, deleteFromStorage } from "./localStorage.js";
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
    $deco = d.getElementById("deco"),
    classDelete1 = "useless",
    classDelete2 = "red-mark",
    normalMode = "normal",
    discardMode = "discard";

  let mode = normalMode;

  d.addEventListener("click", (e) => {
    //List all available tasks
    let $tasks = d.querySelectorAll(taskName);

    //If the discard button is clicked
    if (e.target.matches(discardBtn) || e.target.matches(`${discardBtn} *`)) {
      //If the delete button is not displayed
      if (!$deleteBtn.classList.contains("show") || mode === discardMode) {
        //Mode is normal
        if (mode === normalMode) {
          mode = discardMode;
          $addBtn.classList.remove("show");
          $deleteBtn.classList.add("show");
          $selectBtn.classList.add("show");

          $tasks.forEach((el) => {
            el.querySelector(".checker").classList.add("checking");
          });

          if ($tasks.length === 0) {
            $deco.classList.remove("deco");
          }
        }
        //Mode is discard
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

          if ($tasks.length === 0) {
            $deco.classList.add("deco");
          }
          setTimeout(() => {
            $discardBtn.blur();
          }, 300);
        }
      } else {
        showAlert("Add the task with Enter first");
      }

      //Cool animation
      $discardBtn.classList.add("shake");
      setTimeout(() => {
        $discardBtn.classList.remove("shake");
      }, 250);
    }

    //Change status when a task is clicked
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
      }
      //Mode is normal
      else {
        if (!$t.classList.contains("incompleted")) {
          if ($t.classList.contains("completed")) {
            $t.classList.remove("completed");
            $t.querySelector(".checker").classList.remove("check");
            modifyInStorage($t.getAttribute("id"), false);
          } else {
            $t.classList.add("completed");
            $t.querySelector(".checker").classList.add("check");
            modifyInStorage($t.getAttribute("id"), true);
          }
          updateStats();
        }
      }
    }

    //By pressing the delete button
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      let $uselessTasks = d.querySelectorAll(`${taskName}.${classDelete1}`);

      $uselessTasks.forEach((el) => {
        el.classList.add("eraseAnimation");

        deleteFromStorage(el.getAttribute("id"));

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
          $deco.classList.add("deco");
        }
      }, 300);
    }

    //By pressing the select button
    if (e.target.matches(selectBtn) || e.target.matches(`${selectBtn} *`)) {
      if ($tasks.length > 0) {
        $tasks.forEach((el) => {
          if (el.classList.contains(classDelete1)) {
            el.classList.remove(classDelete1);
            el.querySelector(".checker").classList.remove(classDelete2);
          } else {
            el.classList.add(classDelete1);
            el.querySelector(".checker").classList.add(classDelete2);
          }
        });
      } else {
        $selectBtn.classList.add("shake");
        setTimeout(() => {
          $selectBtn.classList.remove("shake");
        }, 250);
      }
    }
  });
}
