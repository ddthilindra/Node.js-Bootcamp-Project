const express = require('express');
const router = express.Router();
const userController= require('../../controllers/auth')
const authMiddleware = require('../../middleware/auth')
 
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/me', authMiddleware.protect, userController.getMe)
router.put('/updatedetails', authMiddleware.protect, userController.updateDetails)
router.put('/updatepassword', authMiddleware.protect, userController.updatePassword)
router.post('/forgotpassword', userController.forgotPassword)
router.put('/resetpassword/:resettoken', userController.resetPassword)

module.exports =router