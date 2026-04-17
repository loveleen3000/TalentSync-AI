const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); 


router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: "Post failed" });
  }
});

module.exports = router;