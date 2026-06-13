import { saveToStorage, loadFromStorage } from "./storage.js";
import Project from "./project.js";

let projects = [];
let activeProjectId = null;

// Initialize with default Project

const init = () => {
  const saved = loadFromStorage();

  if (saved) {
    projects = saved;
    activeProjectId = projects[0].id;
  } else {
    const inbox = new Project("Inbox");
    projects.push(inbox);
    activeProjectId = inbox.id;
  }
};

// Project operations

const addProject = (name) => {
  const project = new Project(name);
  projects.push(project);
  saveToStorage(projects);
  return project;
};

const removeProject = (id) => {
  projects = projects.filter((project) => project.id !== id);

  if (activeProjectId === id) {
    activeProjectId = projects.length > 0 ? projects[0].id : null;
  }
  saveToStorage(projects);
};

const getProject = (id) => {
  return projects.find((project) => project.id === id);
};

const getAllProjects = () => {
  return projects;
};

const setActiveProject = (id) => {
  const project = getProject(id);
  if (project) activeProjectId = id;
};

const getActiveProject = () => {
  return getProject(activeProjectId);
};

// Todo Operations
const addTodo = (title, description, dueDate, priority) => {
  const active = getActiveProject();
  if (active) {
    const todo = active.addTodo(title, description, dueDate, priority);
    saveToStorage(projects);
    return todo;
  }
};

const removeTodo = (id) => {
  const active = getActiveProject();
  if (active) {
    active.removeTodo(id);
    saveToStorage(projects);
  }
};

const toggleTodoComplete = (todoId) => {
  const active = getActiveProject();
  if (active) {
    active.toggleTodoComplete(todoId);
    saveToStorage(projects);
  }
};

const updateTodo = (todoId, fields) => {
  const active = getActiveProject();
  if (active) {
    active.updateTodo(todoId, fields);
    saveToStorage(projects);
  }
};

const saveCurrentState = () => {
  saveToStorage(projects);
};

export {
  init,
  addProject,
  removeProject,
  getProject,
  getAllProjects,
  setActiveProject,
  getActiveProject,
  addTodo,
  removeTodo,
  toggleTodoComplete,
  updateTodo,
  saveCurrentState,
};
