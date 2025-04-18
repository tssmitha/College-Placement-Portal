const express = require('express');
const crypto = require('crypto');
const Student = require('../../models/Student');
const { sendEmailToStudent } = require('../../utils/emailService'); // Path to your email service

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await Student.findOne({ collegeEmail: email });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  // Generate a password reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

  await user.save();

  // Send reset link to user's email using the Handlebars template
  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
  const emailSubject = "Password Reset Request";
  const emailContext = { resetLink };

  try {
    await sendEmailToStudent({
      to: user.collegeEmail,
      subject: emailSubject,
      templateName: "resetPassword",  // Handlebars template name
      context: emailContext,
    });
    res.json({ msg: 'Password reset link sent to your email!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: 'Error sending password reset email' });
  }
});

module.exports = router;
