const mongoose = require('mongoose');

// schema
const courseSchema = new mongoose.Schema({
  
  // course title
  courseTitle: {
    type: String,
    required: true
  },

  // course code
  courseCode: {
    type: String,
    required: true
  },

  // subject area
  courseSubject: [String],

  // course credit hours
  courseCredit: {
    type: Number,
    required: true
  },

  // course description
  courseDescription: String,

  // created date
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true 
  }  
});

const Course = mongoose.model('Courses', courseSchema);

// course model
module.exports = { Course, courseSchema }
