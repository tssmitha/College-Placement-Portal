const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory for this route
const releaseShortlistDir = path.join(__dirname, '../uploads/shortlists');

// Create the folder if it doesn't exist
if (!fs.existsSync(releaseShortlistDir)) {
  fs.mkdirSync(releaseShortlistDir, { recursive: true });
}

// Configure multer for this route
const shortlistUpload = multer({
  dest: releaseShortlistDir, // Store files inside this specific folder
  limits: { fileSize: 10 * 1024 * 1024 }, // Example file size limit (10MB)
  fileFilter: (req, file, cb) => {
    // Check if the file is a CSV
    if (file.mimetype !== 'application/vnd.ms-excel' && file.mimetype !== 'text/csv') {
      return cb(new Error('Only CSV files are allowed'), false);
    }
    cb(null, true);
  }
});

module.exports = shortlistUpload;
