const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
});

// Connect to Database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});

// Default Route to Fetch Data
app.get('/', (req, res) => {
  const query = 'SELECT * FROM sensor_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log error
      return res.status(500).json({
        message: 'Database query error',
        error: err.message,
      });
    }
    res.json(results); // Send data as JSON
  });
});

// Start Server Locally (Optional)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app; // Export for Vercel
