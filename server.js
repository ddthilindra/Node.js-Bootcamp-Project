const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const indexRoutes = require('./routes/index');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');

// Load env vars
dotenv.config();
// Connect to database
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running..!');
});

// Body parser
app.use(express.json());

// app.use(logger)
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/', indexRoutes);

// Handle the 500 html error with json
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
