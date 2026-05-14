class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = [];
    this.complete = false;
    this.id = Date.now().toString();
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  updatePriority(newPriority) {
    const valid = ["low", "medium", "high"];
    if (valid.includes(newPriority)) {
      this.priority = newPriority;
    }
  }

  addNote(note) {
    if (note && note.trim() !== "") {
      this.notes.push(note);
    }
  }

  removeNote(index) {
    this.notes.splice(index, 1);
  }

  update(fields) {
    const allowed = ["title", "description", "dueDate", "priority"];
    allowed.forEach((field) => {
      if (fields[field] !== undefined) {
        this[field] = fields[field];
      }
    });
  }
}
export default Todo;
