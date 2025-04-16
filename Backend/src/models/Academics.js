const mongoose = require("mongoose");

const studentAcademicSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    markscards: [
        {
            semester: { type: Number, required: true },
            filePath: { type: String, required: true }
        }
    ]
});

const StudentAcademic = mongoose.model("StudentAcademic", studentAcademicSchema);

module.exports = StudentAcademic;  // ✅ Correctly Exported
