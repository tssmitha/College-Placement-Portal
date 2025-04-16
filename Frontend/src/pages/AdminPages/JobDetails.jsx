import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Chip, Stack, CircularProgress, Button, Container , TextField, MenuItem
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ViewApplicantsTable from './ViewApplicantsTable';
import JobAnalytics from './JobAnalytics';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterBranch, setFilterBranch] = useState('');



  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await axios.get(`http://localhost:5001/api/admin/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job", err);
      }
    };

    fetchJob();
  }, [jobId]);

  // 🧠 Move this outside useEffect
const handleExportCSV = async () => {
    const token = localStorage.getItem("adminToken");
  
    try {
      const response = await axios.get(`http://localhost:5001/api/admin/exportApplicants/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${job.companyName}_${job.role}_Applicants.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("CSV Download Failed", err);
    }
  };
  

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <CircularProgress />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
  {/* Job Info - Minimal & Fully Inline */}
  <Box mb={4}>
    <Typography variant="h5" fontWeight={600}>
      {job.companyName} - {job.role}
    </Typography>

    <Stack direction="row" spacing={1} mt={1.5} mb={2} flexWrap="wrap">
      <Chip icon={<WorkIcon />} label={job.jobType || "Internship"} size="small" variant="outlined" />
      <Chip icon={<LocationOnIcon />} label={job.location || "Remote"} size="small" variant="outlined" />
      <Chip icon={<AccessTimeIcon />} label={`Deadline: ${formatDate(job.deadline)}`} size="small" variant="outlined" />
      <Chip label={`CTC: ${job.ctc || "N/A"}`} size="small" variant="outlined" />
      <Chip label={`Eligibility: ${job.eligibilityCriteria || "Not specified"}`} size="small" variant="outlined" />
      {job.jobDescriptionPdf && (
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            height: '32px', // to match Chip height
            paddingX: 1.5,
          }}
          href={job.jobDescriptionPdf}
          target="_blank"
        >
          View JD
        </Button>
      )}
    </Stack>
  </Box>
  <Box mt={6} display="flex" justifyContent="space-between" alignItems="center">
  <Typography variant="h5" justifyContent={"center"}>Applicants</Typography>
  </Box>


  {/* Applicant Table */}
  <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2, mb: 3, width: '100%' }}>
  <TextField
    label="Search Applicants"
    variant="outlined"
    size="small"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    sx={{ flexGrow: 1 }} // takes most of the width
  />
  
  <TextField
    select
    label="Filter by Branch"
    variant="outlined"
    size="small"
    value={filterBranch}
    onChange={(e) => setFilterBranch(e.target.value)}
    sx={{ width: 200 }} // fixed width for filter
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="CSE">CSE</MenuItem>
    <MenuItem value="ISE">ISE</MenuItem>
    <MenuItem value="ECE">ECE</MenuItem>
    <MenuItem value="EEE">EEE</MenuItem>
  </TextField>

</Box>

  <Box>
  <ViewApplicantsTable jobId={jobId} searchText={searchText} filterBranch={filterBranch} />


  
  <Button
    onClick={handleExportCSV}
    variant="outlined"
    startIcon={<FileDownloadIcon />}
    sx={{ textTransform: 'none' }}
  >
    Export CSV
  </Button>
</Box>

<Box mt={6}>
  <JobAnalytics jobId={jobId} />
</Box>

</Container>

  );
};

export default JobDetails;
