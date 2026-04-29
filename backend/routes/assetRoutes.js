const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

router.use(protect);

/**
 * @route   GET /api/assets
 * @desc    Get all assets for the logged-in user
 * @access  Private
 */
router.get('/', asyncHandler(async (req, res) => {
  const assets = await Asset.find({ user: req.user.id }).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: assets.length,
    data: assets
  });
}));

/**
 * @route   POST /api/assets
 * @desc    Create a new asset (simulate upload)
 * @access  Private
 */
router.post('/', asyncHandler(async (req, res) => {
  const { name, type, src, size, dimensions, altText } = req.body;

  const asset = await Asset.create({
    user: req.user.id,
    name,
    type,
    src,
    size,
    dimensions,
    altText
  });

  res.status(201).json({
    success: true,
    data: asset
  });
}));

/**
 * @route   PUT /api/assets/:id
 * @desc    Update asset metadata
 * @access  Private
 */
router.put('/:id', asyncHandler(async (req, res) => {
  let asset = await Asset.findOne({ _id: req.params.id, user: req.user.id });

  if (!asset) {
    throw new AppError('Asset not found or unauthorized', 404);
  }

  if (req.body.user) delete req.body.user;

  asset = await Asset.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: asset
  });
}));

/**
 * @route   DELETE /api/assets/:id
 * @desc    Delete an asset
 * @access  Private
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const asset = await Asset.findOneAndDelete({ _id: req.params.id, user: req.user.id });

  if (!asset) {
    throw new AppError('Asset not found or unauthorized', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Asset deleted successfully'
  });
}));

module.exports = router;
