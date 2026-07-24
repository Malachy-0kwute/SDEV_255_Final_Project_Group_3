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

  // prerequisites
  coursePrerequisites: [String],

  // STEM math
  courseStemMath: [String],

  // Program
  courseProgram: String,

  // course credit hours
  courseCredit: {
    type: Number,
    required: true
  },

  // lecture hours
  courseLectureHours: Number,

  // date of last revision
  courseLastRevisionDate: Date,

  // course description
  courseDescription: String,

  // major learning objectives
  courseLearningObjectives: [String],

  // created date
  createdAt: {
    type: Date,
    default: Date.now,
    timestamps: true 
  }  
});

// course model
module.exports = mongoose.model('Courses', courseSchema);
