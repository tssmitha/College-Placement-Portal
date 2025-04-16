import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Divider,
    Stack,
    Avatar,
    Link,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
  import axios from 'axios';
  
  const JobDetailsPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get(`http://localhost:5001/api/students/jobs/${jobId}`, { withCredentials: true })
        .then((res) => {
          setJob(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load job details');
          setLoading(false);
        });
    }, [jobId]);
  
    const handleApply = () => {
      setIsApplying(true);
      axios
  .post(`http://localhost:5001/api/students/apply/${jobId}`, {}, { withCredentials: true })
  .then(() => {
    navigate(`/apply/${jobId}`);
  })
  .catch((err) => {
    console.error('Failed to apply:', err);
    alert('Application failed. Try again.');
    setIsApplying(false);
  });
 

     
    };
  
    const isDeadlineSoon = (dateStr) => {
      if (!dateStr) return false;
      const deadline = new Date(dateStr);
      const today = new Date();
      const diff = (deadline - today) / (1000 * 60 * 60 * 24);
      return diff <= 3;
    };
  
    if (loading)
      return (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    if (error)
      return (
        <Box textAlign="center" mt={4}>
          <Typography>{error}</Typography>
        </Box>
      );
  
    return (
      <Box
        sx={{
          mt: 6,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 720,
            p: 4,
            borderRadius: 4,
            boxShadow: 6,
            bgcolor: 'background.paper',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src={job.companyLogo || ''}
                alt={job.companyName}
                sx={{
                  width: 56,
                  height: 56,
                  mr: 2,
                  bgcolor: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                {!job.companyLogo && job.companyName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {job.companyName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {job.role}
                </Typography>
              </Box>
            </Box>
  
            <Divider sx={{ my: 3 }} />
  
            <Stack spacing={2} sx={{ px: 2 }}>
              <Typography>
                <strong>💰 CTC:</strong> {job.ctc}
              </Typography>
              <Typography>
                <strong>🧑‍💼 Job Type:</strong> {job.jobType}
              </Typography>
              <Typography>
                <strong>📍 Location:</strong> {job.location}
              </Typography>
              <Typography>
                <strong>✅ Eligibility:</strong> {job.eligibilityCriteria || 'Not specified'}
              </Typography>
              <Typography sx={{ color: isDeadlineSoon(job.deadline) ? 'error.main' : 'inherit' }}>
                <strong>📅 Deadline:</strong>{' '}
                {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}
              </Typography>
            </Stack>
  
            <Divider sx={{ my: 3 }} />
  
            <Stack spacing={2} direction="column">
              <Button
                variant="outlined"
                href={job.jobDescriptionPdf}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                View JD PDF
              </Button>
  
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
  
        <Box width="100%" maxWidth={720} mb={2} mt={2}>
          <Link component={RouterLink} to="/applications" underline="hover" color="primary">
            ← Back to Applications
          </Link>
        </Box>
      </Box>
    );
  };
  
  export default JobDetailsPage;
  