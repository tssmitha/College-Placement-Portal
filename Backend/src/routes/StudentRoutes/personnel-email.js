const express = require("express");
const router = express.Router();
const Student = require("../../models/Student");
const { sendEmailToStudent } = require("../../utils/emailService");
const requireAuth = require("../../middleware/authMiddleware"); // ✅ assumes you have auth middleware

router.post("/personal-email", requireAuth, async (req, res) => {
  try {
    const { personalEmail } = req.body;

    if (!personalEmail) {
      return res.status(400).json({ message: "Personal email is required." });
    }

    const studentId = req.user._id; // 👈 from auth middleware
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Save personal email
    student.personalEmail = personalEmail;
    await student.save();

    // Format DOB (default password info)
    const defaultPassword = new Date(student.dob).toISOString().split("T")[0];

    // Send welcome email using your template system 🎉
    await sendEmailToStudent({
      to: personalEmail,
      subject: "Welcome to NIE Placement Portal 🎓",
      templateName: "welcome", // 👈 name of your handlebars file (welcome.handlebars)
      context: {
        name: student.name,
        usn: student.usn,
        defaultPassword,
        loginLink: "http://localhost:5173/login",
      },
    });

    res.status(200).json({ message: "Email saved and welcome email sent!" });
  } catch (err) {
    console.error("Error saving personal email:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
