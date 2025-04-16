const express = require("express");
const router = express.Router();
const QAModel = require("../../models/Questions");

router.post("/", async (req, res) => {
  const { question, userAnswer, jobRole, experience } = req.body;

  try {
    const newEntry = new Question({ question, userAnswer, jobRole, experience });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;