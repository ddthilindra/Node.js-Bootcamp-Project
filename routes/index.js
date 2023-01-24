const express = require('express')
const routes= express.Router()
const bootcampsRoutes= require('./bootcampRoute/bootcamps')
const coursesRoutes= require('./courseRoute/course')
const authRoutes= require('./authRoute/auth')

// Mount routers
routes.use('/bootcamps',bootcampsRoutes)
routes.use('/courses',coursesRoutes)
routes.use('/auth',authRoutes)

module.exports = routes