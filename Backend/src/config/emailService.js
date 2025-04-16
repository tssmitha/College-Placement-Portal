const Student = require("../models/Student");
const PlacedStudent = require("../models/PlacedStudent");
const sendApprovalEmail = require("../config/emailService");

exports.approveStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.status = "Approved";
    await student.save();

    // Send approval email
    sendApprovalEmail(student.collegeEmail, student.dob);

    res.json({ success: true, message: "Student approved and email sent." });
  } catch (err) {
    res.status(500).json({ message: "Error approving student", error: err });
  }
};

exports.markStudentPlaced = async (req, res) => {
  try {
    const { company, role, ctc } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    student.status = "Placed";
    await student.save();

    const placedStudent = new PlacedStudent({
      studentId: student._id,
      name: student.name,
      usn: student.usn,
      collegeEmail: student.collegeEmail,
      branch: student.branch,
      company,
      role,
      ctc,
    });

    await placedStudent.save();
    res.json({ success: true, message: "Student marked as placed." });
  } catch (err) {
    res.status(500).json({ message: "Error updating placement status", error: err });
  }
};
