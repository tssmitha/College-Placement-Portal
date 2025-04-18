const mongoose = require("mongoose"); // 
const express = require("express");
const router = express.Router();
const JobApplication = require("../../models/JobApplication");
const authenticateUser = require("../../middleware/authMiddleware");
const Job = require("../../models/jobs"); // Ensure this path is correct
const jobApplicationController = require("../../controllers/jobApplicationController");
const sendEmail = require('../../utils/emailService');


// ✅ Apply for a job
router.post('/apply', authenticateUser, async (req, res) => {
    try {
      const studentId = req.user._id; // from auth middleware
      const { jobId, resumeUrl, selectedRole } = req.body;

      console.log(studentId);
  
      const newApplication = new JobApplication({
        studentId,
        jobId,
        resumeUrl,
        status: "Pending",
        appliedAt: new Date(),
      });
  
      await newApplication.save();
  
      res.status(201).json({ message: "Application submitted successfully!" });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });
  
// ✅ View all applications for a student
router.get("/applications", authenticateUser, async (req, res) => {
    try {
        const applications = await JobApplication.find({ studentId: req.user._id })
            .populate("jobId", "companyName role jobDescriptionPdf ctc jobType location")
            .sort({ appliedAt: -1 });
        
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications" });
        console.log(error);     
    }
});

// POST /api/students/apply/:jobId
router.post('/apply/:jobId', authenticateUser, async (req, res) => {
    const jobId = req.params.jobId;
    const studentId = req.user._id; // Assuming you get it from middleware

    console.log(jobId);
  
    try {
      // Check if already applied
      const existingApplication = await JobApplication.findOne({ jobId, studentId });
      if (existingApplication) {
        return res.status(400).json({ message: 'Already applied to this job' });
      }
  
      const newApplication = new JobApplication({
        studentId,
        jobId,
        resume: req.body.resume, // or default resume logic
        status: 'Pending',
        appliedAt: new Date(),
      });
  
      await newApplication.save();
      const html = `
      <h2>🎯 Application Confirmed!</h2>
      <p>Hi <strong>${student.name}</strong>,</p>
      <p>You have successfully applied for <strong>${job.role}</strong> at <strong>${Job.companyName}</strong>.</p>
      <p>We wish you the best! ✨</p>
    `;

    await sendEmail(student.personalEmail, `🎯 Application Confirmed for ${Job.role}`, html);

      res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
      console.error('Error applying to job:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// ✅ Withdraw an application
router.patch("/withdraw/:id", authenticateUser, async (req, res) => {
    try {
        const application = await JobApplication.findOneAndUpdate(
            { _id: req.params.id, studentId: req.user.id },
            { status: "Withdrawn" },
            { new: true }
        );

        if (!application) return res.status(404).json({ error: "Application not found" });

        res.json({ message: "Application withdrawn", application });
    } catch (error) {
        res.status(500).json({ error: "Failed to withdraw application" });
    }
});


router.get("/applications/:id", authenticateUser, async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }
  
    try {
      const application = await JobApplication.findById(id)
        .populate("jobId", "companyName role jobDescriptionPdf ctc jobType location")
        .populate("studentId", "name usn email");
  
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
  
      res.json(application);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch application details" });
    }
  });
  
router.get("/applications/:applicationId/progress", jobApplicationController.getApplicationProgress);
router.patch("/applications/:applicationId/progress", jobApplicationController.updateApplicationProgress); // Update progress of a job application
router.get("/applications/:applicationId/notifications", jobApplicationController.getApplicationNotifications);

module.exports = router;