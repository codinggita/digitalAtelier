const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Digital Atelier Backend is running! 🚀');
});

// Routes
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const pageRoutes = require('./routes/pageRoutes');
const assetRoutes = require('./routes/assetRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const templateRoutes = require('./routes/templateRoutes');

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/templates', templateRoutes);

// Global Error Handler Middleware (must be at the end)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
