const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Feedback = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Connection error:', err));

app.post('/feedback', async (req, res) => {
  const { department, message } = req.body;

  if (!department || !message) {
    return res.status(400).json({ error: 'Both fields are required' });
  }

  try {
    const feedback = new Feedback({ department, message });
    await feedback.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/feedback', async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ submittedAt: -1 });
    res.status(200).json(allFeedback);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
