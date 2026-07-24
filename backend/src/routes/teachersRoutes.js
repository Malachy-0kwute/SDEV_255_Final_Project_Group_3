const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

//get all teacher
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({message: error.message});
    console.error(error.message);
  }
});

// get a teacher
router.get('/:id', async (req, res) => {
  const teacherId = req.params.id;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (teacher == null) {
      return res.status(404).json({ message: 'Teacher record not found.' });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a teacher
router.post('/', async (req, res) => {
  const teacher = new Teacher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a teacher
router.put('/:id', async (req, res) => {
  const teacherId = req.params.id;
    
  const teacher = await Teacher.findById(teacherId);

  if (student == null) {
    return res.status(404).json({ message: 'Unable to modify teacher information; Teacher not found.' });
  }

  teacher.firstName = req.body.firstName;
  teacher.lastName = req.body.lastName;
  teacher.email = req.body.email;
  teacher.password = req.body.password; // TODO: Implement authentication and authorization properly.
    
  try {
    // save the newly modified data.
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a teacher
router.delete('/:id', async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findById(teacherId);

  if (teacher == null) {
    return res.status(404).json({ message: 'Teacher record not found.' });
  }

  try {
    await teacher.deleteOne()
    res.json('Teacher record deleted.');
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


module.exports = router;
