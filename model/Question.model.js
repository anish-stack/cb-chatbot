const mongoose = require('mongoose');

const QASchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
});

const QA = mongoose.model('QA', QASchema);

module.exports = QA;
