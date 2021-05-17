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
    //res.send(req.body);
    const { email, username, password, fName, lName } = req.body;
    const newUser = new User({ username: email, email, fName, lName });
    const registeredUser = await User.register(newUser, password);
    res.send('Register successful!');
    console.log(registeredUser);
  })
);

module.exports = router;
