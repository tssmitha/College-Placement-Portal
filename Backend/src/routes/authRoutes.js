const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/authController");
const {getAllStudents} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginStudent);
router.get("/signup" , getAllStudents);

module.exports = router;
