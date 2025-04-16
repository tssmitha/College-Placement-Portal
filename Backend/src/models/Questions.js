const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema({
  jobRole: String,
  experience: Number,
  techStack: String,
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

const QAModel = mongoose.model("QAPair", qaSchema);

module.exports = QAModel;