import * as appState from "../logic/appState.js";
import { openTodoModal } from "./modalUI.js";
import { renderSidebar } from "./sidebar.js";

const todoList = document.getElementById("todo-list");

const getPriorityClass = (priority) => {
  const classes = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };
  return classes[priority] || "priority-low";
};

const renderTodos = () => {
  const project = appState.getActiveProject();

  if (!project) {
    todoList.innerHTML = `<p class="empty-state>No todos yet - add one above
    </p>`;
    return;
  }

  todoList.innerHTML = project.todos
    .map(
      (todo) =>
        `<div class="todo-card" ${todo.complete ? "completed" : ""} ${getPriorityClass(todo.priority)}>
        <div class="todo-main">
            <button class="btn-complete ${todo.complete ? "checked" : ""}" data-id="${todo.id}" aria-label="Toggle complete">${todo.complete ? "✓" : ""}</button>
            <div class="todo-info">
                <span class="todo-title">${todo.title}</span>
                <span class="todo-date">${todo.dueDate}</span>
            </div>
            <div class="todo-actions">
                <button class="btn-expand" data-id="${todo.id}" aria-label="Edit todo">...</button>
                <button class="btn-delete-todo" data-id="${todo.id}" aria-label="Delete todo">x</button>
            </div>
        </div>
    </div>`,
    )
    .join("");
};

const initTodoEvents = () => {
  todoList.addEventListener("click", (e) => {
    // Toggle complete

    const completeBtn = e.target.closest(".btn-complete");
    if (completeBtn) {
      const id = completeBtn.dataset.id;
      appState.toggleTodoComplete(id);
      renderTodos();
      renderSidebar();
      return;
    }

    // Expand / edit todo
    const expandBtn = e.target.closest(".btn-expand");
    if (expandBtn) {
      const id = expandBtn.dataset.id;
      const todo = appState.getActiveProject().getTodo(id);
      openTodoModal(todo);
      return;
    }

    // Delete todo
    const deleteBtn = e.target.closest(".btn-delete-todo");
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      appState.removeTodo(id);
      renderTodos();
      renderSidebar();
      return;
    }
  });
};

export { renderTodos };
