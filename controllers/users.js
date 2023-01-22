const User = require('../models/user');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /auth/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    success: true,
  });
});
