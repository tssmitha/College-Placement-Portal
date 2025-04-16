// routes/test/emailTest.js
const express = require("express");
const router = express.Router();
const sendEmail = require("../../utils/emailService");

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "janakipotter066@gmail.com", // use your email here to test
      subject: "🚀 Email Test: Job Posted",
      templateName: "jobPosted", // your handlebars template name
      context: {
        name: "Smitha",
        companyName: "Test Corp",
        role: "Full Stack Developer",
        ctc: "10 LPA",
        deadline: "April 20, 2025",
        link: "http://localhost:3000/jobs/123"
      }
    });

    res.status(200).json({ success: true, message: "Test email sent!" });
  } catch (error) {
    console.error("Email sending failed:", error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
