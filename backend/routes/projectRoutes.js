const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// Protect all project routes
router.use(protect);

/**
 * @route   GET /api/projects
 * @desc    Get all projects belonging to the logged-in user
 * @access  Private
 */
router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
}));

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID (must belong to user)
 * @access  Private
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user.id
  });
  
  if (!project) {
    throw new AppError('Project not found or you do not have permission to view it', 404);
  }

  res.status(200).json({
    success: true,
    data: project
  });
}));

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post('/', asyncHandler(async (req, res) => {
  const { name, description, thumbnail } = req.body;

  // Create project associated with the logged-in user
  const project = await Project.create({
    user: req.user.id,
    name,
    description,
    thumbnail,
    elements: [], // Initial empty canvas
    status: 'Draft'
  });

  res.status(201).json({
    success: true,
    data: project
  });
}));

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project (must belong to user)
 * @access  Private
 */
router.put('/:id', asyncHandler(async (req, res) => {
  // First ensure project exists and belongs to user
  let project = await Project.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!project) {
    throw new AppError('Project not found or you do not have permission to modify it', 404);
  }

  // Prevent user from changing the project owner
  if (req.body.user) {
    delete req.body.user;
  }

  project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: project
  });
}));

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project (must belong to user)
 * @access  Private
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!project) {
    throw new AppError('Project not found or you do not have permission to delete it', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
}));

module.exports = router;
