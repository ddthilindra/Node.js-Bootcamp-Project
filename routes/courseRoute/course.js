const router=require('express').Router({mergeParams:true})
const courseController = require('../../controllers/course')

// /bootcamps/:bootcampId/courses continue with here
router.get('/',courseController.getCourses)
router.post('/',courseController.addCourse)

router.get('/:id',courseController.getCourseByID)
router.put('/:id',courseController.updateCourse)
router.delete('/:id',courseController.deleteCourse)

module.exports = router