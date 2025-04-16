const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject"); // Ensure this path is correct


router.get('/subjects', async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.json(subjects);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  module.exports = router;

  
   
  