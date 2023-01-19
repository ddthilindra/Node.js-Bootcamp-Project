const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/course');

// @desc    Get all courses
// @route   GET /courses
// @route   GET /bootcamps/:bootcampId/courses
// @acess   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    // Get Courses For Bootcamp
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // Get All Courses
    // Get All Courses with get all bootcamp
    // query = Course.find().populate('bootcamp');
    
    // select specific fields
    query = Course.find().populate({
        path:'bootcamp',
        select:'name description'
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
