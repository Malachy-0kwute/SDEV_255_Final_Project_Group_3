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

  //course subject
  courseSubject: {
  type: String,
  required: true
},

  // course credit
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

// course model
module.exports = mongoose.model('Courses', courseSchema);
