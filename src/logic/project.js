import Todo from "./todo";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = Date.now().toString();
  }

  addTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    this.todos.push(todo);
    return todo;
  }

  getTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodoComplete(id) {
    const todo = this.getTodo(id);
    if (todo) todo.toggleComplete();
  }

  updateTodo(id, fields) {
    const todo = this.getTodo(id);
    if (todo) todo.update(fields);
  }

  getTodosByPriority(priority) {
    return this.todos.filter((todo) => todo.priority === priority);
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.complete === true);
  }

  getPendingTodos() {
    return this.todos.filter((todo) => todo.complete === false);
  }

  getTodoCount() {
    return this.todos.length;
  }
}

export default Project;
