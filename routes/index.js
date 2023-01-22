const express = require('express')
const routes= express.Router()
const bootcampsRoutes= require('./bootcampRoute/bootcamps')
const coursesRoutes= require('./courseRoute/course')
const usersRoutes= require('./userRoute/user')

// Mount routers
routes.use('/bootcamps',bootcampsRoutes)
routes.use('/courses',coursesRoutes)
routes.use('/user',usersRoutes)

module.exports = routes