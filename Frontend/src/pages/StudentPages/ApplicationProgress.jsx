import { Stepper, Step, StepLabel, Box, Typography, Paper, Divider } from "@mui/material";
const stages = [
    "Applied",
    "Resume Shortlisted",
    "Online Assessment",
    "Technical Interview",
    "HR Interview",
    "Offer Extended",
    "Selected",
  ];

  const ApplicationProgress = ({ application }) => {
    const progressData = application?.progress || [];
  
    const completedStages = progressData.filter((stage) => stage.status === "Completed");
    const completedStageNames = completedStages.map((stage) => stage.stage);
  
    const getActiveStep = () => {
      const index = stages.findIndex((stage) => !completedStageNames.includes(stage));
      return index === -1 ? stages.length : index;
    };
  
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Application Progress
        </Typography>
  
        {/* Stepper */}
        <Stepper activeStep={getActiveStep()} alternativeLabel>
          {stages.map((label) => (
            <Step key={label} completed={completedStageNames.includes(label)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
  
        {/* Detailed Info */}
        <Box mt={4}>
          {completedStages.map((stage, index) => (
            <Paper
              key={stage.stage}
              elevation={2}
              sx={{
                p: 2,
                mb: 2,
                borderLeft: "6px solid #4caf50", // green accent
                backgroundColor: "background.default",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                ✅ {stage.stage}
              </Typography>
              {stage.date && (
                <Typography variant="body2" color="text.secondary">
                  Completed on: {new Date(stage.date).toLocaleDateString()}
                </Typography>
              )}
              {stage.feedback && (
                <Typography variant="body2" mt={1}>
                  💬 {stage.feedback}
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    );
  };
  

export default ApplicationProgress;
