const router=require('express').Router({mergeParams:true})
const courseController = require('../../controllers/course')

// /bootcamps/:bootcampId/courses continue with here
router.get('/',courseController.getCourses)

module.exports = router