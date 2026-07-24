const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// get all courses
// TODO: get only a specific amount of courses at a time
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({message: error.message});
    console.error(error.message);
  }
});

// get a course
router.get('/:id', async (req, res) => {
  try{
    // get course id
    const courseId = req.params.id;

    // get course
    const course = await Course.findById(courseId);

    // if course is not found...
    if (course == null) {
      // return error message
      return res.status(404).json({ message: 'Unable to find the requested course record.' });
    }

    // return course
    res.json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a course
router.post('/', async (req, res) => {
  const course = new Course({
    courseCode: req.body.courseCode,
    courseTitle: req.body.courseTitle,
    courseCredit: req.body.courseCredit,
    courseDescription: req.body.courseDescription
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a course
router.put('/:id', async (req, res) => {

    // get course id
    const courseId = req.params.id;

    // get course
    const course = await Course.findById(courseId);

    // if course is not found...
    if (course == null) {
      // return error message
      return res.status(404).json({ message: 'Unable to modify course information; Course not found.' });
    }

    // wire incoming data
    // TODO: verify that date updates automatically
    course.courseCode = req.body.courseCode;
    course.courseTitle = req.body.courseTitle;
    course.courseCredit = req.body.courseCredit;
    course.courseDescription = req.body.courseDescription;
    
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// delete a course
router.delete('/:id', async (req, res) => {

  // get course id
  const courseId = req.params.id;

  // get course
  const course = await Course.findById(courseId);

  // if course is not found...
  if (course == null) {
    // return error message
    return res.status(404).json({ message: 'Course record not found.' });
  }
  
  try {
    await course.deleteOne();
    res.json('Course record deleted.');
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;