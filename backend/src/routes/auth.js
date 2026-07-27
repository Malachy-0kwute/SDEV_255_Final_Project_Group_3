const jwt = require('jwt-simple');
const express = require('express');
const User = require('../models/user');

const router = express.Router();
const secret = 'supersecret';

// register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, isStudent } = req.body;

  if (!firstName || !lastName || !email || !password || !isStudent) {
    return res.status(400).json({error: 'Firstname, lastname, email, password and isStudent are required for registration'});
  }

  const match = await User.findOne({ email });
  if (match) {
    return res.status(400).json({ error: 'A user with email already exists.' });
  }

  try {
    const newUser = await User.create(req.body);
    res.status(201).json({message: 'User registered successfully', userId: newUser._id});
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }

});

// login
router.post('/login', async (req, res) => {

  const {email, password } = req.body;

  if (!email || !password) {
    return res.send({error: 'email and password are required for logging in'});
  }

  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(404).json({error: 'Invalid email and password'});
    }

    if (user.email != email || user.password != password) {
      return res.status(404).json({error: 'Invalid email and password'});
    }

    const token = jwt.encode({email: user.email}, secret);

    res.status(201).json({ 
      userDetails: user,
      token: token,
      isAuthorized: true
    });

  } catch (error) {
      res.status(500).json({error: 'Internal server error'});
  }
});

// TODO: Add update and delete functionality
// update
// router.put('/update', async (req, res) => {

// });

module.exports = router;