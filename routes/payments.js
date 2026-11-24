const express = require("express");
const Payment = require("../models/payment");
const router = express.Router();
const db = require("../db");

// GET all payments
router.get("/", (req, res) => {
  db.query("SELECT * FROM payments", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// POST add a new payment
router.post("/", (req, res) => {
  const data = new Payment(
    null,
    req.body.project_id,
    req.body.company_id,
    req.body.freelancer_id,
    req.body.amount,
    req.body.payment_method,
    req.body.payment_status,
  );

  const sql =
    "INSERT INTO payments (project_id, company_id, freelancer_id, amount, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      data.project_id,
      data.company_id,
      data.freelancer_id,
      data.amount,
      data.payment_method,
      data.payment_status,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        data.payment_id = result.insertId;
        res.json(data.getPaymentInfo());
      }
    },
  );
});

// PUT update a payment
router.put("/:id", (req, res) => {
  const sql =
    "UPDATE payments SET amount = ?, payment_method = ?, payment_status = ? WHERE payment_id = ?";

  db.query(
    sql,
    [
      req.body.amount,
      req.body.payment_method,
      req.body.payment_status,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("Payment updated successfully!");
      }
    },
  );
});

// DELETE a payment
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM payments WHERE payment_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Payment deleted successfully!");
    }
  });
});

// SEARCH payments by freelancer ID
router.get("/search/:freelancer_id", (req, res) => {
  const sql = "SELECT * FROM payments WHERE freelancer_id = ?";

  db.query(sql, [req.params.freelancer_id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
