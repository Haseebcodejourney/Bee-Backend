const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'aiiovdt_bees',
  port: process.env.DB_PORT || 8889,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
  }
});

// Default Route - Show Data
app.get('/', (req, res) => {
  const query = 'SELECT * FROM sensor_data'; // Replace 'sensor_data' with your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database query error', error: err.message });
    }
    res.json(results); // Show data directly at root URL
  });
});

// Start Server (for local testing)
const PORT = process.env.PORT || 5002;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel Deployment
module.exports = app;
