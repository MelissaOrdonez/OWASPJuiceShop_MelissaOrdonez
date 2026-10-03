const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const Database = require("better-sqlite3");

const db = new Database("users.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
    )
`).run();

db.prepare(`
    INSERT OR IGNORE INTO users (email, password, role)
    VALUES (?, ?, ?)
`).run("admin@example.com", "Admin123!", "admin");

db.prepare(`
    INSERT OR IGNORE INTO users (email, password, role)
    VALUES (?, ?, ?)
`).run("alice@example.com", "Alice123!", "user");

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: "Email and password are required"
        });
    }

    if (!email.includes("@") || email.length < 8) {
        return res.json({
            message: "Invalid email"
        });
    }

    const user = db.prepare(`
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `).get(email, password);

    if (!user) {
        return res.json({ message: "Invalid user" });
    }

    res.json({
        role: user.role
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
