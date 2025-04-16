import { Card, CardContent, Grid2, Typography, Chip, Link } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';

<Card sx={{ mt: 4, p: 2 }}>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Application Submission Details
    </Typography>
    <Grid2 container spacing={2}>
      <Grid2 item xs={12} sm={6}>
        <BusinessIcon fontSize="small" />{" "}
        <Typography variant="body1" component="span">
          <strong>Company:</strong> {application.job?.companyName || "N/A"}
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <TagIcon fontSize="small" />{" "}
        <Typography variant="body1" component="span">
          <strong>Role:</strong> {application.job?.jobTitle || "N/A"}
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <CalendarMonthIcon fontSize="small" />{" "}
        <Typography variant="body1" component="span">
          <strong>Applied On:</strong> {new Date(application.appliedAt).toLocaleDateString()}
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Chip
          label={application.status}
          color={
            application.status === "Selected"
              ? "success"
              : application.status === "Rejected"
              ? "error"
              : application.status === "Shortlisted"
              ? "primary"
              : "warning"
          }
        />
      </Grid2>
      <Grid2 item xs={12}>
        <DescriptionIcon fontSize="small" />{" "}
        <Typography variant="body1" component="span">
          <strong>Resume Submitted:</strong>{" "}
          <Link href={application.resumeUrl} target="_blank" rel="noopener">
            View Resume
          </Link>
        </Typography>
      </Grid2>
    </Grid2>
  </CardContent>
</Card>
