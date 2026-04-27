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

// Basic Route
app.get('/', (req, res) => {
  res.send('Digital Atelier Backend is running! 🚀');
});

// MongoDB Connection (Placeholder - needs your URI in .env)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-atelier';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
