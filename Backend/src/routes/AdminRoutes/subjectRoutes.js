// routes/admin/subjects.js
const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject");

// @route   GET /api/subjects
// @desc    Get all subjects
// @access  Public (or Protected, if admin-only)
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.status(200).json({ subjects });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects", error: err });
  }
});

// @route   POST /api/subjects
// @desc    Add a new subject
// @access  Admin (for now, assume public)
router.post("/subjects", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Subject name is required" });

    const existing = await Subject.findOne({ name: name.trim() });
    if (existing) return res.status(409).json({ message: "Subject already exists" });

    const newSubject = new Subject({ name: name.trim() });
    await newSubject.save();

    res.status(201).json({ message: "Subject added successfully", subject: newSubject });
  } catch (err) {
    res.status(500).json({ message: "Failed to add subject", error: err });
  }
});

module.exports = router;
