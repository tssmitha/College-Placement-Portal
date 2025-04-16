// const mongoose = require("mongoose");

// const placedStudentSchema = new mongoose.Schema({
//     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
//     name: { type: String, required: true },
//     usn: { type: String, required: true, unique: true },
//     collegeEmail: { type: String, required: true, unique: true },
//     branch: { type: String, required: true },
//     company: { type: String, required: true },
//     role: { type: String, required: true },
//     ctc: { type: Number, required: true }, // Salary package
//     dateOfPlacement: { type: Date, default: Date.now },
//   });
  
//   module.exports = mongoose.model("PlacedStudent", placedStudentSchema);
  
const mongoose = require("mongoose");

const placedStudentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    jobRole: { type: String, required: true }, // Dynamic field for job role specific to the placement
    package: { type: Number, required: true }, // Salary package in LPA
    placedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacedStudent", placedStudentSchema);

