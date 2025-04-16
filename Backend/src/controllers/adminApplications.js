const Job = require('../models/jobs');
const JobApplication = require('../models/JobApplication');
const Student = require('../models/Student');
const { Parser } = require('json2csv');

// Get active jobs (deadline >= today)
const getActiveJobs = async (req, res) => {
  try {
    const today = new Date();
    const jobs = await Job.find({ deadline: { $gte: today } });

    console.log(jobs);

    const jobsWithApplications = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await JobApplication.countDocuments({ jobId: job._id });
        return { ...job.toObject(), studentsApplied: applicationCount };
      })
    );

    res.status(200).json({ data: jobsWithApplications }); 
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching active jobs', error: err.message });
  }
};

// Get past jobs (deadline < today)
const getPastJobs = async (req, res) => {
  try {
    const today = new Date();
    const jobs = await Job.find({ deadline: { $lt: today } });

    console.log(jobs);

    const jobsWithApplications = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await JobApplication.countDocuments({ jobId: job._id });
        return { ...job.toObject(), studentsApplied: applicationCount };
      })
    );

    res.status(200).json({ data: jobsWithApplications }); 
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching past jobs', error: err.message });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // 1. Find all applications for the job
    const applications = await JobApplication.find({ jobId });

    // 2. Extract student IDs
    const studentIds = applications.map((app) => app.studentId);

    // 3. Fetch students
    const students = await Student.find({ _id: { $in: studentIds } }).select(
      'name usn branch currentCGPA resumes personalEmail phone collegeEmail'
    );

    res.status(200).json({ applicants: students });
  } catch (err) {
    console.error("Error fetching applicants", err);
    res.status(500).json({ message: "Failed to fetch applicants", error: err.message });
  }
};

// ✅ Get single job details by ID (for Job Details Page)
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
};

const exportApplicantsCSV = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const applications = await JobApplication.find({ jobId }).populate('studentId');

    const data = applications.map(app => {
      const student = app.studentId;
      return {
        Name: student.name,
        USN: student.usn,
        Branch: student.branch,
        CGPA: student.academicInfo?.cgpa || 'N/A',
        Tenth: student.academicInfo?.tenthPercentage || 'N/A',
        Twelfth: student.academicInfo?.twelfthPercentage || 'N/A',
        Resume: app.resumeLink || 'N/A'
      };
    });

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${job.companyName}_${job.role}_Applicants.csv`);
    res.send(csv);
  } catch (err) {
    console.error("CSV Export Error:", err);
    res.status(500).json({ message: "Failed to export applicants CSV" });
  }
};



module.exports = { getActiveJobs, getPastJobs ,  getApplicantsForJob , getJobById , exportApplicantsCSV};
