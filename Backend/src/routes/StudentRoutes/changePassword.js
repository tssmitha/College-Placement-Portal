const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../../models/Student');
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post('/change-password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await Student.findById(req.user._id);

    console.log(user.password );

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: 'Password changed successfully!' });
});

module.exports = router;
