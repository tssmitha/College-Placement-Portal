const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Skill name (e.g., "JavaScript", "Machine Learning")
});

module.exports = mongoose.model("Skill", skillSchema);
