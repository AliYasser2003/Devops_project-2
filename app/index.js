const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// DB connection using env variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

const connectWithRetry = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to DB ✅");
  } catch (err) {
    console.log("DB not ready, retrying...");
    setTimeout(connectWithRetry, 2000);
  }
};

connectWithRetry();

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Create table (auto-run once)
app.get("/init", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
    res.send("Table created");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Insert user
app.post("/users", async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
    res.send("User added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
