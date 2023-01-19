const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/course');
const Bootcamp = require('../models/bootcamps');

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
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Get single course
// @route   GET /courses/:id
// @acess   Public
exports.getCourseByID = asyncHandler(async (req, res, next) => {
  
    const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name, description',
  });

  if(!course){
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`),404)
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Add course
// @route   POST /bootcamp/:bootcampId/courses
// @acess   Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  
    req.body.bootcamp =req.params.bootcampId
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp){
    return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),404)
  }

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    data: course,
  });
});
