const d = document;

export default function handleAddingTasks(addBtn, deleteBtn, taskList) {
  const $taskList = d.querySelector(taskList),
    $container = d.querySelector(".container"),
    $deleteBtn = d.querySelector(deleteBtn),
    $spacer = $taskList.querySelector(".spacer");

  let taskSet = true,
    inAdd = false,
    taskNumber = 0;

  const endWriteTask = ($textarea) => {
    $textarea.classList.add("disabled");
    $textarea.readOnly = "true";
    $textarea.parentElement.classList.remove("incompleted");
    let lineas = $textarea.value.split(`\n`);

    if (lineas.length === 1) {
      $textarea.style.height = "20px";
    } else if (lineas.length === 2) {
      $textarea.style.height = "40px";
    } else if (lineas.length === 3) {
      $textarea.style.height = "60px";
    } else if (lineas.length === 4) {
      $textarea.style.height = "80px";
    } else if (lineas.length === 5) {
      $textarea.style.height = "100px";
    }
    taskSet = true;
  };

  const stats = () => {
    let allTasks = d.querySelectorAll(".task");
    let allCompTasks = d.querySelectorAll(".task.completed");
    d.getElementById("nTasks").textContent = allTasks.length;
    d.getElementById("nCompletedTasks").textContent = allCompTasks.length;
    d.getElementById("nIncompleteTasks").textContent =
      allTasks.length - allCompTasks.length;
  };
  stats();

  d.addEventListener("click", (e) => {
    const $newTask = d.createElement("li");

    let task = `
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

    $newTask.classList.add("task");
    $newTask.classList.add("incompleted");
    $newTask.setAttribute("id", `task${taskNumber}`);
    $newTask.insertAdjacentHTML("beforeend", task);
    var $textarea;
    if (e.target.matches(addBtn)) {
      inAdd = true;
      if (taskSet) {
        taskSet = false;
        $deleteBtn.classList.add("show");
        $container.scroll({
          top: $container.scrollHeight,
          behavior: "smooth",
        });
        $spacer.insertAdjacentElement("beforebegin", $newTask);
        $newTask.querySelector("textarea").focus();
        $textarea = $newTask.querySelector("textarea");
        taskNumber++;
        stats();
      } else alert("Finish the task first");
    }
    if (e.target.matches(deleteBtn) || e.target.matches(`${deleteBtn} *`)) {
      if (inAdd) {
        inAdd = false;
        taskSet = true;
        // console.log($taskList.lastElementChild);
        let badChild = d.getElementById(`task${--taskNumber}`);
        // console.log(badChild);
        badChild.remove();
        $deleteBtn.classList.remove("show");
        stats();
      }
    }
    d.addEventListener("keydown", (e) => {
      if (e.target === $newTask.querySelector("textarea")) {
        if (e.key === "Enter" && !e.shiftKey) {
          inAdd = false;

          e.preventDefault();

          if ($textarea.value.length > 0) {
            endWriteTask($textarea);
            $deleteBtn.classList.remove("show");
          } else {
            alert("Min 1 character");
          }
          stats();
        }
      }
    });
  });
}
