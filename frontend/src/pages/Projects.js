import { useState, useEffect } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [newProject, setNewProject] = useState({
    company_id: "",
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const fetchProjects = () => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load projects. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/projects", newProject)
      .then((response) => {
        console.log("Project created:", response.data);

        setSuccess("Project created successfully!");
        setError("");

        setNewProject({
          company_id: "",
          title: "",
          description: "",
          category: "",
          budget: "",
          deadline: "",
        });

        fetchProjects();
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to create project. Please try again.");
        setSuccess("");
      });
  };

  return (
    <div className="projects-container">
      <h1>Available Projects</h1>
      <p>Explore projects and find your next opportunity.</p>

      <div className="create-project">
        <h2>Create a New Project</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="company_id"
            placeholder="Company ID"
            value={newProject.company_id}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleInputChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Project Category"
            value={newProject.category}
            onChange={handleInputChange}
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={newProject.budget}
            onChange={handleInputChange}
            required
          />

          <input
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Create Project</button>
        </form>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : error && projects.length === 0 ? (
        <p>{error}</p>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <div className="project-card" key={project.project_id}>
              <h3>{project.title || "Untitled Project"}</h3>
              <p>{project.description}</p>
              <p className="project-budget">Budget: {project.budget}</p>
              <p className="project-status">
                Status: {project.status || "Not specified"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
