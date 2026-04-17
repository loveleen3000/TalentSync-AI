const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createJob = async (req, res) => {
  const { title, company, description, skills } = req.body;
  try {
    const newJob = new Job({ title, company, description, skills });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const analyzeJob = async (req, res) => {
  const { description } = req.body;
  try {
    const skills = "React, Node.js, MongoDB, Tailwind"; 
    res.json({ skills });
  } catch (err) {
    res.status(500).send('AI Error');
  }
};

module.exports = {
  getJobs,
  createJob,
  analyzeJob
};