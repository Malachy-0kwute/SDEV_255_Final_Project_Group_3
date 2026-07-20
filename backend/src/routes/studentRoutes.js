const express = require('express');
const router = express.Router();
const Student = require('../models/student');

//get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({message: error.message});
    console.error(error.message);
  }
});

// get a student
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);

    if (student == null) {
      return res.status(404).json({ message: 'Student record not found.' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a student
router.post('/', async (req, res) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a student
router.put('/:id', async (req, res) => {
  const studentId = req.params.id;
    
  const student = await Student.findById(studentId);

  if (student == null) {
    return res.status(404).json({ message: 'Unable to modify student information; Student not found.' });
  }

  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.email = req.body.email;
  student.password = req.body.password; // TODO: Implement authentication and authorization properly.
    
  try {
    // save the newly modified data.
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a student
router.delete('/:id', async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findById(studentId);

  if (student == null) {
    return res.status(404).json({ message: 'Student record not found.' });
  }

  try {
    await student.deleteOne()
    res.json('Student record deleted.');
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;