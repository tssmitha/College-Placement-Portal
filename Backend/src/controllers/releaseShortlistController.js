const { parseCsv } = require('../utils/parseCsv');  // CSV parsing logic
const { getJobDetails } = require('../utils/getJobDetails');  // Get job info (company, role)
const { sendShortlistEmails } = require('../utils/sendShortlistEmails');  // Email sending logic
const Student = require('../models/Student');
const Shortlist = require('../models/shortlistSchema');  // Shortlist model

// Function to handle shortlist release
const releaseShortlist = async (req, res) => {
  try {
    console.log(req.body);
    const file = req.file;
    const { jobId, round, message, stage, roundDateTime } = req.body;

    // Validate input
    if (!file || !jobId) {
      return res.status(400).json({ error: 'Missing file or jobId' });
    }

    // Step 1: Parse the CSV to extract USNs
    const shortlistedUSNs = await parseCsv(file.path);
    console.log(shortlistedUSNs);

    // Step 2: Fetch student details from DB based on the USNs
    const selectedStudents = await Student.find({ usn: { $in: shortlistedUSNs } });

    // Step 3: Get job details (company name, role, etc.)
    const jobInfo = await getJobDetails(jobId);

    // Step 4: Store the shortlist information in the database
    await Shortlist.create({
      jobId,
      round,
      message,
      stage,
      roundDateTime,
      students: selectedStudents.map(s => s._id),
      filePath: file.path
    });

    // Step 5: Send email notifications to each student
    await sendShortlistEmails(selectedStudents, {
      ...jobInfo,
      round,
      stage,
      message,
      roundDateTime
    });

    // Respond with success message
    res.status(200).json({ message: 'Shortlist released and notifications sent!' });
  } catch (error) {
    console.log('Shortlist Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { releaseShortlist };
