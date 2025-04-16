const express = require("express");
const VerifiedStudent = require("../models/VerifiedStudent");

const router = express.Router();

/**
 * Bulk Insert Verified Students
 * Endpoint: POST /api/verified-students/bulk
 */
router.post("/", async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Invalid student data" });
    }

    // Insert students only if they don’t already exist
    await VerifiedStudent.insertMany(students, { ordered: false }).catch(err => {
      console.log("Some students already exist, skipping duplicates.");
    });

    res.status(201).json({ message: "Verified students added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
