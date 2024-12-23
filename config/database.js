const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'aiiovdt_bees',
  port: process.env.DB_PORT || 8889,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});

// API Route
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM sensor_data';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Query Error', error: err.message });
    }
    res.json(results);
  });
});

// Start Server (Only for local testing)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app; // Export for Vercel
