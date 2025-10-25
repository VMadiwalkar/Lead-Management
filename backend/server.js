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
              first_name VARCHAR(255) NOT NULL,
              last_name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              company_name VARCHAR(255),
              phone_number VARCHAR(20),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )    `);
    // Table to manage password reset OTPs
    await conn.query(`
            CREATE TABLE IF NOT EXISTS password_resets (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              otp_hash VARCHAR(255) NOT NULL,
              expires_at DATETIME NOT NULL,
              attempts INT DEFAULT 0,
              verified TINYINT(1) DEFAULT 0,
              used TINYINT(1) DEFAULT 0,
              resend_count INT DEFAULT 0,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )`);
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
    const { username, password, first_name, last_name, email, company_name, phone_number } = req.body;

    // Validate input
    if (!username || !password || !first_name || !last_name || !email) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    
    try {
      await conn.query(
        "INSERT INTO users (username, password, first_name, last_name, email, company_name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [username, hashedPassword, first_name, last_name, email, company_name, phone_number]
      );
      console.log("User registered:", username);
      res.status(201).json({ message: "✅ User registered successfully" });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: "❌ Username or email already exists" });
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

// Util: mask an email like j***@d***.com
const maskEmail = (email) => {
  const [name, domain] = email.split("@");
  const maskedName = name.length <= 1 ? "*" : name[0] + "***";
  const domainParts = domain.split(".");
  const maskedDomain = domainParts[0][0] + "***" + "." + domainParts.slice(1).join(".");
  return `${maskedName}@${maskedDomain}`;
};

// Generate 4-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Forgot Password - start flow: create OTP and reset session
app.post("/forgot-password", async (req, res) => {
  try {
    const { email, username } = req.body || {};
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        email ? "SELECT id, email FROM users WHERE email = ?" : "SELECT id, email FROM users WHERE username = ?",
        [email || username]
      );
      if (rows.length === 0) {
        // For security, respond with success message
        return res.json({ message: "If the account exists, an OTP has been sent.", maskedEmail: email ? maskEmail(email) : undefined });
      }

      const user = rows[0];
      const otp = generateOtp();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      const [result] = await conn.query(
        "INSERT INTO password_resets (user_id, otp_hash, expires_at) VALUES (?, ?, ?)",
        [user.id, otpHash, expiresAt]
      );

      // issue a short-lived reset token (no PII)
      const resetToken = jwt.sign({ resetId: result.insertId, userId: user.id }, SECRET_KEY, { expiresIn: "15m" });

      console.log(`🔐 OTP for user ${user.id}: ${otp}`); // Dev only; in real app send via email/SMS

      return res.json({ message: "OTP sent successfully", maskedEmail: maskEmail(user.email), resetToken, expiresIn: 600 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Forgot-password error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { resetToken, otp } = req.body || {};
    if (!resetToken || !otp) return res.status(400).json({ message: "resetToken and otp are required" });

    let payload;
    try {
      payload = jwt.verify(resetToken, SECRET_KEY);
    } catch (e) {
      return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query("SELECT * FROM password_resets WHERE id = ? AND used = 0", [payload.resetId]);
      if (rows.length === 0) return res.status(400).json({ message: "Reset session not found" });
      const session = rows[0];

      if (new Date(session.expires_at) < new Date()) return res.status(400).json({ message: "OTP expired" });
      if (session.attempts >= 5) return res.status(429).json({ message: "Too many attempts" });

      const ok = await bcrypt.compare(otp.toString(), session.otp_hash);
      await conn.query("UPDATE password_resets SET attempts = attempts + 1 WHERE id = ?", [session.id]);
      if (!ok) return res.status(401).json({ message: "Invalid OTP" });

      await conn.query("UPDATE password_resets SET verified = 1 WHERE id = ?", [session.id]);
      return res.json({ verified: true });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Verify-otp error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Resend OTP
app.post("/resend-otp", async (req, res) => {
  try {
    const { resetToken } = req.body || {};
    if (!resetToken) return res.status(400).json({ message: "resetToken is required" });
    let payload;
    try {
      payload = jwt.verify(resetToken, SECRET_KEY);
    } catch (e) {
      return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query("SELECT pr.*, u.email FROM password_resets pr JOIN users u ON pr.user_id = u.id WHERE pr.id = ? AND pr.used = 0", [payload.resetId]);
      if (rows.length === 0) return res.status(400).json({ message: "Reset session not found" });
      const session = rows[0];
      if (session.resend_count >= 3) return res.status(429).json({ message: "Resend limit reached" });

      const otp = generateOtp();
      const otpHash = await bcrypt.hash(otp, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await conn.query("UPDATE password_resets SET otp_hash = ?, expires_at = ?, resend_count = resend_count + 1, attempts = 0, verified = 0 WHERE id = ?", [otpHash, expiresAt, session.id]);

      console.log(`🔁 Resent OTP for user ${session.user_id}: ${otp}`);
      return res.json({ message: "OTP resent", maskedEmail: maskEmail(session.email), expiresIn: 600 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Resend-otp error:", err);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

// Reset Password - finalize flow
app.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, password } = req.body || {};
    if (!resetToken || !password) return res.status(400).json({ message: "resetToken and password are required" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    let payload;
    try {
      payload = jwt.verify(resetToken, SECRET_KEY);
    } catch (e) {
      return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query("SELECT * FROM password_resets WHERE id = ? AND used = 0", [payload.resetId]);
      if (rows.length === 0) return res.status(400).json({ message: "Reset session not found" });
      const session = rows[0];
      if (!session.verified) return res.status(403).json({ message: "OTP not verified" });
      if (new Date(session.expires_at) < new Date()) return res.status(400).json({ message: "OTP expired" });

      const hashed = await bcrypt.hash(password, 10);
      await conn.query("UPDATE users SET password = ? WHERE id = ?", [hashed, session.user_id]);
      await conn.query("UPDATE password_resets SET used = 1 WHERE id = ?", [session.id]);
      return res.json({ message: "Password updated successfully" });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("Reset-password error:", err);
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