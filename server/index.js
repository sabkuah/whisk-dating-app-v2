const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDb } = require('./utils/db');
const Whisk = require('./models/Whisk');
const catchAsync = require('./utils/catchAsync');

const app = express();

const port = process.env.port || 5000;

connectDb();

app.get('/', (req, res) => {
  res.send('This is the Whisk server!');
});

//========================================
//                Whisks
//========================================

app.get(
  '/api/whisks',
  catchAsync(async (req, res) => {
    const whisks = await Whisk.find({});
    res.send(whisks);
  })
);

app.get(
  '/api/whisks/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const whisk = await Whisk.findById(id);
    res.send(whisk);
  })
);

//========================================
//                Users
//========================================

app.use((err, req, res, next) => {
  res.send('Something went wrong!');
});

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
