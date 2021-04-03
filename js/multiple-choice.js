const d = document;

export default function multipleChoice(task, tasks, deleteBtn) {
  let mode = "normal";
  let selectIsActive = false;

  const stats = () => {
    let allTasks = d.querySelectorAll(".task");
    let allCompTasks = d.querySelectorAll(".task.completed");
    d.getElementById("nTasks").textContent = allTasks.length;
    d.getElementById("nCompletedTasks").textContent = allCompTasks.length;
    d.getElementById("nIncompleteTasks").textContent =
      allTasks.length - allCompTasks.length;
  };

  d.addEventListener("click", (e) => {
    let tasksList = d.querySelectorAll(tasks);
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      if (
        !d.querySelector(".delete-btn").classList.contains("show") ||
        mode === "deleting"
      ) {
        if (mode === "normal") {
          mode = "deleting";
          d.querySelector(".add-btn").classList.remove("show");
          d.querySelector(".select-btn").classList.add("show");
          d.querySelector(".delete-btn").classList.add("show");

          tasksList.forEach((el) => {
            el.querySelector(".checker").classList.add("checking");
          });
        } else {
          mode = "normal";
          d.querySelector(".add-btn").classList.add("show");
          d.querySelector(".select-btn").classList.remove("show");
          d.querySelector(".delete-btn").classList.remove("show");
          selectIsActive = false;

          tasksList.forEach((el) => {
            el.classList.remove("deleteTask");
            el.querySelector(".checker").classList.remove("checking");
            el.querySelector(".checker").classList.remove("forDeleting");
          });
        }
      } else {
        let alert = d.querySelector(".alert");
        alert.textContent = "Add the task with Enter first";
        alert.classList.add("show-alert");
        setTimeout(() => {
          alert.classList.remove("show-alert");
        }, 2200);
      }

      d.querySelector(deleteBtn).classList.add("shake");
      setTimeout(() => {
        d.querySelector(deleteBtn).classList.remove("shake");
      }, 250);
    }

    if (e.target.matches(task) || e.target.matches(`${task} *`)) {
      let $t;
      if (e.target.classList.contains("task")) {
        $t = e.target;
      } else {
        $t = e.target.parentElement;
      }

      if (mode === "normal") {
        if (!$t.classList.contains("incompleted")) {
          if ($t.classList.contains("completed")) {
            $t.classList.remove("completed");
            $t.querySelector(".checker").classList.remove("check");
          } else {
            $t.classList.add("completed");
            $t.querySelector(".checker").classList.add("check");
          }
          stats();
        }
      } else if (mode === "deleting") {
        if (!$t.classList.contains("incompleted")) {
          if ($t.classList.contains("deleteTask")) {
            $t.classList.remove("deleteTask");
            $t.querySelector(".checker").classList.remove("forDeleting");
          } else {
            $t.classList.add("deleteTask");
            $t.querySelector(".checker").classList.add("forDeleting");
          }
        }
      }
    }
    if (e.target.matches(".delete-btn") || e.target.matches(".delete-btn *")) {
      let actualList = d.querySelectorAll(".task.deleteTask");
      // console.log(actualList);
      selectIsActive = false;
      actualList.forEach((el) => {
        el.classList.add("endAnimation");
        setTimeout(() => {
          el.remove();
          actualList = d.querySelectorAll(".task");
          if (actualList.length === 0) {
            mode = "normal";
            d.querySelector(".add-btn").classList.add("show");
            d.querySelector(".select-btn").classList.remove("show");
            d.querySelector(".delete-btn").classList.remove("show");
            selectIsActive = false;

            tasksList.forEach((el) => {
              el.classList.remove("deleteTask");
              el.querySelector(".checker").classList.remove("checking");
              el.querySelector(".checker").classList.remove("forDeleting");
            });
          }
          stats();
        }, 250);
      });
    }
    if (e.target.matches(".select-btn") || e.target.matches(".select-btn *")) {
      let actualList = d.querySelectorAll(".task");
      // console.log(actualList);
      if (!selectIsActive) {
        selectIsActive = true;
        actualList.forEach((el) => {
          el.classList.add("deleteTask");
          el.querySelector(".checker").classList.add("forDeleting");
        });
      } else {
        selectIsActive = false;
        actualList.forEach((el) => {
          el.classList.remove("deleteTask");
          el.querySelector(".checker").classList.remove("forDeleting");
        });
      }
    }
  });
}
