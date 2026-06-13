import * as appState from "../logic/appState.js";
import { renderTodos } from "./todoUI.js";
import { renderSidebar } from "./sidebar.js";

const overlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");

const openTodoModal = (todo = null) => {
  const isEditing = todo !== null;

  modal.innerHTML = `
    <div class="modal-header">
        <h3>${isEditing ? "Edit Todo" : "New Todo"}</h3>
        <buton class="btn-icon" id="btn-close-modal" aria-label="Close">x</button>
    </div>
    <form classs="modal-form" id="todo-form">
    <div class="form-group">
        <label for="input-title">Title</label>
        <input id="input-title" type="text" value="${isEditing ? todo.title : ""}" placeholder="What needs to be done?" required/>
    </div>
    <div class="form-group">
        <label for="input-description">Description</label>
        <textarea id="input-description" placeholder="Add more details...">${isEditing ? todo.description : ""}</textarea>
    </div>
    <div class="form-group">
        <label for="input-date">Due Date</label>
        <input id="input-date" type="date" value="${isEditing ? todo.dueDate : ""}"/>
    </div>
    <div class="form-group">
        <label for="input-priority">Priority</label>
        <select id="input-priority">
            <option value="low" ${isEditing && todo.priority === "low" ? "selected" : ""}>Low</option>
            <option value="medium" ${isEditing && todo.priority === "medium" ? "selected" : ""}>Medium</option>
            <option value="high" ${isEditing && todo.priority === "high" ? "selected" : ""}>High</option>
        </select>
    </div>
    <div class="form-group">
        <label for="input-notes">Notes</label>
        <textarea id="input-notes" placeholder="Add notes...">${isEditing && todo.notes.length > 0 ? todonotes.join("\n") : ""}</textarea>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn-secondary" id="btn-cancel">Cancel</button>
        <button type="submit" class="btn-primary">${isEditing ? "Save Changes" : "Add Todo"}</button>
    </div>
    </form>
  `;

  overlay.classList.remove("hidden");
  document.getElementById("input-title").focus();

  //   Close handlers
  document
    .getElementById("btn-close-modal")
    .addEventListener("click", closeModal);
  document.getElementById("btn-cancel").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  //   Form Submission
  document.getElementById("todo-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("input-title").value.trim();
    const description = document
      .getElementById("input-description")
      .value.trim();
    const dueDate = document.getElementById("input-date").value;
    const priority = document.getElementById("input-priority").value;
    const notesRaw = document.getElementById("input-notes").value.trim();
    const notes = notesRaw.split("\n").filter((n) => n.trim() !== "");

    if (!title) return;

    if (isEditing) {
      appState.updateTodo(todo.id, { title, description, dueDate, priority });
      const updatedTodo = appState.getActiveProject().getTodo(todo.id);
      updatedTodo.notes = notes;
      appState.saveCurrentState();
    } else {
      const newTodo = appState.addTodo(title, description, dueDate, priority);
      if (newTodo) newTodo.notes = notes;
      appState.saveCurrentState();
    }

    closeModal();
    renderTodos();
    renderSidebar();
  });
};

const closeModal = () => {
  overlay.classList.add("hidden");
  modal.innerHTML = "";
};

export { openTodoModal, closeModal };
