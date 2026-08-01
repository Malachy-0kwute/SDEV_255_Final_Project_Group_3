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

  const student = new Student(req.body);

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

  try {
    // save the newly modified data.
    const newStudent = await Student.updateOne({_id: studentId}, req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a student
router.delete('/:id', async (req, res) => {

  // get student id
  const studentId = req.params.id;

  try {
    await Student.deleteOne({_id: studentId});
    res.json('Student record deleted.');
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;