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
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

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

// @desc    Get single review
// @route   GET /review/:id
// @acess   Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
    
  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`,404),
    );
  }

  res.status(200).json({
    success: true,
    count: review.length,
    data: review,
  });
});
