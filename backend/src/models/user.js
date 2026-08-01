const mongoose = require('mongoose');
const { Course } = require('./course');

// user schema
const userSchema = new mongoose.Schema({
  
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

  // true is user is a student... otherwise false
  isStudent: { 
    type: Boolean,
    default: false
  },

  // courses for students registered for.
  courses: [Course.schema],

    // created date
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true
  }
});

// model
module.exports = mongoose.model('Users', userSchema);