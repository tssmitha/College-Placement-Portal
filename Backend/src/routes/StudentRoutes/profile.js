const express = require("express");
const router = express.Router();
const Student = require("../../models/Student"); // Ensure the correct path
const verifyToken = require("../../middleware/authMiddleware"); 
const upload = require("../../config/multer"); 
const StudentAcademic = require("../../models/Academics");
const Skill = require("../../models/Skills");


// 📌 1️⃣ GET Student Profile (Authenticated Student Only)
router.get("/profile", verifyToken, async (req, res) => {
    console.log(req.user._id)
    try {
        const student = await Student.findById(req.user._id)
            .select("-password") // Exclude password for security
            .populate("skills", "name"); // Populate skills with only names

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// 📌 2️⃣ PUT Update Profile (Students Can Edit Only Editable Fields)
router.put("/profile", verifyToken, async (req, res) => {
    try {
        // Only allow updating these fields
        const allowedUpdates = [
            "personalEmail",
            "currentSemester",
            "tenthPercentage",
            "tenthMarksheet",
            "twelfthPercentage",
            "twelfthMarksheet",
            "currentCGPA",
            "semesterMarkscards",
            "skills",
            "certifications",
            "resumes"
        ];

        // Filter the request body to include only allowed fields
        const updateFields = {};
        for (const field of allowedUpdates) {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        }

        // Ensure at least one field is being updated
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        // Find and update the student's profile
        const updatedStudent = await Student.findByIdAndUpdate(
            req.user.id, // Ensure user can only update their own profile
            { $set: updateFields },
            { new: true, runValidators: true } // Return updated document and enforce schema validation
        ).select("-password"); // Exclude password for security

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Profile updated successfully", student: updatedStudent });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



// router.post("/uploadMarkscard", upload.single("markscard"), async (req, res) => {
//     console.log("StudentAcademic Model: ", StudentAcademic);

//     try {
//         const { studentEmail, semester } = req.body; // Get student email from frontend

//         // Find student by email (assuming email is unique)
//         const student = await Student.findOne({ collegeEmail: studentEmail });

//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         const studentId = student._id; // Get ObjectId

//         // Update StudentAcademic schema
//         let studentAcademic = await StudentAcademic.findOne({ studentId });

//         if (!studentAcademic) {
//             studentAcademic = new StudentAcademic({ studentId, markscards: [] });
//         }

//         // Add uploaded markscard
//         studentAcademic.markscards.push({ semester, filePath: req.file.path });

//         await studentAcademic.save();

//         res.json({ message: "Markscard uploaded successfully", studentAcademic });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Upload failed", error });
//     }
// });


router.get("/get-markscards/:studentId", async (req, res) => {
    try {
        const studentAcademic = await StudentAcademic.findOne({ studentId: req.params.studentId });
        if (!studentAcademic) return res.status(404).json({ message: "No data found" });

        res.json(studentAcademic.markscards);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve markscards", error });
    }
});


// router.post("/upload", upload.single("file"), (req, res) => {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded File:", req.file);
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }
//         console.log(req.file);
//         res.json({ message: "File uploaded successfully", file: req.file });
//     } catch (error) {
//         res.status(500).json({ message: "Upload failed", error });
//         console.error(error);
//     }
// });

router.put("/profile/update", verifyToken, async (req, res) => {
    try {
        const allowedUpdates = [
            "personalEmail",
            "currentSemester",
            "tenthPercentage",
            "tenthMarksheet",
            "twelfthPercentage",
            "twelfthMarksheet",
            "currentCGPA",
            "semesterMarkscards",
            "skills",
            "certifications",
            "resumes"
        ];

        const updateFields = {};
        for (const field of allowedUpdates) {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        }

        // ✅ Convert skill names to ObjectIds before updating
        if (updateFields.skills) {
            const skillObjects = await Skill.find({ name: { $in: updateFields.skills } });
            updateFields.skills = skillObjects.map(skill => skill._id);
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password")
         .populate("skills", "name"); // Populate skill names after updating

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Profile updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
