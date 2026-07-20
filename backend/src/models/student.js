const mongoose = require('mongoose');

// student schema
const studentSchema = new mongoose.Schema({
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
    default: Date.now,
    timestamps: true
  }
});

// model
module.exports = mongoose.model('Students', studentSchema);