const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

router.use(protect);

/**
 * @route   GET /api/pages
 * @desc    Get all pages for the logged in user
 * @access  Private
 */
router.get('/', asyncHandler(async (req, res) => {
  const pages = await Page.find({ user: req.user.id }).populate('project', 'name').sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: pages.length,
    data: pages
  });
}));

/**
 * @route   GET /api/pages/project/:projectId
 * @desc    Get all pages for a specific project
 * @access  Private
 */
router.get('/project/:projectId', asyncHandler(async (req, res) => {
  // Verify project ownership
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
  if (!project) {
    throw new AppError('Project not found or unauthorized', 404);
  }

  const pages = await Page.find({ project: req.params.projectId }).sort({ createdAt: 1 });
  
  res.status(200).json({
    success: true,
    count: pages.length,
    data: pages
  });
}));

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Private
 */
router.post('/', asyncHandler(async (req, res) => {
  const { projectId, name, slug, status } = req.body;

  const project = await Project.findOne({ _id: projectId, user: req.user.id });
  if (!project) throw new AppError('Project not found or unauthorized', 404);

  const page = await Page.create({
    user: req.user.id,
    project: projectId,
    name,
    slug,
    status: status || 'DRAFT',
    elements: []
  });

  res.status(201).json({
    success: true,
    data: page
  });
}));

/**
 * @route   PUT /api/pages/:id
 * @desc    Update a page (elements, SEO, status)
 * @access  Private
 */
router.put('/:id', asyncHandler(async (req, res) => {
  let page = await Page.findOne({ _id: req.params.id, user: req.user.id });

  if (!page) {
    throw new AppError('Page not found or unauthorized', 404);
  }

  if (req.body.user) delete req.body.user;
  if (req.body.project) delete req.body.project;

  page = await Page.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: page
  });
}));

/**
 * @route   DELETE /api/pages/:id
 * @desc    Delete a page
 * @access  Private
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const page = await Page.findOneAndDelete({ _id: req.params.id, user: req.user.id });

  if (!page) {
    throw new AppError('Page not found or unauthorized', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Page deleted successfully'
  });
}));

module.exports = router;
