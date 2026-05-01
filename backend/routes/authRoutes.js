const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

// JWT Secret and Expiry configuration
const JWT_SECRET = process.env.JWT_SECRET || 'digital-atelier-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a signed JWT token for a user
 * @param {string} id - User's MongoDB ObjectId
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Send token response with user data
 * Sets the token in response and returns user info
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  // Remove password from output
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse
  });
};

// ═══════════════════════════════════════════════════════════════
//  POST /api/auth/register — Create a new user account
// ═══════════════════════════════════════════════════════════════
router.post('/register', asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, shopName } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Please provide first name, last name, email, and password.', 400);
  }

  // Check password strength
  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters long.', 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError('An account with this email already exists. Please log in instead.', 409);
  }

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
    shopName: shopName || ''
  });

  // Update last login timestamp
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 201, res);
}));

// ═══════════════════════════════════════════════════════════════
//  POST /api/auth/login — Authenticate user OR Auto-Register (Demo Mode)
// ═══════════════════════════════════════════════════════════════
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new AppError('Please provide both email and password.', 400);
  }

  // Find user and explicitly include the password field
  let user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  // --- DEMO MODE: Auto-register if user doesn't exist ---
  if (!user) {
    console.log(`💡 Demo Mode: Auto-registering new user ${email}`);
    user = await User.create({
      firstName: email.split('@')[0], // Use part of email as name
      lastName: 'User',
      email: email.toLowerCase(),
      password: password,
      shopName: 'My New Atelier'
    });
  } else {
    // If user exists, verify password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new AppError('Invalid password for this existing account.', 401);
    }
  }

  // Update last login timestamp
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
}));

// ═══════════════════════════════════════════════════════════════
//  GET /api/auth/me — Get current logged-in user's profile
//  Protected route — requires valid JWT
// ═══════════════════════════════════════════════════════════════
router.get('/me', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  res.status(200).json({
    success: true,
    user
  });
}));

// ═══════════════════════════════════════════════════════════════
//  PUT /api/auth/me — Update current user's profile
//  Protected route — requires valid JWT
// ═══════════════════════════════════════════════════════════════
router.put('/me', protect, asyncHandler(async (req, res) => {
  // Fields that are allowed to be updated via this route
  const allowedFields = [
    'firstName', 'lastName', 'shopName', 'phone',
    'bio', 'location', 'avatar', 'preferences'
  ];

  // Build update object with only allowed fields
  const updateData = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      updateData[key] = req.body[key];
    }
  });

  // Prevent empty updates
  if (Object.keys(updateData).length === 0) {
    throw new AppError('No valid fields provided for update.', 400);
  }

  const user = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,           // Return the updated document
    runValidators: true  // Run schema validators on update
  });

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    user
  });
}));

// ═══════════════════════════════════════════════════════════════
//  PUT /api/auth/change-password — Change user's password
//  Protected route — requires valid JWT
// ═══════════════════════════════════════════════════════════════
router.put('/change-password', protect, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword) {
    throw new AppError('Please provide both current password and new password.', 400);
  }

  if (newPassword.length < 6) {
    throw new AppError('New password must be at least 6 characters long.', 400);
  }

  if (currentPassword === newPassword) {
    throw new AppError('New password must be different from current password.', 400);
  }

  // Get user with password field
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  // Verify current password
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    throw new AppError('Current password is incorrect.', 401);
  }

  // Update password (pre-save hook will hash it)
  user.password = newPassword;
  await user.save();

  // Generate new token since password changed
  sendTokenResponse(user, 200, res);
}));

// ═══════════════════════════════════════════════════════════════
//  DELETE /api/auth/me — Delete current user's account
//  Protected route — requires valid JWT
// ═══════════════════════════════════════════════════════════════
router.delete('/me', protect, asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Account has been permanently deleted.',
    data: null
  });
}));

// ═══════════════════════════════════════════════════════════════
//  POST /api/auth/verify-token — Verify if a JWT token is valid
//  Used by frontend to check token validity on app load
// ═══════════════════════════════════════════════════════════════
router.post('/verify-token', asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError('No token provided.', 400);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('Token is valid but user no longer exists.', 401);
    }

    if (user.changedPasswordAfter(decoded.iat)) {
      throw new AppError('Password was changed. Token is no longer valid.', 401);
    }

    res.status(200).json({
      success: true,
      valid: true,
      user
    });
  } catch (error) {
    if (error.isOperational) throw error;
    
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Token is invalid or expired.'
    });
  }
}));

module.exports = router;
