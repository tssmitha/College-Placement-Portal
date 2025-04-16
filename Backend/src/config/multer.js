const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload folder relative to the backend root
const uploadDir = path.join(__dirname, "../uploads");


// Create the uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store files inside backend/uploads
        console.log(file);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

const multiUpload = upload.fields([
    { name: "jobDescriptionPdf", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 }
]);
const statusUpload = upload.single("statusFile"); // ✅ Now defined after `upload`


module.exports = { multiUpload ,  statusUpload};
