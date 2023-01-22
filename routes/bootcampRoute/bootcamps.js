const express=require('express')
const bootcampsController = require('../../controllers/bootcamps')
const router=express.Router()
const authMiddleware = require('../../middleware/auth')

// Include other resourse routers
const courseRouter=require('../courseRoute/course')
// Re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)

// Advanced filter 'select', 'sort', 'page', 'limit'
const Bootcamp = require('../../models/bootcamps')
const advancedResults = require('../../middleware/advancedResult')

router.get('/',advancedResults(Bootcamp,'courses'),bootcampsController.getBootcamps)
router.post('/', authMiddleware.protect,bootcampsController.createBootcamp)
router.get('/:id',bootcampsController.getBootcamp)
router.put('/:id', authMiddleware.protect,bootcampsController.updateBootcamp)
router.delete('/:id', authMiddleware.protect,bootcampsController.deleteBootcamp)
router.put('/:id/photo', authMiddleware.protect,bootcampsController.bootcampPhotoUpload)


router.get('/radius/:zipcode/:distance',bootcampsController.getBootcampsInRadius)

module.exports=router
