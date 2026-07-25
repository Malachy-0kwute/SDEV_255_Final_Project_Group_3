const mongoose = require('mongoose');

// const DB_URI = 'mongodb://localhost:27017/application_db';
const DB_URI = 'mongodb+srv://sdev255:sdev255@cluster0.brgvopn.mongodb.net/sdev255_db?appName=Cluster0';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log(`Connected to database...`);
  } catch(error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

module.exports = connectDB;