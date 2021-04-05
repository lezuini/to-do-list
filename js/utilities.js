const d = document;

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
  alert.classList.add("show-alert");
  setTimeout(() => {
    alert.classList.remove("show-alert");
  }, 2200);
}
