const express=require('express')
const bootcampsController = require('../../controllers/bootcamps')
const router=express.Router()
const authMiddleware = require('../../middleware/auth')

// Include other resourse routers
const courseRouter=require('../courseRoute/course')
const reviewRouter=require('../reviewRoute/review')
// Re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)
router.use('/:bootcampId/reviews',reviewRouter)

// Advanced filter 'select', 'sort', 'page', 'limit'
const Bootcamp = require('../../models/bootcamps')
const advancedResults = require('../../middleware/advancedResult')

router.get('/',advancedResults(Bootcamp,'courses'),bootcampsController.getBootcamps)
router.post('/', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), bootcampsController.createBootcamp)
router.get('/:id',bootcampsController.getBootcamp)
router.put('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), bootcampsController.updateBootcamp)
router.delete('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), bootcampsController.deleteBootcamp)
router.put('/:id/photo', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), bootcampsController.bootcampPhotoUpload)


router.get('/radius/:zipcode/:distance',bootcampsController.getBootcampsInRadius)

module.exports=router
