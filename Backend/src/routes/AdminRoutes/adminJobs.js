const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Job = require("../../models/jobs");
const students = require("../../models/Student"); // Ensure this path is correct
const { sendEmailToStudent } = require("../../utils/emailService");

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// @route   POST /api/admin/jobs
// @desc    Post a new job
// @access  Admin only (add auth later)
router.post("/", upload.fields([
  { name: "jdPdf", maxCount: 1 },
  { name: "companyLogo", maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      companyName,
      role,
      ctc,
      jobType,
      location,
      eligibilityCriteria,
      branchesAllowed,
      minCGPA,
      backlogAllowed,
      deadline
    } = req.body;

    const newJob = new Job({
      companyName,
      role,
      ctc,
      jobType,
      location,
      eligibilityCriteria,
      branchesAllowed: Array.isArray(branchesAllowed)
        ? branchesAllowed
        : branchesAllowed.split(","), // if sent as comma string from Postman/frontend
      minCGPA,
      backlogAllowed,
      deadline,
      jobDescriptionPdf: req.files?.jdPdf?.[0]?.filename,
      companyLogo: req.files?.companyLogo?.[0]?.filename

    });

    await newJob.save();

    const eligibleStudents = await students.find(); // Filter here if needed
    for (const student of eligibleStudents) {
        if (!student.personalEmail) {
            console.log(`⚠️ Missing email for ${student.name}`);
            continue;
          }
          
        await sendEmailToStudent({
            to: student.personalEmail,
            subject: `New Job Opportunity at ${companyName}`,
            templateName: "job-notification",
            context: {
              name: student.name,
              company: companyName,
              role,
              deadline,
            }
          });
      }
        res.status(201).json({ success: true, message: "Job posted successfully!" });
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
