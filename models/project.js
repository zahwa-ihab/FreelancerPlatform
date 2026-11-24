class Project {
  constructor(
    project_id,
    company_id,
    title,
    description,
    category,
    budget,
    deadline,
  ) {
    this.project_id = project_id;
    this.company_id = company_id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.budget = budget;
    this.deadline = deadline;
  }
  getProjectInfo() {
    return {
      project_id: this.project_id,
      title: this.title,
      description: this.description,
      category: this.category,
      budget: this.budget,
      deadline: this.deadline,
    };
  }
}

module.exports = Project;
