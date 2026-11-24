const express = require("express");
const Project = require("../models/project");
const router = express.Router();
const db = require("../db");

// GET all projects
router.get("/", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// POST add a new project
router.post("/", (req, res) => {
  const data = new Project(
    null,
    req.body.company_id,
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.budget,
    req.body.deadline,
  );

  const sql =
    "INSERT INTO projects (company_id, title, description, category, budget, deadline) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      data.company_id,
      data.title,
      data.description,
      data.category,
      data.budget,
      data.deadline,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        data.project_id = result.insertId; //result.insertId: Gets the new project's ID from DB then data.project_id: Stores that ID in our Project object.
        res.json(data.getProjectInfo());
      }
    },
  );
});

// PUT update a project
router.put("/:id", (req, res) => {
  const sql =
    "UPDATE projects SET title = ?, description = ?, budget = ?, deadline = ? , status = ? WHERE project_id = ?";

  db.query(
    sql,
    [
      req.body.title,
      req.body.description,
      req.body.budget,
      req.body.deadline,
      req.body.status,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("Project updated successfully!");
      }
    },
  );
});

// DELETE a project
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM projects WHERE project_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Project deleted successfully!");
    }
  });
});

// SEARCH projects by title
router.get("/search/:title", (req, res) => {
  const sql = "SELECT * FROM projects WHERE title LIKE ?";

  db.query(sql, ["%" + req.params.title + "%"], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
