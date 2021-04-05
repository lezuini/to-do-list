import decoration from "./decoration.js";
import fullscreen from "./fullscreen.js";
import handleAddingTasks from "./handle-adding-tasks.js";
import multipleChoice from "./multiple-choice.js";
import searchBar from "./search-bar.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  handleAddingTasks(
    ".add-btn",
    ".delete-btn",
    ".tasks",
    ".spacer",
    ".container"
  );
  multipleChoice(
    ".task",
    ".add-btn",
    ".delete-btn",
    ".select-btn",
    ".discard-btn"
  );
  searchBar(".search-btn", ".search-box", "2.625rem");
  decoration("deco");
  fullscreen(".fullscreen");
});
