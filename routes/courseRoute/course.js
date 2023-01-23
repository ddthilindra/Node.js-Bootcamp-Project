const router=require('express').Router({mergeParams:true})
const courseController = require('../../controllers/course')
const authMiddleware = require('../../middleware/auth')

// Advanced filter 'select', 'sort', 'page', 'limit'
const Course = require('../../models/course')
const advancedResults = require('../../middleware/advancedResult')

// /bootcamps/:bootcampId/courses continue with here
router.get('/',advancedResults(Course,{path:'bootcamp',select:'name description'}),courseController.getCourses)
router.post('/', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), courseController.addCourse)

router.get('/:id',courseController.getCourseByID)
router.put('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), courseController.updateCourse)
router.delete('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), courseController.deleteCourse)

module.exports = router