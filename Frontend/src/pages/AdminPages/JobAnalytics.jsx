// src/components/JobAnalytics.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobAnalytics = ({ jobId }) => {
  const [branchData, setBranchData] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchAnalytics = async () => {
      try {
        const [branchRes, cgpaRes] = await Promise.all([
          axios.get(`http://localhost:5001/api/admin/applicantStats/byBranch/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:5001/api/admin/applicantStats/cgpaDist/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setBranchData(branchRes.data);
        setCgpaData(cgpaRes.data);
      } catch (err) {
        console.error('Error fetching analytics', err);
      }
    };

    fetchAnalytics();
  }, [jobId]);

  const barChartData = branchData ? {
    labels: Object.keys(branchData),
    datasets: [{
      label: 'Applicants by Branch',
      data: Object.values(branchData),
      backgroundColor: '#1976d2'
    }]
  } : null;

  const pieChartData = cgpaData ? {
    labels: Object.keys(cgpaData),
    datasets: [{
      label: 'CGPA Distribution',
      data: Object.values(cgpaData),
      backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336', '#9c27b0']
    }]
  } : null;

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        📊 Applicant Analytics
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={4}>
        {barChartData && (
          <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
            <Typography variant="subtitle1" gutterBottom>By Branch</Typography>
            <Bar data={barChartData} />
          </Paper>
        )}

        {pieChartData && (
          <Paper sx={{ p: 2, flex: 1, minWidth: 300 }}>
            <Typography variant="subtitle1" gutterBottom>CGPA Distribution</Typography>
            <Pie data={pieChartData} />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default JobAnalytics;
