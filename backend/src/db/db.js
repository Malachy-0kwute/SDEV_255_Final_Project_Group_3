const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/application_db';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log(`database connected: ${db.connection.host}`);
  } catch(error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

module.exports = connectDB;