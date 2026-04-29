const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock amount is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'Out of Stock'
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Pre-save middleware to automatically update status based on stock
productSchema.pre('save', function(next) {
  if (this.stock === 0) {
    this.status = 'Out of Stock';
  } else if (this.stock <= 10) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
