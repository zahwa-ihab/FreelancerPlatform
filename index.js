const express = require("express"); //Imports Express 1
const cors = require("cors");
const app = express(); //Creates our server application 2

//userRoutes stores the routes we exported using module.exports = router
const userRoutes = require("./routes/users"); //->./routes/users tells Node.js to open the users.js file inside the routes folder.
const projectRoutes = require("./routes/projects");
const applicationRoutes = require("./routes/applications");
const taskRoutes = require("./routes/tasks");
const messageRoutes = require("./routes/messages");
const paymentRoutes = require("./routes/payments");

app.use(express.json()); //It allows our backend to understand JSON data sent by the user or another application. 3
app.use(cors());
//It tells Express: whenever a request starts with /users, use the routes inside users.js
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/applications", applicationRoutes);
app.use("/tasks", taskRoutes);
app.use("/messages", messageRoutes);
app.use("/payments", paymentRoutes);

// We'll need it later when creating and updating records.4
const PORT = 8080; //Selects the port

//Starts listening for requests 5
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
