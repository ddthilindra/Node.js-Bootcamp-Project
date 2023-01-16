const Bootcamp = require('../models/bootcamps');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all bootcamps
// @route   GET /bootcamps
// @acess   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Get single bootcamp
// @route   GET /bootcamps/:id
// @acess   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Show single bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});

// @desc    Create new bootcamp
// @route   POST /bootcamps
// @acess   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res
    .status(201)
    .json({ success: true, msg: 'Create bootcamp', data: bootcamp });
});

// @desc    Update new bootcamp
// @route   PUT /bootcamps/:id
// @acess   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});

// @desc    Delete new bootcamp
// @route   DELETE /bootcamps/:id
// @acess   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});
