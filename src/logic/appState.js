import Project from "./project.js";

let projects = [];
let activeProjectId = null;

// Initialize with default Project

const init = () => {
  if (projects.length === 0) {
    const inbox = new Project("Inbox");
    projects.push(inbox);
    activeProjectId = inbox.id;
  }
};

// Project operations

const addProject = (name) => {
  const project = new Project(name);
  projects.push(project);
  return project;
};

const removeProject = (id) => {
  projects = projects.filter((project) => project.id !== id);

  if (activeProjectId === id) {
    activeProjectId = projects.length > 0 ? projects[0].id : null;
  }
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
    return active.addTodo(title, description, dueDate, priority);
  }
};

const removeTodo = (id) => {
  const active = getActiveProject();
  if (active) {
    active.removeTodo(id);
  }
};

const toggleTodoComplete = (todoId) => {
  const active = getActiveProject();
  if (active) active.toggleTodoComplete(todoId);
};

const updateTodo = (todoId, fields) => {
  const active = getActiveProject();
  if (active) active.updateTodo(todoId, fields);
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
};
