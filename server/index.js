import express from "express";
import cors from "cors";
import pool from "./db/db.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, description, rating } = req.body;
    const result = await pool.query(
      `INSERT INTO books (title, author, description, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, author, description, rating ?? 0],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.patch("/books/:id/rating", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const result = await pool.query(
      `
      UPDATE books
      SET rating = $1
      WHERE id = $2
      RETURNING *
      `,
      [rating, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM books
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted", book: result.rows[0] });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
