const JobApplication = require("../models/JobApplication");

// Get job application progress
exports.getApplicationProgress = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findById(applicationId).select("progress");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ progress: application.progress });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Update progress of a job application
exports.updateApplicationProgress = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { stage, status } = req.body;

    console.log("Received stage:", stage);  // Log what is received
    console.log("Received status:", status);

    // Allowed Stages (to maintain order)
    const allowedStages = [
      "Applied",
      "Resume Shortlisted",
      "Online Assessment",
      "Technical Interview",
      "HR Interview",
      "Offer Extended",
      "Selected",
    ];

    // Find the application
    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if the stage is valid
    if (!allowedStages.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    // Check stage order (Prevent skipping stages)
    const currentStages = application.progress.map((p) => p.stage);
    const lastCompletedStageIndex = allowedStages.findIndex((s) => currentStages.includes(s));

    if (lastCompletedStageIndex + 1 < allowedStages.indexOf(stage)) {
      return res.status(400).json({ message: "Stages must be updated in order" });
    }

    // Find if the stage already exists
    const existingStage = application.progress.find((p) => p.stage === stage);

if (existingStage) {
  if (existingStage.status === "Completed") {
    return res.status(400).json({ message: "This stage is already completed and cannot be modified." });
  }
  
  // Prevent downgrading from "Completed" to "Pending"
  if (existingStage.status === "Completed" && status !== "Completed") {
    return res.status(400).json({ message: "Cannot change a completed stage back to pending." });
  }

  existingStage.status = status;
  existingStage.updatedAt = new Date();
} else {
  // Ensure stages are updated in order
  const currentStages = application.progress.map((p) => p.stage);
  const lastCompletedStageIndex = allowedStages.findIndex((s) => currentStages.includes(s));
  const newStageIndex = allowedStages.indexOf(stage);

  if (newStageIndex !== lastCompletedStageIndex + 1) {
    return res.status(400).json({ message: "Stages must be updated in order." });
  }

  application.progress.push({
    stage,
    status,
    updatedAt: new Date(),
  });
}
const JobApplication = require("../models/JobApplication");

// Get job application progress
exports.getApplicationProgress = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findById(applicationId).select("progress");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ progress: application.progress });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Update progress of a job application
exports.updateApplicationProgress = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { stage, status } = req.body;

    console.log("Received stage:", stage);  // Log what is received
    console.log("Received status:", status);

    // Allowed Stages (to maintain order)
    const allowedStages = [
      "Applied",
      "Resume Shortlisted",
      "Online Assessment",
      "Technical Interview",
      "HR Interview",
      "Offer Extended",
      "Selected",
    ];

    // Find the application
    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if the stage is valid
    if (!allowedStages.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    // Check stage order (Prevent skipping stages)
    const currentStages = application.progress.map((p) => p.stage);
    const lastCompletedStageIndex = allowedStages.findIndex((s) => currentStages.includes(s));

    if (lastCompletedStageIndex + 1 < allowedStages.indexOf(stage)) {
      return res.status(400).json({ message: "Stages must be updated in order" });
    }

    // Find if the stage already exists
    const existingStage = application.progress.find((p) => p.stage === stage);

if (existingStage) {
  if (existingStage.status === "Completed") {
    return res.status(400).json({ message: "This stage is already completed and cannot be modified." });
  }
  
  // Prevent downgrading from "Completed" to "Pending"
  if (existingStage.status === "Completed" && status !== "Completed") {
    return res.status(400).json({ message: "Cannot change a completed stage back to pending." });
  }

  existingStage.status = status;
  existingStage.updatedAt = new Date();
} else {
  // Ensure stages are updated in order
  const currentStages = application.progress.map((p) => p.stage);
  const lastCompletedStageIndex = allowedStages.findIndex((s) => currentStages.includes(s));
  const newStageIndex = allowedStages.indexOf(stage);

  if (newStageIndex !== lastCompletedStageIndex + 1) {
    return res.status(400).json({ message: "Stages must be updated in order." });
  }

  application.progress.push({
    stage,
    status,
    updatedAt: new Date(),
  });
}

  } catch (error) {
    console.error("Error updating application progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add notification for stage change
application.notifications.push({
  message: `Your application has moved to ${stage} stage.`,
  createdAt: new Date(),
});

// Save changes
await application.save();


  } catch (error) {
    console.error("Error updating application progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get notifications of a job application
exports.getApplicationNotifications = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findById(applicationId).select("notifications");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ notifications: application.notifications });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


