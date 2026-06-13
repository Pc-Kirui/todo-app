import * as appState from "./logic/appState.js";
import { renderSidebar, initSidebar } from "./ui/sidebar.js";
import { renderMainHeader } from "./ui/projectUI.js";
import { renderTodos } from "./ui/todoUI.js";

const start = () => {
  appState.init();
  initSidebar();
  renderSidebar();
  renderMainHeader();
  renderTodos();
};

start();
