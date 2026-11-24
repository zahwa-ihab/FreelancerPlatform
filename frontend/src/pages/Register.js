import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "freelancer",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle registration
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users", user)
      .then((response) => {
        console.log("User registered:", response.data);

        setSuccess("Account created successfully!");
        setError("");

        setUser({
          full_name: "",
          email: "",
          password: "",
          phone: "",
          role: "freelancer",
        });
      })
      .catch((error) => {
        console.log(error);
        setError("Registration failed. Please try again.");
        setSuccess("");
      });
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <p>Join Freelancer Platform and start your journey.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={user.full_name}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleInputChange}
          required
        />

        <select name="role" value={user.role} onChange={handleInputChange}>
          <option value="freelancer">Freelancer</option>
          <option value="company">Company</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
