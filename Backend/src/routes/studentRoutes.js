const express = require("express");
const { updateProfile, uploadResume, addSkills } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const Skill = require("../models/Skills");

const router = express.Router();

router.put("/profile", authMiddleware, updateProfile);
router.post("/resume", authMiddleware, uploadResume);
router.post("/:id/add-skill",authMiddleware, async (req, res) => {
    try {
      const { skillId } = req.body; // Skill ID from frontend
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Check if skill exists
      const skillExists = await Skill.findById(skillId);
      if (!skillExists) {
        return res.status(404).json({ message: "Skill not found" });
      }
  
      // Prevent duplicate skills
      if (student.skills.includes(skillId)) {
        return res.status(400).json({ message: "Skill already added" });
      }
  
      student.skills.push(skillId);
      await student.save();
  
      res.status(200).json({ message: "Skill added successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  router.delete("/:studentId/remove-skill",authMiddleware, async (req, res) => {
    try {
      const { studentId } = req.params;
      const { skillId } = req.body;
  
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Check if skill exists in student document
      if (!student.skills.includes(skillId)) {
        return res.status(400).json({ message: "Skill not found in student profile" });
      }
  
      student.skills = student.skills.filter((id) => id.toString() !== skillId);
      await student.save();
  
      res.status(200).json({ message: "Skill removed successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  router.get("/:studentId/skills",authMiddleware, async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const student = await Student.findById(studentId).populate("skills");
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ skills: student.skills });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router;
