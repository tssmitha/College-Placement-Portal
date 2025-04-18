import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Tabs, Tab, Typography, CircularProgress, TextField , Grid2 } from '@mui/material';
import JobCard from './JobCard';
import axios from 'axios';

const ApplicationsPage = () => {
  const [tab, setTab] = useState(0);
  const [activeJobs, setActiveJobs] = useState([]);
  const [pastJobs, setPastJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchAppText, setSearchAppText] = useState('');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const jobsToDisplay = tab === 0 ? activeJobs : pastJobs;

  const filteredJobs = jobsToDisplay.filter(job => {
    const company = job?.companyName?.toLowerCase() || '';
    const role = job?.jobRole?.toLowerCase() || '';
    const search = searchAppText.toLowerCase();
    return company.includes(search) || role.includes(search);
  });
  

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.warn("Token not found in localStorage!");
        return;
      }

      try {
        const [activeRes, pastRes] = await Promise.all([
          axios.get('http://localhost:5001/api/admin/viewApplications/active', {
            headers: { Authorization: `Bearer ${token}`,withCredentials: true }
          }),
          axios.get('http://localhost:5001/api/admin/viewApplications/past', {
            headers: { Authorization: `Bearer ${token}` ,withCredentials : true}
          }),
        ]);

        setActiveJobs(activeRes.data.data);
        setPastJobs(pastRes.data.data);
        setLoading(false);

        console.log("📢 Active Jobs Response:", activeRes.data.data);
        console.log("📁 Past Jobs Response:", pastRes.data.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box p={3}>
    
      <Typography variant="h4" mb={2}>Job Applications</Typography>
      <TextField
        label="Search Applications"
        variant="outlined"
        size="small"
        value={searchAppText}
        onChange={(e) => setSearchAppText(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="📢 Active Applications" />
        <Tab label="📁 Past Applications" />
      </Tabs>

      {loading ? (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 container spacing={2} mt={2}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid2 item xs={12} sm={6} md={4} key={job._id}>
                <JobCard job={job} />
              </Grid2>
            ))
          ) : (
            <Box mt={4} textAlign="center" width="100%">
              <Typography>No jobs to display.</Typography>
            </Box>
          )}
        </Grid2>
      )}
    </Box>
  );
};

export default ApplicationsPage;
