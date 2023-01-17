const express=require('express')
const bootcampsController = require('../../controllers/bootcamps')
const router=express.Router()

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

module.exports=router
