const express = require('express');
const router = express.Router();
const verifyAdmin = require('../../middleware/adminAuthMiddleware'); // optional for now
const Application = require('../../models/JobApplication');
const Student = require('../../models/Student');

// 📊 Route 1: Get applicant count by branch
router.get('/byBranch/:jobId',verifyAdmin, async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ jobId }).populate('studentId');

    const branchCount = {};
    applications.forEach(app => {
      const branch = app.studentId?.branch || 'Unknown';
      branchCount[branch] = (branchCount[branch] || 0) + 1;
    });

    res.json(branchCount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching branch stats');
  }
});

// 🥧 Route 2: Get CGPA distribution
router.get('/cgpaDist/:jobId',verifyAdmin, async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ jobId }).populate('studentId');

    const distribution = {
      '<6': 0,
      '6-7': 0,
      '7-8': 0,
      '8-9': 0,
      '9+': 0
    };

    applications.forEach(app => {
      const cgpa = parseFloat(app.studentId?.cgpa);
      if (isNaN(cgpa)) return;

      if (cgpa < 6) distribution['<6']++;
      else if (cgpa < 7) distribution['6-7']++;
      else if (cgpa < 8) distribution['7-8']++;
      else if (cgpa < 9) distribution['8-9']++;
      else distribution['9+']++;
    });

    res.json(distribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching CGPA stats');
  }
});

module.exports = router;
