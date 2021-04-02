import handleAddingTasks from "./handle-adding-tasks.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  handleAddingTasks(".add-btn", ".tasks");
});
