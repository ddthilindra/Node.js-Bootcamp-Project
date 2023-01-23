const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Load models
const Bootcamp = require('./models/bootcamps');
const Course = require('./models/course');
const User = require('./models/User');
// const Review = require('./models/Review');

// Read JSON files
const bootcamps = require('./_data/bootcamps.json');
const courses = require('./_data/courses.json');
const users = require('./_data/users.json');
// const reviews = require('./_data/reviews.json');

// Connect to DB
connectDB();

// Script : npm run data:import
const importData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();

    await Bootcamp.insertMany(bootcamps);
    // await Course.insertMany(courses);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

// Script : npm run data:destroy
const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
