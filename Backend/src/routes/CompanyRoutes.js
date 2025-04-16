// // In your backend route file (e.g., routes/companies.js)
const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

// // GET companies that have visited (exclude studentsPlaced field)
// router.get('/', async (req, res) => {
//   try {
//     console.log("Attempting to fetch companies");
//     const companies = await Company.find(); // Only select relevant fields to return
//       console.log(companies);
//     res.json(companies);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/', async (req, res) => {
  try {
    const { name, jobType, visitMonth, visitYear } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // case-insensitive search
    }

    if (jobType) {
      query.jobType = jobType; // Case-sensitive!
    }

    if (visitMonth) {
      query.visitMonth = visitMonth; // keep as string
    }

    if (visitYear) {
      query.visitYear = parseInt(visitYear); // ensure it's a number
    }

    console.log("Query being used:", query); // 👈 Debug here

    const companies = await Company.find(query);
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to get placed students along with company details
router.get('/:id/placed-students', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('studentsPlaced')  // Populate student details from the PlacedStudent collection
      .exec();

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (!company.studentsPlaced || company.studentsPlaced.length === 0) {
      return res.status(200).json([]);  // Return an empty array if no placed students
    }

    res.json(company.studentsPlaced);  // Return student data
  } catch (err) {
    console.error('Error fetching placed students:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});





module.exports = router;