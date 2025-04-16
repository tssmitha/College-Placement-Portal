import React from "react";
import ApplicationHeader from "./ApplicationHeader"; // adjust path if needed
import { Container } from "@mui/material";

const mockApplication = {
  companyName: "Google",
  companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  jobTitle: "Software Engineer Intern",
  resumeSubmittedUrl: "https://example.com/resume.pdf",
  jobDescriptionUrl: "https://example.com/job-description.pdf",
  applicationDate: "2025-04-01T10:00:00Z",
};

const TestApplicationHeader = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <ApplicationHeader application={mockApplication} />
    </Container>
  );
};

export default TestApplicationHeader;
