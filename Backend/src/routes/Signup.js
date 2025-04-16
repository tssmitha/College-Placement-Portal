const express = require("express");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const VerifiedStudent = require("../models/VerifiedStudent");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, usn, collegeEmail, branch, yearOfPassing, dob, phone } = req.body;

    // Check if student is in the "VerifiedStudents" collection (using only USN & Email)
    const verifiedStudent = await VerifiedStudent.findOne({ usn, collegeEmail });

    if (!verifiedStudent) {
      return res.status(403).json({ message: "You are not authorized to register." });
    }

    // Check if student is in 3rd or 4th year (based on Year of Passing)
    const currentYear = new Date().getFullYear();
    const studentYear = parseInt(req.body.yearOfPassing);
    if (studentYear !== currentYear  && studentYear !== currentYear + 1) {
        return res.status(403).json({ message: "Only third or fourth-year students could register!" });
      }

    //Check if student already exists
    const existingStudent = await Student.findOne({ usn });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered." });
    }

    //Convert DOB to "YYYY-MM-DD" format for password
    const dobString = new Date(dob).toISOString().split("T")[0];

    //Hash the default password (DOB)
    const hashedPassword = await bcrypt.hash(dobString, 10);

    //Save Student in the Database
    const newStudent = new Student({
      name,
      usn,
      collegeEmail,
      branch,
      yearOfPassing,
      dob,
      phone,
      password: hashedPassword, // 🔹 Store the hashed password
    });

    await newStudent.save();
    res.status(201).json({ message: "Signup successful! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
