import * as appState from "../logic/appState.js";
import { openTodoModal } from "./modalUI.js";

const mainHeader = document.getElementById("main-header");

const renderMainHeader = () => {
  const project = appState.getActiveProject();
  if (!project) {
    mainHeader.innerHTML = `<p class="empty-state">No project selected</p>`;
    return;
  }

  mainHeader.innerHTML = `<div class="header-content">
    <h2 class="project-title">${project.name}</h2>
    <button class="btn-primary" id="btn-add-todo">+ Add Todo</button>
  </div>`;

  document.getElementById("btn-add-todo").addEventListener("click", () => {
    openTodoModal();
  });
};

export { renderMainHeader };
