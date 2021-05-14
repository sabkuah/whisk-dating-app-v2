const express = require('express');
const User = require('../models/User');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router.get('/fakeUser', async (req, res) => {
  const user = new User({
    email: 'sab@sab.com',
    fName: 'sabrina',
    lName: 'kuah',
    username: 'sab@sab.com',
  });
  const newUser = await User.register(user, 'chicken');
  res.send(newUser);
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register({ newUser, password });
    console.log(registeredUser);
  })
);

module.exports = router;
