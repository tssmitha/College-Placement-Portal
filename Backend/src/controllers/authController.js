const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendApprovalEmail = require("../config/emailService");

exports.registerStudent = async (req, res) => {
  try {
    const { name, usn, collegeEmail, dob, branch, yearOfPassing } = req.body;
    
    const newStudent = new Student({
      name,
      usn,
      collegeEmail,
      dob,
      branch,
      yearOfPassing,
      status: "Pending Approval",
    });

    await newStudent.save();
    res.status(201).json({ success: true, message: "Signup request sent. Waiting for admin approval." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error registering student", error: err });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ collegeEmail: email });

    if (!student) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login error", error: err });
  }
};

exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find(); // Fetch all students
      res.json({ success: true, students });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching students", error: err });
    }
  };
  
