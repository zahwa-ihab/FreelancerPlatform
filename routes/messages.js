const express = require("express");
const Message = require("../models/message");
const router = express.Router();
const db = require("../db");

// GET all messages
router.get("/", (req, res) => {
  db.query("SELECT * FROM messages", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// POST add a new message
router.post("/", (req, res) => {
  const data = new Message(
    null,
    req.body.sender_id,
    req.body.receiver_id,
    req.body.project_id,
    req.body.message_content,
  );

  const sql =
    "INSERT INTO messages (sender_id, receiver_id, project_id, message_content) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [data.sender_id, data.receiver_id, data.project_id, data.message_content],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        data.message_id = result.insertId;
        res.json(data.getMessageInfo());
      }
    },
  );
});

// PUT update a message
router.put("/:id", (req, res) => {
  const sql =
    "UPDATE messages SET message_content = ?, is_read = ? WHERE message_id = ?";

  db.query(
    sql,
    [req.body.message_content, req.body.is_read, req.params.id],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send("Message updated successfully!");
      }
    },
  );
});

// DELETE a message
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM messages WHERE message_id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Message deleted successfully!");
    }
  });
});

// SEARCH messages by sender or receiver ID
router.get("/user/:user_id", (req, res) => {
  const sql = "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?";

  db.query(sql, [req.params.user_id, req.params.user_id], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
