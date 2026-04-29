const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// Protect all product routes
router.use(protect);

/**
 * @route   GET /api/products
 * @desc    Get all products belonging to the logged-in user
 * @access  Private
 */
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
}));

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private
 */
router.post('/', asyncHandler(async (req, res) => {
  const { name, description, price, stock, image } = req.body;

  const product = await Product.create({
    user: req.user.id,
    name,
    description,
    price,
    stock,
    image
  });

  res.status(201).json({
    success: true,
    data: product
  });
}));

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private
 */
router.put('/:id', asyncHandler(async (req, res) => {
  let product = await Product.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!product) {
    throw new AppError('Product not found or unauthorized', 404);
  }

  // Prevent changing owner
  if (req.body.user) delete req.body.user;

  // We use save() instead of findByIdAndUpdate so pre-save hooks run (for status calc)
  Object.assign(product, req.body);
  await product.save();

  res.status(200).json({
    success: true,
    data: product
  });
}));

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!product) {
    throw new AppError('Product not found or unauthorized', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
}));

module.exports = router;
