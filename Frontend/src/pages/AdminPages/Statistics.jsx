import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { year: 2022, placed: 70, total: 100 },
  { year: 2023, placed: 85, total: 100 },
  { year: 2024, placed: 92, total: 100 }
];

const branchData = [
  { branch: 'CSE', placed: 92 },
  { branch: 'ECE', placed: 75 }
];

const calculateInsight = (branch) => {
  const data2023 = branchData.find(b => b.branch === branch);
  const data2024 = branchData.find(b => b.branch === branch);
  if (!data2023 || !data2024) return '';
  
  const increase = ((data2024.placed - data2023.placed) / data2023.placed) * 100;
  return `${branch} saw a ${increase.toFixed(2)}% ${increase > 0 ? 'increase' : 'decrease'} in placements from 2023 to 2024.`;
};

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Placement Dashboard
      </Typography>
      <Typography variant="h6" paragraph>
        Statistics for Previous Years
      </Typography>

      {/* Yearly Placements Bar Chart */}
      <Grid container spacing={4} justifyContent="space-around">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Placements Per Year
              </Typography>
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Branch-wise Placements Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                2024 Branch-wise Placements
              </Typography>
              <PieChart width={400} height={400}>
                <Pie data={branchData} dataKey="placed" nameKey="branch" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                  {branchData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />)}
                </Pie>
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Insight Cards */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Insights
              </Typography>
              <Typography variant="body1">{calculateInsight("CSE")}</Typography>
              <Typography variant="body1">{calculateInsight("ECE")}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
