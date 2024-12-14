import { TaskTracker } from "./task-tracker";
import "../css/app.css";
import "../scss/reset.scss";
import "../scss/style.scss";

/********** Paste your code here! ************/

window.onload = () => {
  console.log("Paste your code here!");
  TaskTracker.init();
};

document.addEventListener("DOMContentLoaded", () => {
  TaskTracker.init();
});
