const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  candidateName: String,
  email: String,
  resumeLink: String,
  coverLetter: String,
  matchScore: { type: Number, default: 85 }, // Default AI score
  status: { type: String, default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);