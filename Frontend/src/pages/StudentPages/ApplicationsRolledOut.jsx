import { Box, Typography, Paper } from "@mui/material";

const ApplicationsRolledOut = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Available Jobs
      </Typography>
      {/* Map through jobs here later */}
      <Paper elevation={3} className="p-4">
        Example Job Card — You'll fetch job listings here
      </Paper>
    </Box>
  );
};

export default ApplicationsRolledOut;
