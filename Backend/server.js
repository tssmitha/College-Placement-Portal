const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const path = require('path');
const authRoutes = require("./src/routes/authRoutes");
const skills = require("./src/routes/Skills");
const verifiedStudent = require("./src/routes/VerifiedStudents");
const signup = require("./src/routes/Signup");
const adminAuthRoutes = require('./src/routes/AdminRoutes/authAdmin');
const sendJobDeadlineReminders = require('./src/cron/sendJobDeadlineReminders');
const company = require('./src/routes/CompanyRoutes');
dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const loadRoutes = (dirPath, baseRoute) => {
  fs.readdirSync(dirPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const route = require(path.join(dirPath, file));
      app.use(baseRoute, route);
    }
  });
};

// Connect to MongoDB
connectDB();

app.use(cookieParser()); 

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminAuthRoutes);
// console.log("🧠 adminAuthRoutes loaded: ", adminAuthRoutes);


loadRoutes(path.join(__dirname, 'src/routes/StudentRoutes'), '/api/students');

// Load all Admin Routes
loadRoutes(path.join(__dirname, 'src/routes/AdminRoutes'), '/api/admin');

//ai routes
loadRoutes(path.join(__dirname, 'src/routes/AI'), '/api/ai');


app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));


app.use("", skills);
app.use("/verifiedStudents", verifiedStudent);
app.use("/signup", signup);
app.use("/companies", company);
app.use("/api/test", require("./src/routes/AdminRoutes/emailTest"));
// app.use("/sendJobDeadlineReminders", sendJobDeadlineReminders);
// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
