const express = require("express");
const { approveStudent, markStudentPlaced } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/approve/:id", authMiddleware, approveStudent);
router.put("/mark-placed/:id", authMiddleware, markStudentPlaced);

// Add a new skill (Admin only)
router.post("/add", async (req, res) => {
    try {
      const { name } = req.body;
      const existingSkill = await Skill.findOne({ name });
      if (existingSkill) {
        return res.status(400).json({ message: "Skill already exists" });
      }
      const skill = new Skill({ name });
      await skill.save();
      res.status(201).json({ message: "Skill added successfully", skill });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router;
