const express = require('express')
const routes= express.Router()
const bootcampsRoutes= require('./bootcampRoute/bootcamps')
const coursesRoutes= require('./courseRoute/course')

// Mount routers
routes.use('/bootcamps',bootcampsRoutes)
routes.use('/courses',coursesRoutes)

module.exports = routes