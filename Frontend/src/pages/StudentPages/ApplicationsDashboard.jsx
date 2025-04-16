import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid2
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationsDashboard = () => {
  const [tab, setTab] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [appliedApplications, setAppliedApplications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all available jobs
    axios
      .get('http://localhost:5001/api/students/jobs', { withCredentials: true })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          console.warn('Jobs data is not an array:', res.data);
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      });

    // Fetch applied applications
    axios
      .get('http://localhost:5001/api/students/applications', { withCredentials: true })
      .then((res) => {
        const applications = res.data;
        setAppliedApplications(applications);
        const appliedIds = applications.map((app) => app.jobId?._id);
        setAppliedJobIds(appliedIds);
      })
      .catch((err) => {
        console.error('Error fetching applied applications:', err);
      });
  }, []);

  const unappliedJobs = jobs.filter((job) => !appliedJobIds.includes(job._id));

  return (
    <Box sx={{ p: 3 }}>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Applications Rolled Out" />
        <Tab label="Applied Applications" />
      </Tabs>

      {/* Tab 0: Applications Rolled Out */}
      {tab === 0 && (
        <Box>
          {unappliedJobs.length === 0 ? (
            <Typography variant="body1" textAlign="center" mt={4}>
              No job applications rolled out yet.
            </Typography>
          ) : (
            <Grid2 container direction="column" spacing={3}>
              {unappliedJobs.map((job, index) => (
                <Grid2 item key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      p: 2,
                      maxWidth: 600,
                      mx: 'auto',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {job.companyName}
                      </Typography>
                      <Typography variant="subtitle1">{job.role}</Typography>
                      <Box sx={{ my: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: 'inline-block',
                            backgroundColor: '#f57c00',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontWeight: 500,
                          }}
                        >
                          Deadline:{' '}
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : 'N/A'}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/jobs/${job._id}`)}
                      >
                        View & Apply
                      </Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      )}

      {/* Tab 1: Applied Applications */}
      {tab === 1 && (
        <Box>
          {'appliedApplications'.length === 0 ? (
            <Typography textAlign="center" mt={4}>
              No applied applications yet.
            </Typography>
          ) : (
            <Grid2 container direction="column" spacing={3}>
              {appliedApplications.map((application, index) => (
                <Grid2 item key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 2,
                      p: 2,
                      maxWidth: 600,
                      mx: 'auto',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {application.jobId.companyName}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        {application.jobId.role}
                      </Typography>

                      <Chip
                        label={application.status}
                        color={
                          application.status === 'Pending'
                            ? 'warning'
                            : application.status === 'Shortlisted'
                            ? 'success'
                            : application.status === 'Rejected'
                            ? 'error'
                            : 'info'
                        }
                        sx={{ mb: 1 }}
                      />

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Applied On:</strong>{' '}
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </Typography>

                      {application.resumeUrl && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Resume:</strong>{' '}
                          <a
                            href={application.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'underline' }}
                          >
                            View Resume
                          </a>
                        </Typography>
                      )}

                      {application.jobId.jobDescriptionPdf && (
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Job Description:</strong>{' '}
                          <a
                            href={application.jobId.jobDescriptionPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'underline' }}
                          >
                            Download JD
                          </a>
                        </Typography>
                      )}

                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigate(`/applications/${application._id}`)
                        }
                        sx={{ mt: 1 }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ApplicationsDashboard;
