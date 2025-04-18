// const express = require("express");
// const router = express.Router();
// const verifyAdminToken = require("../../middleware/adminAuthMiddleware");
// const multer = require("multer");
// const { releaseShortlist } = require("../controllers/releaseShortlistController");

// // multer for CSV upload
// const upload = multer({ dest: "uploads/" });

// router.post(
//   "/release-shortlist",
//   verifyAdminToken,
//   upload.single("shortlistCsv"),
//   releaseShortlist
// );

// module.exports = router;

const express = require('express');
const router = express.Router();
const shortlistUpload = require('../../config/multerShortlist'); // The path where the multer config is located
const {releaseShortlist} = require('../../controllers/releaseShortlistController'); // The controller that handles the logic for releasing the shortlist

// Define the route for /releaseShortlist
// router.post('/releaseShortlist', shortlistUpload.single('shortlistCsv'), async (req, res) => {
//   try {
//     // Access uploaded file here
//     const file = req.file;
//     const { jobId, companyName, role, round, message, stage, roundDateTime } = req.body;

//     console.log('File:', file);
//     console.log('JobId:', jobId);
//     console.log('Company:', companyName);
//     console.log('Role:', role);

//     // Your business logic here (e.g., storing data in DB, etc.)
//     res.status(200).json({ message: 'Shortlist released successfully!' });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

router.post('/releaseShortlist', shortlistUpload.single('shortlistCsv'), releaseShortlist);

module.exports = router;

  

// router.post('/releaseShortlist', (req, res) => {
//     console.log("Clicked");
//     res.status(200).send("Shortlist endpoint hit");
// });

module.exports = router;

