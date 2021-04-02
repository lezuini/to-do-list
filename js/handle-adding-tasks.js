const d = document;

export default function handleAddingTasks(addBtn, taskList) {
  const $taskList = d.querySelector(taskList),
    $container = d.querySelector(".container"),
    $spacer = $taskList.querySelector(".spacer");

  d.addEventListener("click", (e) => {
    const $newTask = d.createElement("li");

    let task = `
      <textarea
        maxlength="50"
        rows="5"
        class="text"
        placeholder="Write something here"
      ></textarea>
        <span class="checker"></span>
    `;

    $newTask.classList.add("task");
    $newTask.classList.add("incompleted");
    $newTask.insertAdjacentHTML("beforeend", task);
    if (e.target.matches(addBtn)) {
      console.log($container.scrollHeight);
      $container.scroll({
        top: $container.scrollHeight,
        behavior: "smooth",
      });
      $spacer.insertAdjacentElement("beforebegin", $newTask);
    }
    d.addEventListener("keydown", (e) => {
      if (e.target === $newTask.querySelector("textarea")) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          let $textarea = $newTask.querySelector("textarea");
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
        }
      }
    });

    let $t;

    // console.log(e.target);

    if (e.target.matches(".task") || e.target.matches(".task *")) {
      console.log(e.target.parentElement);
      if (e.target.matches(".task")) {
        $t = e.target;
        console.log($t);
      } else {
        $t = e.target.parentElement;
        console.log($t);
      }

      if ($t.classList.contains("incompleted")) {
        console.log("no esta listo");
      } else if ($t.classList.contains("completed")) {
        $t.classList.remove("completed");
        $t.querySelector(".checker").classList.remove("check");
      } else {
        $t.classList.add("completed");
        $t.querySelector(".checker").classList.add("check");
      }
    }
  });
}
