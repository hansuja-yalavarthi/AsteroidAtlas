const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const bodyParser = require("body-parser");

// Initialize database
const db = new sqlite3.Database("asteroid_forum.db");

app.use(express.static("public"));
app.use(bodyParser.json());

// Create table if not exists
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      tags TEXT,
      timestamp TEXT,
      upvotes INTEGER DEFAULT 0
    )`
  );
});

// Get all posts
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Add a new post
app.post("/posts", (req, res) => {
  const { title, description, tags } = req.body;
  const timestamp = new Date().toISOString();
  db.run(
    `INSERT INTO posts (title, description, tags, timestamp) VALUES (?, ?, ?, ?)`,
    [title, description, tags, timestamp],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

// Upvote a post
app.post("/posts/:id/upvote", (req, res) => {
  const { id } = req.params;
  db.run(
    `UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?`,
    [id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(200);
    }
  );
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is live on port " + listener.address().port);
});
