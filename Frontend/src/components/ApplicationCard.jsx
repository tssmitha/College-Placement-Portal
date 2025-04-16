import React from "react";
import { Card, CardContent, Typography, Chip, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const statusColors = {
  Pending: { color: "warning", bg: "#FFF3E0" },
  Shortlisted: { color: "success", bg: "#E8F5E9" },
  Rejected: { color: "error", bg: "#FFEBEE" },
  Selected: { color: "primary", bg: "#E3F2FD" },
};

const ApplicationCard = ({ application }) => {
  const job = application.jobId;
  
const navigate = useNavigate();

  if (!job) {
    return (
      <Card sx={{ width: "100%", maxWidth: 350, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No current posting available
          </Typography>
          <Typography variant="body2" textAlign="center">
            This job posting might have been removed or is no longer active.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: 300, // Fixed width
        height: 250, // Fixed height
        borderRadius: 3,
        boxShadow: 4,
        p: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "scale(1.02)" }, // Hover effect
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Company Name */}
        <Typography variant="h6" fontWeight="bold">
          {job.companyName || "Unknown Company"}
        </Typography>

        {/* Job Role */}
        <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
          {job.role || "Unknown Role"}
        </Typography>

        {/* Status Badge */}
        <Chip
          label={application.status}
          sx={{
            backgroundColor: statusColors[application.status]?.bg || "#f5f5f5",
            color: statusColors[application.status]?.color || "default",
            fontWeight: "bold",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            mb: 1.5,
          }}
        />

        {/* Applied Date */}
        <Typography variant="body2" color="textSecondary">
          Applied On: {application.appliedAt ? new Date(application.appliedAt).toDateString() : "Unknown Date"}
        </Typography>

        {/* View Details Button */}
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 2,
            backgroundColor: "#1E88E5",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#1565C0" },
          }}
           onClick={() => navigate(`/applications/${application._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
