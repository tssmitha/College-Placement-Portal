const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  collegeEmail: { type: String, required: true, unique: true },
  personalEmail: { type: String }, // Added after approval
  phone: { type: String, required: true }, // New field for student contact number
  dob: { type: Date, required: true },
  branch: { type: String, required: true },
  yearOfPassing: { type: Number, required: true },
  password: { type: String, required: true },
  currentSemester: { type: Number }, // Added after approval
  tenthPercentage: { type: Number }, // Percentage or CGPA
  tenthMarksheet: { type: String }, // PDF file path or URL
  twelfthPercentage: { type: Number }, // Percentage or CGPA
  twelfthMarksheet: { type: String }, // PDF file path or URL
  currentCGPA: { type: Number }, // Added after approval
  semesterMarkscards: [
    {
      sem: { type: Number, min: 1, max: 8 }, // Min 1, Max 8 (Only up to current semester)
      marksheet: { type: String }, // PDF file path or URL
    },
  ],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  certifications: [
    {
      name: { type: String },
      file: { type: String }, // PDF file path or URL
    },
  ],
  resumes: [
    {
      file: { type: String }, // PDF file path or URL
      tag: { type: String }, // e.g., "Frontend", "Backend", etc.
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
