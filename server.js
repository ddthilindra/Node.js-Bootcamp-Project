const express = require('express');
const dotenv = require('dotenv');
const indexRoutes= require('./routes/index')

// Load env
dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send('API is running..!')
})

app.use('/',indexRoutes)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
