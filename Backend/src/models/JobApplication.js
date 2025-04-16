const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true }, // Reference to Jobs
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Shortlisted", "Rejected", "Selected", "Withdrawn"], default: "Pending" },
  resumeUrl: { type: String, required: true }, // Resume link

  interviewRounds: [
    {
      roundNumber: Number,
      status: { type: String, enum: ["Scheduled", "Completed", "Pending"] },
      feedback: String,
      date: { type: Date },
    },
  ],

  progress: [
    {
      stage: {
        type: String,
        enum: [
          "Applied", 
          "Resume Shortlisted", 
          "Online Assessment", 
          "Technical Interview", 
          "HR Interview", 
          "Offer Extended", 
          "Selected"
        ],
      },
      status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
      updatedAt: { type: Date, default: Date.now },
    },
  ],

  notifications: [
    {
      message: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
