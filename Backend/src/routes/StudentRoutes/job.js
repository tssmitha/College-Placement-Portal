// routes/jobs.js
const express = require("express");
const router = express.Router();
const Job = require("../../models/jobs");
const authenticateUser = require("../../middleware/authMiddleware");
const mongoose = require("mongoose");

router.get("/jobs",authenticateUser, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ deadline: 1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
    console.log(err);
  }
});

router.get("/jobs/:jobId", authenticateUser, async (req, res) => {
    try {
      const { jobId } = req.params;
      console.log(jobId);
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
  
      res.json(job);
    } catch (err) {
      console.error("Error fetching job by ID:", err);
      res.status(500).json({ error: "Failed to fetch job details" });
    }
  });

module.exports = router;
