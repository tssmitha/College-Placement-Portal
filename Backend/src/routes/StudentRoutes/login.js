const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

/**
 * Student Login API
 * Endpoint: POST /login
 */
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    collegeEmail = req.body.email;
    password = req.body.password;


    // Check if the student exists
    const student = await Student.findOne({ collegeEmail });
    if (!student) {
        console.log(student);
      return res.status(400).json({ message: "User not found" });
    }

    // Verify DOB (acting as password)
    const isMatch = await bcrypt.compare(password,student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: student._id, email: student.collegeEmail },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set to false if testing on localhost without HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
});


module.exports = router;
