const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/review');

// @desc    Get all reviews
// @route   GET /reviews
// @route   GET /bootcamps/:bootcampId/reviews
// @acess   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    // Get review For Bootcamp
    const reviews = Review.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    // select specific fields
    res.status(200).json(res.advancedResults);
  }
});
