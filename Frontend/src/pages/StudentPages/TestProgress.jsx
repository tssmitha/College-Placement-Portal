import React from "react";
import ApplicationProgress from "./ApplicationProgress";

const mockApplication = {
  progress: [
    { stage: "Applied", status: "Completed" },
    { stage: "Resume Shortlisted", status: "Completed" },
    { stage: "Online Assessment", status: "Completed" },
    { stage: "Technical Interview", status: "Pending" },
  ],
};

const TestProgress = () => {
  return (
    <div style={{ padding: 32 }}>
      <ApplicationProgress application={mockApplication} />
    </div>
  );
};

export default TestProgress;
