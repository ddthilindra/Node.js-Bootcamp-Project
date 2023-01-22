const router=require('express').Router({mergeParams:true})
const courseController = require('../../controllers/course')

// Advanced filter 'select', 'sort', 'page', 'limit'
const Course = require('../../models/course')
const advancedResults = require('../../middleware/advancedResult')

// /bootcamps/:bootcampId/courses continue with here
router.get('/',advancedResults(Course,{path:'bootcamp',select:'name description'}),courseController.getCourses)
router.post('/',courseController.addCourse)

router.get('/:id',courseController.getCourseByID)
router.put('/:id',courseController.updateCourse)
router.delete('/:id',courseController.deleteCourse)

module.exports = router