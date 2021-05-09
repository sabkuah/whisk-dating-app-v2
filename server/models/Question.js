//==========================================
// REQUIRE
//==========================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//==========================================
// SCHEMA
//==========================================

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['radio', 'multiple choice', 'text'],
    required: true,
  },
  answers: [
    {
      type: String,
    },
  ],
});

//==========================================
// SET UP MODEL
//==========================================
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
