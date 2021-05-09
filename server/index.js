const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.port || 5000;

app.get('/', (req, res) => {
  res.send('This is the Whisk server!');
});

app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`);
});
