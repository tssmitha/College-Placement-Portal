const express = require('express');
const router = express.Router();
const { getActiveJobs, getPastJobs, getApplicantsForJob, getJobById , exportApplicantsCSV} = require('../../controllers/adminApplications');
const verifyAdmin = require('../../middleware/adminAuthMiddleware'); // optional for now
const release_forms = require('./adminJobs');

router.get('/viewApplications/active', verifyAdmin, getActiveJobs);
router.get('/viewApplications/past', verifyAdmin, getPastJobs);
router.get('/viewApplicants/:jobId', verifyAdmin, getApplicantsForJob);
router.get('/job/:jobId', verifyAdmin, getJobById);
router.get('/exportApplicants/:jobId', verifyAdmin, exportApplicantsCSV);
router.use('/applicantStats', require('./analytics' ));
router.use('/release-forms',release_forms); // for now, this is the only route in release-forms

module.exports = router;
