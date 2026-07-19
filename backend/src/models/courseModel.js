const mongoose = require('mongoose');

// schema
const courseSchema = new mongoose.Schema({
  // course code
  courseCode: {
    type: String,
    required: true
  },

  // course title
  courseTitle: {
    type: String,
    required: true
  },

  // course credit
  courseCredit: {
    type: Int32,
    required: true
  },

  // course description
  courseDescription: String,

  // created date
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// course model
module.exports = mongoose.model('CourseModel', courseSchema);
