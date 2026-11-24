class Message {
  constructor(message_id, sender_id, receiver_id, project_id, message_content) {
    this.message_id = message_id;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.project_id = project_id;
    this.message_content = message_content;
  }
  getMessageInfo() {
    return {
      message_id: this.message_id,
      sender_id: this.sender_id,
      receiver_id: this.receiver_id,
      project_id: this.project_id,
      message_content: this.message_content,
    };
  }
}

module.exports = Message;
