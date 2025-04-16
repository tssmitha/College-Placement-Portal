// models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    storedPath: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
      },      
    tags: [String], // Optional for now
    uploadedBy: {
        type: String,
        default: "admin"
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    fileSize: Number,
    mimeType: String
});

module.exports = mongoose.model("Resource", resourceSchema);
