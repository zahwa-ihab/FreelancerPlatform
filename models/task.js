class Task {
  constructor(
    task_id,
    project_id,
    assigned_to,
    title,
    description,
    status,
    due_date,
  ) {
    this.task_id = task_id;
    this.project_id = project_id;
    this.assigned_to = assigned_to;
    this.title = title;
    this.description = description;
    this.status = status;
    this.due_date = due_date;
  }
  getTaskInfo() {
    return {
      task_id: this.task_id,
      project_id: this.project_id,
      assigned_to: this.assigned_to,
      title: this.title,
      description: this.description,
      status: this.status,
      due_date: this.due_date,
    };
  }
}

module.exports = Task;
