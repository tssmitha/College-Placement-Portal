const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true }, // Path to uploaded logo
  role: { type: String, required: true },
  jobDescriptionPdf: { type: String, required: true }, // Link to JD PDF
  ctc: { type: String, required: true }, // CTC (e.g., "12 LPA", "Stipend: 50k/month")
  jobType: { type: String, enum: ["Full-Time", "Internship", "Full-Time + Internship"], required: true },
  location: { type: String, required: true }, // Job location (e.g., "Bangalore, Remote")
  // eligibilityCriteria: { type: String }, // Optional, e.g., "Minimum 8 CGPA"
  branchesAllowed: [String], 
  minCGPA: { type: Number },
  backlogAllowed: { type: Boolean, default: false },
  deadline: { type: Date, required: true }, // Last date to apply
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
