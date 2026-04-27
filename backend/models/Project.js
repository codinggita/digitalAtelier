const mongoose = require('mongoose');

/**
 * Project Schema for Digital Atelier
 * This model stores all the metadata and content for a user's project.
 */
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: 'No description provided',
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'
  },
  // This stores the array of blocks/elements from the Site Editor
  elements: {
    type: Array,
    default: []
  },
  // Design system settings specific to this project
  settings: {
    primaryColor: { type: String, default: '#4338ca' },
    fontFamily: { type: String, default: 'Inter' },
    borderRadius: { type: String, default: '8px' }
  },
  status: {
    type: String,
    enum: ['Draft', 'Live', 'Archived'],
    default: 'Draft'
  },
  domain: {
    type: String,
    unique: true,
    sparse: true // Allows multiple nulls for domain
  },
  lastPublishedAt: {
    type: Date
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Virtual for formatted date
projectSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
});

// Indexing for faster searches
projectSchema.index({ name: 'text' });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
