const router=require('express').Router({mergeParams:true})
const userController= require('../../controllers/user')
const authMiddleware = require('../../middleware/auth')
const advancedResults = require('../../middleware/advancedResult')
const User = require('../../models/user')

// Anything below the use() use auth Middleware (protect ,authMiddleware) 
router.use(authMiddleware.protect)
router.use(authMiddleware.authorize('admin'))
 
router.get('/', advancedResults(User),userController.getUsers)
router.post('/', userController.createUser)
router.get('/:id',userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports =router