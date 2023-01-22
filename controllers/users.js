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