const express = require('express');
const dotenv = require('dotenv');
const indexRoutes= require('./routes/index')
const logger=require('./middleware/logger')
const morgan = require('morgan')
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();
// Connect to database
connectDB()
const app = express();

app.get('/',(req,res)=>{
    res.send('API is running..!')
})

// Body parser
app.use(express.json())

// app.use(logger)
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/',indexRoutes)

// Handle the 500 html error with json
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
