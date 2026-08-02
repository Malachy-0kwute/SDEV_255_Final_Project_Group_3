const jwt = require('jwt-simple');
const express = require('express');
const User = require('../models/user');

const router = express.Router();
const secret = 'supersecret';

// register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, isStudent } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({error: 'Firstname, lastname, email and password are required for registration'});
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

    const token = jwt.encode({email: user.email, isStudent: user.isStudent}, secret);

    res.status(201).json({ 
      userDetails: user,
      token: token
    });

  } catch (error) {
      res.status(500).json({error: 'Internal server error'});
  }
});

//#region Moved to userRoutes.js

// TODO: Add update and delete functionality

// // update
// router.put('/update/:id', async (req, res) => {

//     const authHeader = req.headers.authorization;
  
//     if (!authHeader) {
//       return res.status(401).json({ error: 'Unauthorized. No token provided'});
//     }
  
//     const token = authHeader.split(' ')[1];
  
//     const decodedToken = jwt.decode(token, secret);
  
//     // only teachers can update or delete user for now...
//     if (decodedToken.isStudent) {
//       return res.json({message: 'Unauthorized'});
//     }

//   try {
//     const user = await User.findOneAndUpdate({_id: req.params.id}, req.body);

//     if (!user) {
//       return res.status(404).json({error: 'User not found'});
//     }

//     res.status(201).json({message: 'User updated successfully', userId: user._id});

//   } catch (error) {
//       res.status(500).json({error: 'Internal server error \n' + error });
//   }
// });

// // delete
// router.delete('/remove/:id', async (req, res) => {

//   const authHeader = req.headers.authorization;
  
//   if (!authHeader) {
//     return res.status(401).json({ error: 'Unauthorized. No token provided'});
//   }

//   const token = authHeader.split(' ')[1];

//   const decodedToken = jwt.decode(token, secret);

//   // only teachers can update or delete user for now...
//   if (decodedToken.isStudent) {
//     return res.json({message: 'Unauthorized'});
//   }

//   try {
//     const user = await User.findOne({_id: req.params.id});

//   if (!user) {
//     return res.status(404).json({error: 'User not found'});
//   }

//   const newUserInfo = await user.deleteOne({email: req.body.email});
//   res.status(201).json({message: 'User account deleted successfully'});

//   } catch (error) {
//       res.status(500).json({error: 'Internal server error'});
//   }
// });

//#endregion

module.exports = router