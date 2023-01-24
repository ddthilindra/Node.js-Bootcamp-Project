const express = require('express');
const router = express.Router();
const authController= require('../../controllers/auth')
const authMiddleware = require('../../middleware/auth')
 
router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/logout', authController.logout)
router.get('/me', authMiddleware.protect, authController.getMe)
router.put('/updatedetails', authMiddleware.protect, authController.updateDetails)
router.put('/updatepassword', authMiddleware.protect, authController.updatePassword)
router.post('/forgotpassword', authController.forgotPassword)
router.put('/resetpassword/:resettoken', authController.resetPassword)

module.exports =router