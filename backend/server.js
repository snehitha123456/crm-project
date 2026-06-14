const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Mock setup)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NexusCRM API is running smoothly.' });
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalCustomers: 2543,
    totalLeads: 1845,
    revenue: 124500,
    conversionRate: 64.2
  });
});

// Database connection & Server start
// MONGODB_URI should be in .env file, we will mock it for now if not present
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexuscrm';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB database.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
  // Fallback for demo: start server anyway if mongo isn't local
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (without DB)`);
  });
});
