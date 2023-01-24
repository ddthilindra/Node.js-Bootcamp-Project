const express = require('express');
const router = express.Router();
const userController= require('../../controllers/users')
const authMiddleware = require('../../middleware/auth')
 
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/me', authMiddleware.protect, userController.getMe)
router.post('/forgotpassword', userController.forgotPassword)

module.exports =router