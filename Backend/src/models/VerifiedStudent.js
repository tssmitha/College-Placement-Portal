const mongoose = require("mongoose");

const verifiedStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  collegeEmail: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("VerifiedStudent", verifiedStudentSchema);
