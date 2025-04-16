const express = require("express");
const Skill = require("../models/Skills");

const router = express.Router();

/**
 * Add a New Skill
 * Endpoint: POST /api/skills
 */
router.post("/skills", async (req, res) => {
    try {
      const { skills } = req.body;
  
      // Check if skills array is provided
      if (!skills || !Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ message: "Invalid skills data" });
      }
  
      // Prepare skill objects for bulk insertion
      const skillDocs = skills.map(skill => ({ name: skill }));
  
      // Insert skills only if they don’t already exist
      await Skill.insertMany(skillDocs, { ordered: false }).catch(err => {
        console.log("Some skills already exist, skipping duplicates.");
      });
  
      res.status(201).json({ message: "Skills added successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  router.get("/skills", async (req, res) => {
    try {
      const skills = await Skill.find({}, "name"); // Fetch only the 'name' field
      res.json(skills.map(skill => skill.name)); // Send as an array of names
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Server error while fetching skills" });
    }
  });
module.exports = router;
