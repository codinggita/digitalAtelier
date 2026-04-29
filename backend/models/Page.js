const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Page name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['PUBLISHED', 'DRAFT'],
    default: 'DRAFT'
  },
  views: {
    type: Number,
    default: 0
  },
  elements: {
    type: Array,
    default: []
  },
  seoTitle: {
    type: String,
    trim: true,
    default: ''
  },
  seoDescription: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);
