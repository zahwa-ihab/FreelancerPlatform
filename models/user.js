class User {
  constructor(user_id, full_name, email, password, phone, role) {
    //constructor runs whenever we create a new User object. It receives the user's information
    this.user_id = user_id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
  }

  getUserInfo() {
    return {
      user_id: this.user_id,
      full_name: this.full_name,
      email: this.email,
      phone: this.phone,
      role: this.role,
    };
  }
}

module.exports = User; //Makes the User class available to other files
