const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch projects',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch project',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, description, thumbnail } = req.body;

    const project = await Project.create({
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation Error: Could not create project',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project (e.g. from the editor)
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Update Error: Could not update project',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete Error: Could not delete project',
      error: error.message
    });
  }
});

module.exports = router;
