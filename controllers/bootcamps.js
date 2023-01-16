// @desc    Get all bootcamps
// @route   GET /bootcamps
// @acess   Public
exports.getBootcamps=(req,res)=>{
    res.status(200).json({success:true,msg:'Show all bootcamps'})
}

// @desc    Get single bootcamp
// @route   GET /bootcamps/:id
// @acess   Public
exports.getBootcamp=(req,res)=>{
    res.status(200).json({success:true,msg:`Show single bootcamp ${req.params.id}`})
}

// @desc    Create new bootcamp
// @route   POST /bootcamps
// @acess   Private
exports.createBootcamp=(req,res)=>{
    res.status(200).json({success:true,msg:'Create bootcamp'})
}

// @desc    Update new bootcamp
// @route   PUT /bootcamps/:id
// @acess   Private
exports.updateBootcamp=(req,res)=>{
    res.status(200).json({success:true,msg:`Update bootcamp ${req.params.id}`})
}

// @desc    Delete new bootcamp
// @route   DELETE /bootcamps/:id
// @acess   Private
exports.deleteBootcamp=(req,res)=>{
    res.status(200).json({success:true,msg:`Delete bootcamp ${req.params.id}`})
}