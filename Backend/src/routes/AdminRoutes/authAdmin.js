const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../../controllers/adminAuth');
console.log("🔐 Admin auth route hit");

router.post('/login', loginAdmin);

module.exports = router;
