const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDb } = require('./utils/db');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const whiskRoutes = require('./routes/whisks');
const userRoutes = require('./routes/users');
const User = require('./models/User');
const ExpressError = require('./utils/ExpressError');

const app = express();

const port = process.env.port || 5000;

connectDb();

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Parsing Middlewares
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.json()); // JSON

//========================================
//                Routers
//========================================
app.use('/api/whisks', whiskRoutes);
app.use('/api/user', userRoutes);

//========================================
//            Error-Handling
//========================================

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong!' } = err;
  res.status(statusCode).send(message);
});

//========================================
//              Listen
//========================================

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
