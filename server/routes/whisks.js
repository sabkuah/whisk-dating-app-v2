const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Whisk = require('../models/Whisk');

router.get(
  '/',
  catchAsync(async (req, res) => {
    const whisks = await Whisk.find({});
    res.send(whisks);
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const whisk = await Whisk.findById(id);
    res.send(whisk);
  })
);

module.exports = router;
