const express=require('express')
const bootcampsController = require('../../controllers/bootcamps')
const router=express.Router()

// Include other resourse routers
const courseRouter=require('../courseRoute/course')
// Re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)

// Advanced filter 'select', 'sort', 'page', 'limit'
const Bootcamp = require('../../models/bootcamps')
const advancedResults = require('../../middleware/advancedResult')

router.get('/',advancedResults(Bootcamp,'courses'),bootcampsController.getBootcamps)
router.post('/',bootcampsController.createBootcamp)
router.get('/:id',bootcampsController.getBootcamp)
router.put('/:id',bootcampsController.updateBootcamp)
router.delete('/:id',bootcampsController.deleteBootcamp)
router.put('/:id/photo',bootcampsController.bootcampPhotoUpload)


router.get('/radius/:zipcode/:distance',bootcampsController.getBootcampsInRadius)

module.exports=router
