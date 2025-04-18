const mongoose = require('mongoose');

const shortlistSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  round: String,
  message: String,
  stage: String,
  roundDateTime: Date,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  filePath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shortlist', shortlistSchema);
