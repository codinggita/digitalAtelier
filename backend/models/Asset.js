const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Asset name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['IMAGE', 'VIDEO', 'DOC'],
    required: true
  },
  src: {
    type: String,
    required: [true, 'Asset source URL is required']
  },
  size: {
    type: String,
    default: 'Unknown'
  },
  dimensions: {
    type: String,
    default: 'N/A'
  },
  altText: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema);
