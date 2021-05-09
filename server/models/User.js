//==========================================
// REQUIRE
//==========================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//==========================================
// SCHEMA
//==========================================
const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  interests: [{ type: String }],
  profileImage: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Non-binary'],
  },
  preference: {
    type: String,
    enum: ['Females', 'Males', 'Other'],
    required: true,
  },
  age: {
    type: Number,
  },
  dateJoined: {
    type: Date,
    required: true,
  },
  chosenWhisks: [{ type: Schema.Types.ObjectId, ref: 'Whisk' }],
  profileQuestionnaire: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
});

//==========================================
// SET UP MODEL
//==========================================

const User = mongoose.model('User', userSchema);

module.exports = User;
