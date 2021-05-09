const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDb } = require('./utils/db');

const app = express();

const port = process.env.port || 5000;

connectDb();

app.get('/', (req, res) => {
  res.send('This is the Whisk server!');
});

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
