import decoration from "./decoration.js";
import fullscreen from "./fullscreen.js";
import handleAddingTasks from "./handle-adding-tasks.js";
import multipleChoice from "./multiple-choice.js";
import searchBar from "./search-bar.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  handleAddingTasks(".add-btn", ".delete-btn", ".tasks");
  searchBar(".search", ".search-box");
  multipleChoice(".task", ".task", ".trash");
  decoration("deco");
  fullscreen(".fullscreen");
});
