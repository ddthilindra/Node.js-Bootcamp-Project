const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /auth/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  // Create token
  const token = user.getSignedJwtToken();
  res.status(201).json({
    success: true,
    token: token,
    data: user,
  });
});

// @desc    Login user
// @route   POST /user/login
// @acess   Public
exports.login = asyncHandler(async (req, res, next) => {
  
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({
    success: true,
    token: token,
    data: user,
  });
});
