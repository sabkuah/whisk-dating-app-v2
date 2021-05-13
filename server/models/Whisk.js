//==========================================
// REQUIRE
//==========================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//==========================================
// SCHEMA
//==========================================

const whiskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['outdoors', 'adventure', 'food'],
    required: true,
  },
  city: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    enum: ['$', '$$', '$$$'],
  },
  durationHours: {
    type: Number,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
  tags: [{ type: String }],
});

//==========================================
// SET UP MODEL
//==========================================

const Whisk = mongoose.model('Whisk', whiskSchema);

module.exports = Whisk;
