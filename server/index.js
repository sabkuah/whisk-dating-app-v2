const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDb } = require('./utils/db');

const whiskRoutes = require('./routes/whisks');

const app = express();

const port = process.env.port || 5000;

connectDb();

app.get('/', (req, res) => {
  res.send('This is the Whisk server!');
});

//========================================
//                Routers
//========================================
app.use('/api/whisks', whiskRoutes);

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

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
