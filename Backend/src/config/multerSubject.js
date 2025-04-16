// multerSubject.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for subject-related PDFs
const subjectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subjectFolder = req.body.subject || 'general'; // Folder for subject type (default to 'general')
        const subjectPath = path.join(uploadDir, subjectFolder);

        if (!fs.existsSync(subjectPath)) {
            fs.mkdirSync(subjectPath, { recursive: true });
        }

        cb(null, subjectPath); // Save file to the appropriate folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

// Define upload middleware
const uploadSubjectPdf = multer({
    storage: subjectStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."), false);
        }
    }
});

module.exports = { uploadSubjectPdf };
