const express = require('express')
const routes= express.Router()
const bootcampsRoutes= require('./bootcampRoute/bootcamps')

// Mount routers
routes.use('/bootcamps',bootcampsRoutes)

module.exports = routes