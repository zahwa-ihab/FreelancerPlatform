import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

function Login() {
  const { setUser } = useContext(UserContext);

  const [user, setUserForm] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserForm({
      ...user,
      [name]: value,
    });
  };

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users/login", user)
      .then((response) => {
        console.log("Logged in user:", response.data.user);

        // Save user information in Context
        setUser(response.data.user);

        setSuccess("Welcome, " + response.data.user.full_name + "!");
        setError("");

        setUserForm({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password!");
        setSuccess("");
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Welcome back to Freelancer Platform!</p>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
