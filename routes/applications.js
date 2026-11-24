const express = require("express");
const Application = require("../models/application");
const router = express.Router();
const db = require("../db");

// GET all applications
router.get("/", (req, res) => {
  db.query("SELECT * FROM applications", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// POST add a new application
router.post("/", (req, res) => {
  const data = req.body;

  const sql =
    "INSERT INTO applications (project_id, freelancer_id, proposal, proposed_budget) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [data.project_id, data.freelancer_id, data.proposal, data.proposed_budget],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("Application added successfully!");
      }
    },
  );
});

// PUT update an application
router.put("/:id", (req, res) => {
  const sql =
    "UPDATE applications SET proposal = ?, proposed_budget = ?, status = ? WHERE application_id = ?";

  db.query(
    sql,
    [
      req.body.proposal,
      req.body.proposed_budget,
      req.body.status,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.json("Application updated successfully!");
      }
    },
  );
});

// DELETE an application
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM applications WHERE application_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Application deleted successfully!");
    }
  });
});

// SEARCH applications by freelancer ID
router.get("/search/:freelancer_id", (req, res) => {
  const sql = "SELECT * FROM applications WHERE freelancer_id = ?";

  db.query(sql, [req.params.freelancer_id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
