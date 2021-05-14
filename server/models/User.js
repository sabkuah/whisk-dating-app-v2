//==========================================
// REQUIRE
//==========================================
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const Whisk = require('./Whisk');
const Match = require('./Match');
const Question = require('./Question');

//==========================================
// SCHEMA
//==========================================
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
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
    //required: true,
  },
  interests: [{ type: String }],
  profileImage: {
    type: String,
    //required: true,
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
    //required: true,
  },
  age: {
    type: Number,
  },
  dateJoined: {
    type: Date,
    //required: true,
  },
  chosenWhisks: [{ type: Schema.Types.ObjectId, ref: 'Whisk' }],
  profileQuestionnaire: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
});

// this plugin adds a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose);

//==========================================
// SET UP MODEL
//==========================================

const User = mongoose.model('User', userSchema);

module.exports = User;
