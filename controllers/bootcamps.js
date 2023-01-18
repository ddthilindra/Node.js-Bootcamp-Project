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
    count: bootcamp.length,
    // msg: `Delete bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});

// @desc    Get all bootcamps with advance filtering
// @route   GET /bootcamps/advfltr?careers[in]=Business
// @acess   Public
exports.getBootcampsAdvFltr = asyncHandler(async (req, res, next) => {
  let query;

  // Create query string
  let queryStr = JSON.stringify(req.query);

  // Create operators ($gt,$gte,etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,(match) => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Execute query
  const bootcamps = await query;

  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Get all bootcamps with select and sorting
// @route   GET /bootcamps/slct/srt?select=name,description&sort=name
// @acess   Public
exports.getBootcampsSelctSrt = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to execute
  // const removeFields=['select']
  const removeFields=['select','sort']

  //Loop over removeFields and delete them from reQuery
  removeFields.forEach(param=>delete reqQuery[param])

  // Create query string
  let queryStr = JSON.stringify(req.query);

  // Create operators ($gt,$gte,etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,(match) => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if(req.query.select){
    const fields=req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // Sort
  if(req.query.sort){
    const sortBy=req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  }else{
    query = query.sort('-createdAt')
  }

  // Execute query
  const bootcamps = await query;

  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Get all bootcamps with select, sorting and pagination
// @route   GET /bootcamps/page/pagination?page=2&limit=2&select=name
// @acess   Public
exports.getBootcampsPagination = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to execute
  // const removeFields=['select']
  const removeFields=['select','sort','page','limit']

  //Loop over removeFields and delete them from reQuery
  removeFields.forEach(param=>delete reqQuery[param])

  // Create query string
  let queryStr = JSON.stringify(req.query);

  // Create operators ($gt,$gte,etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,(match) => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if(req.query.select){
    const fields=req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // Sort
  if(req.query.sort){
    const sortBy=req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  }else{
    query = query.sort('-createdAt')
  }

  // Pagination
  // {{localhost}}/bootcamps/page/pagination?page=2&limit=2&select=name

  const page = parseInt(req.query.page,10) || 1 // page 1 by default
  const limit = parseInt(req.query.limit,10) || 1 // 1 items by default
  const startIndex = (page-1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments() // count all the documnent

  query = query.skip(startIndex).limit(limit)
  
    // Pagination result
    const pagination ={}
  
    if(endIndex < total){
      pagination.next = {
        page: page + 1,
        limit
      }
    }
  
    if(startIndex > 0){
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

  // Execute query
  const bootcamps = await query;

  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});
