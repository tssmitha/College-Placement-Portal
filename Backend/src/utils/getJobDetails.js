const Job = require('../models/jobs');  // Assuming you have a Job model to fetch job details

const getJobDetails = async (jobId) => {
  const job = await Job.findById(jobId);  // Fetch the job from the DB by jobId
  if (!job) throw new Error('Job not found');
  
  return {
    company: job.companyName,  // Extract company name
    role: job.role             // Extract role
  };
};

module.exports = { getJobDetails };
