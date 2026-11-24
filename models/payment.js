class Payment {
  constructor(
    payment_id,
    project_id,
    company_id,
    freelancer_id,
    amount,
    payment_method,
    payment_status,
  ) {
    this.payment_id = payment_id;
    this.project_id = project_id;
    this.company_id = company_id;
    this.freelancer_id = freelancer_id;
    this.amount = amount;
    this.payment_method = payment_method;
    this.payment_status = payment_status;
  }
  getPaymentInfo() {
    return {
      payment_id: this.payment_id,
      project_id: this.project_id,
      company_id: this.company_id,
      freelancer_id: this.freelancer_id,
      amount: this.amount,
      payment_method: this.payment_method,
      payment_status: this.payment_status,
    };
  }
}

module.exports = Payment;
