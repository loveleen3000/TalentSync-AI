const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  candidateName: String,
  email: String,
  resumeLink: String,
  coverLetter: String,
  matchScore: { type: Number, default: 85 },
  appliedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', ApplicationSchema);

router.post('/apply', async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.status(201).json({ message: "Success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const apps = await Application.find().sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;