const d = document;
let alerts = 0;

export function updateStats(taskName = ".task") {
  let presentTasks = d.querySelectorAll(taskName);
  let completedTasks = d.querySelectorAll(`${taskName}.completed`);
  d.getElementById("nTasks").textContent = presentTasks.length;
  d.getElementById("nCompletedTasks").textContent = completedTasks.length;
  d.getElementById("nIncompleteTasks").textContent =
    presentTasks.length - completedTasks.length;
}

export function showAlert(msg) {
  let alert = d.querySelector(".alert");
  alert.textContent = msg;
  alerts++;

  alert.classList.add("show-alert");
  setTimeout(() => {
    alerts--;
    if (alerts <= 0) {
      alert.classList.remove("show-alert");
    } else {
    }
  }, 2200);
}
