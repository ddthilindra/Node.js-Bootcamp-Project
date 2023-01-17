const Bootcamp = require('../models/bootcamps');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

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

// @desc    Get bootcamps within a radius
// @route   GET /bootcamps/radius/:zipcode/:distance
// @acess   Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lag from geocoder
  const lac = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Devide dist by radius of Earth
  // Earth Radius = 3,963 / 6,378
  const radius = distance / 3963;

  const bootcamp = await Bootcamp.find({
    location: { $geoWithin: { $centerShape: [[lng, lat], radius] } },
  });
  // if (!bootcamp) {
  //   return next(
  //     new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  //   );
  // }
  res.status(200).json({
    success: true,
    count:bootcamp.length,
    // msg: `Delete bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});
