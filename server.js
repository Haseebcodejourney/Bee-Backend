const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'aiiovdt_bees',
  port: process.env.DB_PORT || 8889,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API Endpoint
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM sensor_data', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results); // Send query results as JSON
  });
});

// Export the app for Vercel
module.exports = app;
