require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { LocalStorage } = require('node-localstorage');
const mysql = require('mysql2/promise');

const localStorage = new LocalStorage('./scratch');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

console.log("🚀 Starting backend server...");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "loginApp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("MySQL connection pool created");

// Initialize database and create tables
(async () => {
  const conn = await pool.getConnection();
  try { 
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ MySQL Connected and users table ensured");
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err);
  } finally {
    conn.release();
  }
})();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Routes

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    
    try {
      await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
      console.log("User registered:", username);
      res.status(201).json({ message: "✅ User registered successfully" });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "❌ Username already exists" });
      } else {
        throw err;
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    );

    

    // Store token in localStorage (for development)
    localStorage.setItem('token', token);

    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Protected Dashboard Route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ 
    message: `Welcome to Dashboard, ${req.user.username}`,
    user: req.user
  });
});

// Get user profile (protected)
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.user.id]);
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Logout route (optional - mainly for clearing server-side tokens)
app.post("/logout", verifyToken, (req, res) => {
  // In a more sophisticated setup, you might maintain a blacklist of tokens
  // For now, we'll just return a success message
  res.json({ message: "✅ Logged out successfully" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});