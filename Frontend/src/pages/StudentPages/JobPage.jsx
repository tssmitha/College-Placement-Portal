import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import ApplicationsRolledOut from "./ApplicationsRolledOut";
import AppliedApplications from "./AppliedApplications";

const JobPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Job Opportunities
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="Applications Rolled Out" />
        <Tab label="Applied Applications" />
      </Tabs>

      <Box mt={3}>
        {tabIndex === 0 && <ApplicationsRolledOut />}
        {tabIndex === 1 && <AppliedApplications />}
      </Box>
    </Box>
  );
};

export default JobPage;
