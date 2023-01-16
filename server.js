const express = require('express');
const dotenv = require('dotenv');
const indexRoutes= require('./routes/index')
const logger=require('./middleware/logger')
const morgan = require('morgan')

// Load env
dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send('API is running..!')
})

// app.use(logger)
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/',indexRoutes)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
