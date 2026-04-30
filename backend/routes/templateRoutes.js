const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/templates
 * @desc    Get all available system templates
 * @access  Private
 */
router.get('/', protect, asyncHandler(async (req, res) => {
  const templates = [
    {
      id: 'tpl-1',
      name: 'Minimalist Muse',
      category: 'PREMIUM',
      description: 'An editorial-first canvas optimized for high-end fashion portfolios and boutiques.',
      image: 'https://images.unsplash.com/photo-1528151122822-4416dbf0e4b8?q=80&w=600&auto=format&fit=crop',
      elements: [] // Empty array for now, but would contain pre-built JSON structure
    },
    {
      id: 'tpl-2',
      name: 'Digital Noir',
      category: 'POPULAR',
      description: 'A high-contrast, dark-mode focused layout designed for SaaS startups.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      elements: []
    },
    {
      id: 'tpl-3',
      name: 'Terra Living',
      category: 'STANDARD',
      description: 'Earthy tones and organic shapes for wellness brands and eco-friendly shops.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop',
      elements: []
    },
    {
      id: 'tpl-4',
      name: 'Vanguard Grid',
      category: 'PREMIUM',
      description: 'Bold typography and asymmetrical grids for artists and musicians.',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
      elements: []
    },
    {
      id: 'tpl-5',
      name: 'Lumina Studio',
      category: 'POPULAR',
      description: 'A versatile, multi-purpose layout designed to handle large amounts of content.',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop',
      elements: []
    }
  ];

  res.status(200).json({
    success: true,
    data: templates
  });
}));

module.exports = router;
