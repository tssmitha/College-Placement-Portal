const express = require('express');
const { uploadSubjectPdf } = require('../../config/multerSubject');
const Resource = require('../../models/Resources'); // ⬅️ Import the model
const Subject = require('../../models/Subject'); // Import the Subject model
const path = require('path');

const router = express.Router();

router.post('/upload-resource', uploadSubjectPdf.single('subjectPdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Get additional metadata from the form
        const { subject } = req.body;

        // Store file info in the database
        const newResource = new Resource({
            fileName: req.file.originalname,
            storedPath: req.file.path,
            subject: subject || "General", // fallback subject
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
        });

        await newResource.save();

        res.status(200).json({
            message: "File uploaded & saved to DB successfully",
            resource: newResource
        });

    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ message: "Server error during file upload" });
    }
});

// Route to fetch resources by subject
router.get('/resources/:subjectName', async (req, res) => {
    try {
        // Get the subject name from the URL parameters
        const subjectName = decodeURIComponent(req.params.subjectName);
        console.log(subjectName);

        // Check if the subject exists in the Subject model
        const subject = await Subject.findOne({ name: subjectName });
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        // Fetch all resources related to this subject
        const resources = await Resource.find({ subject: subjectName });
        console.log("Fetched Resources:", resources);


        if (resources.length === 0) {
            return res.status(404).json({ message: "No resources found for this subject" });
        }

        // Return the resources in the response
        res.status(200).json({ resources });

    } catch (err) {
        console.error("Error fetching resources:", err);
        res.status(500).json({ message: "Server error fetching resources" });
    }
});


module.exports = router;
