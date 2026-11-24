class Application {
  constructor(
    application_id,
    project_id,
    freelancer_id,
    proposal,
    proposed_budget,
  ) {
    this.application_id = application_id;
    this.project_id = project_id;
    this.freelancer_id = freelancer_id;
    this.proposal = proposal;
    this.proposed_budget = proposed_budget;
  }
  getApplicationInfo() {
    return {
      application_id: this.application_id,
      project_id: this.project_id,
      freelancer_id: this.freelancer_id,
      proposal: this.proposal,
      proposed_budget: this.proposed_budget,
    };
  }
}

module.exports = Application;
