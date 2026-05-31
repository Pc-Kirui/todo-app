import Todo from "./todo.js";
import Project from "./project.js";

// Key constant

const STORAGE_KEY = "todo-app-projects";

// Reconstruction

const reconstructProjects = (rawProjects) => {
  return rawProjects.map((rawProject) => {
    const project = new Project(rawProject.name);

    project.id = rawProject.id;

    project.todos = rawProject.todos.map((rawTodo) => {
      const todo = new Todo(
        rawTodo.title,
        rawTodo.description,
        rawTodo.dueDate,
        rawTodo.priority,
      );

      todo.id = rawTodo.id;
      todo.complete = rawTodo.complete;
      todo.notes = rawTodo.notes;

      return todo;
    });
    return project;
  });
};

// Saving to localStorage
const saveToStorage = (projects) => {
  try {
    const serialized = JSON.stringify(projects);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
};

// Loading from localStorage

const loadFromStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return null;

    const rawData = JSON.parse(serialized);
    return reconstructProjects(rawData);
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
};

// Clearing Storage
const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Exports
export { saveToStorage, loadFromStorage, clearStorage };
