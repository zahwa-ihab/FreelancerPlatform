import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

function Tasks() {
  const { user } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get tasks assigned to the logged-in freelancer
  const fetchTasks = () => {
    if (user && user.role === "freelancer") {
      axios
        .get("http://localhost:8080/tasks/search/" + user.user_id)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("Failed to load tasks.");
        });
    }
  };

  useEffect(() => {
    if (user && user.role === "freelancer") {
      axios
        .get("http://localhost:8080/tasks/search/" + user.user_id)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("Failed to load tasks.");
        });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Add a new task
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/tasks", newTask)
      .then((response) => {
        setSuccess("Task added successfully!");
        setError("");

        setNewTask({
          project_id: "",
          assigned_to: "",
          title: "",
          description: "",
          status: "pending",
          due_date: "",
        });

        fetchTasks();
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to add task.");
        setSuccess("");
      });
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <p>View and manage project tasks.</p>

      {user && user.role === "company" && (
        <div className="create-task">
          <h2>Create a Task</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="project_id"
              placeholder="Project ID"
              value={newTask.project_id}
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              name="assigned_to"
              placeholder="Freelancer ID"
              value={newTask.assigned_to}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />

            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              name="due_date"
              value={newTask.due_date}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Create Task</button>
          </form>

          {success && <p>{success}</p>}
          {error && <p>{error}</p>}
        </div>
      )}

      {user && user.role === "freelancer" ? (
        <div>
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks assigned to you yet.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.task_id}>
                <h3>Task #{task.task_id}</h3>
                <p>Project ID: {task.project_id}</p>
                <p>Title: {task.title}</p>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>Due Date: {task.due_date}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        !user && <p>Please log in to view your tasks.</p>
      )}
    </div>
  );
}

export default Tasks;
