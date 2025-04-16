import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    Stack,
    Skeleton,
  } from "@mui/material";
  import DownloadIcon from "@mui/icons-material/Download";
  import { useState } from "react";
  
  const ApplicationHeader = ({ application }) => {
    const {
      companyName,
      companyLogo,
      jobTitle,
      resumeSubmittedUrl,
      jobDescriptionUrl,
      applicationDate,
    } = application;
  
    const [logoLoaded, setLogoLoaded] = useState(false);
  
    return (
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          p: 3,
          mb: 4,
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Company Info */}
            <Stack direction="row" spacing={2} alignItems="center">
              {!logoLoaded && (
                <Skeleton variant="circular" width={64} height={64} />
              )}
              <Avatar
                src={companyLogo}
                alt={companyName}
                sx={{
                  width: 64,
                  height: 64,
                  display: logoLoaded ? "inline-flex" : "none",
                }}
                onLoad={() => setLogoLoaded(true)}
              />
              <Stack>
                <Typography variant="h6">{companyName}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {jobTitle}
                </Typography>
                {applicationDate && (
                  <Typography variant="body2" color="text.secondary">
                    Applied on {new Date(applicationDate).toLocaleDateString()}
                  </Typography>
                )}
              </Stack>
            </Stack>
  
            {/* Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                href={resumeSubmittedUrl}
                target="_blank"
                disabled={!resumeSubmittedUrl}
              >
                View Resume
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                href={jobDescriptionUrl}
                target="_blank"
                disabled={!jobDescriptionUrl}
              >
                Download JD
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  };
  
  export default ApplicationHeader;
  