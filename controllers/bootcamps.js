const Bootcamp = require('../models/bootcamps');

// @desc    Get all bootcamps
// @route   GET /bootcamps
// @acess   Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, msg: 'Show all bootcamps', count:bootcamps.length, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc    Get single bootcamp
// @route   GET /bootcamps/:id
// @acess   Public
exports.getBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      res.status(400).json({ succes: false, msg: 'Invalid id' });
    }
    res.status(200).json({
      success: true,
      msg: `Show single bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc    Create new bootcamp
// @route   POST /bootcamps
// @acess   Private
exports.createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res
      .status(201)
      .json({ success: true, msg: 'Create bootcamp', data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc    Update new bootcamp
// @route   PUT /bootcamps/:id
// @acess   Private
exports.updateBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      res.status(400).json({ succes: false, msg: 'Invalid id' });
    }
    res
      .status(200)
      .json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`,
        data: bootcamp,
      });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc    Delete new bootcamp
// @route   DELETE /bootcamps/:id
// @acess   Private
exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      res.status(400).json({ succes: false, msg: 'Invalid id' });
    }
    res
      .status(200)
      .json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`,
        data: bootcamp,
      });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
