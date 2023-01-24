const express = require('express')
const routes= express.Router()
const bootcampsRoutes= require('./bootcampRoute/bootcamps')
const coursesRoutes= require('./courseRoute/course')
const authRoutes= require('./authRoute/auth')
const userRoutes= require('./userRoute/user')
const reviewRoutes= require('./reviewRoute/review')

// Mount routers
routes.use('/bootcamps',bootcampsRoutes)
routes.use('/courses',coursesRoutes)
routes.use('/auth',authRoutes)
routes.use('/user',userRoutes)
routes.use('/review',reviewRoutes)

module.exports = routes