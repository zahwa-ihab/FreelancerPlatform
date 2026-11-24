const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const db = require("../db");

// GET all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// POST add a new task
router.post("/", (req, res) => {
  const data = new Task(
    null,
    req.body.project_id,
    req.body.assigned_to,
    req.body.title,
    req.body.description,
    req.body.status,
    req.body.due_date,
  );

  const sql =
    "INSERT INTO tasks (project_id, assigned_to, title, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      data.project_id,
      data.assigned_to,
      data.title,
      data.description,
      data.status,
      data.due_date,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("Task added successfully!");
      }
    },
  );
});

// PUT update a task
router.put("/:id", (req, res) => {
  const sql =
    "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE task_id = ?";

  db.query(
    sql,
    [
      req.body.title,
      req.body.description,
      req.body.status,
      req.body.due_date,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        data.task_id = result.insertId;
        res.json(data.getTaskInfo());
      }
    },
  );
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM tasks WHERE task_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Task deleted successfully!");
    }
  });
});

// SEARCH tasks by freelancer ID
router.get("/search/:freelancer_id", (req, res) => {
  const sql = "SELECT * FROM tasks WHERE assigned_to = ?";

  db.query(sql, [req.params.freelancer_id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
