import handleAddingTasks from "./handle-adding-tasks.js";
import searchBar from "./search-bar.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  handleAddingTasks(".add-btn", ".delete-btn", ".tasks");
  searchBar(".search", ".search-box");
});
