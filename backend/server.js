require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const Product = require('./models/Product');
const seedProducts = require('./data/seedData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB & Auto-seed if empty
connectDB().then(async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Database empty. Auto-seeding initial products...');
      await Product.insertMany(seedProducts);
      console.log('Initial seed products added successfully!');
    }
  } catch (err) {
    console.error('Error during auto-seeding check:', err.message);
  }
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Optional Manual Seed Endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(seedProducts);
    res.status(201).json({ message: 'Database re-seeded successfully', count: inserted.length, data: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error seeding database', error: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Shoppu Backend API (TP1 Week 6)',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProductById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id',
      reseedDatabase: 'POST /api/seed',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      getMe: 'GET /api/auth/me (requires Bearer token)'
    }
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
