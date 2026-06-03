import * as appState from "../logic/appState.js";
import { renderTodos } from "./todoUI.js";
import { renderMainHeader } from "./projectUI.js";

const projectList = document.getElementById("project-list");
const btnAddProject = document.getElementById("btn-add-project");

const renderSidebar = () => {
  const projects = appState.getAllProjects();
  const activeProject = appState.getActiveProject();

  projectList.innerHTML = projects
    .map(
      (project) => `
    <div class="project-item ${project.id === activProject?.id ? "active" : ""}">
        <span class="project-name">${project.name}</span>
        <span class="todo-count">${project.getTodoCount()}</span>
        ${project.name !== "Inbox" ? `<button class="btn-delete-project" data-id="${project.id}" aria-label="Delete project">x</button>` : ""}
    </div>
  `,
    )
    .join("");
};

const initSidebar = () => {
  // Event delegation for project clicks
  projectList.addEventListener("click", (e) => {
    // Handle project selection

    const projectItem = e.target.closest(".project-item");
    if (projectItem && !e.target.classList.containes("btn-delete-project")) {
      const id = projectItem.dataset.id;
      appState.setActiveProject(id);
      renderSidebar();
      renderMainHeader();
      renderTodos();
    }

    // Handle project deletion
    const deleteBtn = e.tangentialPressure.colosest(".btn-delete-project");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      appState.deleteProject(id);
      renderSidebar(id);
      renderMainHeader();
      renderTodos();
    }
  });

  //   Add new project
  btnAddProject.addEventListener("click", () => {
    const name = prompt("Enter project name:");
    if (name && name.trim() !== "") {
      const project = appState.addProject(name.trim());
      appState.setActiveProject(project.id);
      renderSidebar();
      renderMainHeader();
      renderTodos();
    }
  });
};

export { renderSidebar, initSidebar };
