const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      visitMonth: { type: String, required: true },
      visitYear: { type: Number, required: true },
  
      jobRole: { type: String },
      jobType: {
        type: String,
        enum: ["Internship", "Full-Time", "PPO"],
        required: true,
      },
      ctc: { type: String },
      stipend: { type: String },
  
      studentsPlaced: [
        { type: mongoose.Schema.Types.ObjectId, ref: "PlacedStudent" }
      ],
  
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Company", companySchema, "Company");
  