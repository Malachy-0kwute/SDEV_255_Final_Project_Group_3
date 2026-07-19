const mongoose = require('mongoose');

// teacher schema
const teacherSchema = new mongoose.Schema({
  // firstname
  firstName: {
    type: String,
    require: true
  },

  // lastname
  lastName: {
    type: String,
    require: true
  },

  // email
  email: {
    type: String,
    require: true
  },

  // password
  password: {
    type: String,
    require: true
  },

    // created date
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// model
module.exports = mongoose.model('Teachers', teacherSchema);