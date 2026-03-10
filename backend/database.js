const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;