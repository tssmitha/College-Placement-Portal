const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../../models/Student');

const router = express.Router();

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Find the user with the reset token and check if it’s expired
  const user = await Student.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ msg: 'Invalid or expired token' });
  }

  // Hash the new password and save it
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;  // Clear the reset token
  user.resetPasswordExpires = undefined;  // Clear the expiration date
  await user.save();

  res.json({ msg: 'Password successfully reset!' });
});

module.exports = router;
