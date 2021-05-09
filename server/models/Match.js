//==========================================
// REQUIRE
//==========================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//==========================================
// SCHEMA
//==========================================

const matchSchema = new Schema({
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  whiskId: {
    type: Schema.Types.ObjectId,
    ref: 'Whisk',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    required: true,
  },
});

//==========================================
// SET UP MODEL
//==========================================
const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
