import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

function Applications() {
  const { user } = useContext(UserContext);

  const [applications, setApplications] = useState([]);

  const [newApplication, setNewApplication] = useState({
    project_id: "",
    proposal: "",
    proposed_budget: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get all applications
  const fetchApplications = () => {
    axios
      .get("http://localhost:8080/applications")
      .then((response) => {
        setApplications(response.data); //postman response gets saved here
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load applications.");
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewApplication({
      ...newApplication,
      [name]: value,
    });
  };

  // Submit a new application
  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      ...newApplication,
      freelancer_id: user.user_id,
    };

    axios
      .post("http://localhost:8080/applications", applicationData)
      .then((response) => {
        setSuccess("Application submitted successfully!");
        setError("");

        setNewApplication({
          project_id: "",
          proposal: "",
          proposed_budget: "",
        });

        fetchApplications();
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to submit application.");
        setSuccess("");
      });
  };

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      <p>View and submit project applications.</p>

      {user && user.role === "freelancer" ? (
        <div className="create-application">
          <h2>Apply for a Project</h2>
          {console.log("freeeeeeeeeeeeeeeee")}
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="project_id"
              placeholder="Project ID"
              value={newApplication.project_id}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="proposal"
              placeholder="Write your proposal"
              value={newApplication.proposal}
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              name="proposed_budget"
              placeholder="Your Proposed Budget"
              value={newApplication.proposed_budget}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Submit Application</button>
          </form>

          {success && <p>{success}</p>}
          {error && <p>{error}</p>}
        </div>
      ) : (
        <p>Please log in as a freelancer to submit an application.</p>
      )}

      <h2>All Applications</h2>

      <div className="applications-list">
        {applications.map((application) => (
          <div className="application-card" key={application.application_id}>
            <h3>Application #{application.application_id}</h3>

            <p>Project ID: {application.project_id}</p>
            <p>Freelancer ID: {application.freelancer_id}</p>
            <p>Proposal: {application.proposal}</p>
            <p>Proposed Budget: {application.proposed_budget}</p>
            <p>Status: {application.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
