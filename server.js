const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to fetch data from the database
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM sensor_data';  // Make sure this query is correct

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);  // Log the error to the console
      return res.status(500).json({ message: 'Database query error', error: err.message });  // Send error as JSON
    }
    console.log('Fetched data:', results);  // Log the fetched data
    res.json(results);  // Return data as JSON
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
