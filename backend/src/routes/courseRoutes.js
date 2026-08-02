const express = require('express');
const router = express.Router();
const { Course } = require('../models/course');
const jwt = require('jwt-simple');

// get all courses
// TODO: get only a specific amount of courses at a time
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({error: error.message});
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
      return res.status(404).json({ error: 'Unable to find the requested course record.' });
    }

    // return course
    res.json(course);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create a course
router.post('/', async (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. No token provided'});
  }

  try {
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, 'supersecret');

    if (decodedToken.isStudent) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const course = new Course(req.body);

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a course
router.put('/:id', async (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. No token provided'});
  }
  
  try {
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, 'supersecret');

    if (decodedToken.isStudent) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    // get course id
    const courseId = req.params.id;
  
    const newCourse = await Course.updateOne({_id: courseId}, req.body)
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a course
router.delete('/:id', async (req, res) => {

  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized. No token provided'});
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, 'supersecret');

    if (decodedToken.isStudent) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    // get course id
    const courseId = req.params.id;
  
    await Course.deleteOne({_id: courseId});
    res.status(200).json({message: 'Course record deleted.'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;