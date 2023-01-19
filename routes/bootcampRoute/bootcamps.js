const express=require('express')
const bootcampsController = require('../../controllers/bootcamps')
const router=express.Router()

// Include other resourse routers
const courseRouter=require('../courseRoute/course')
// Re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)

router.get('/',bootcampsController.getBootcamps)
router.post('/',bootcampsController.createBootcamp)
router.get('/:id',bootcampsController.getBootcamp)
router.put('/:id',bootcampsController.updateBootcamp)
router.delete('/:id',bootcampsController.deleteBootcamp)

router.get('/radius/:zipcode/:distance',bootcampsController.getBootcampsInRadius)
// Advanced Filter
router.get('/advfltr',bootcampsController.getBootcampsAdvFltr)
// Advanced Filter
router.get('/slct/srt',bootcampsController.getBootcampsSelctSrt)
// Pagination
router.get('/page/pagination',bootcampsController.getBootcampsPagination)

module.exports=router
