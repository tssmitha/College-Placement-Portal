import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, TextField, MenuItem, Grid, Button, Typography, Select, InputLabel, FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const jobTypes = ['Full-Time', 'Internship', 'PPO'];
const sortOptions = [
  { value: 'visitDate', label: 'Visit Date (Newest First)' },
  { value: 'ctc', label: 'CTC (Highest First)' }
];

const CompanyTable = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);

    let query = [];
    if (searchName) query.push(`name=${searchName}`);
    if (filterJobType) query.push(`jobType=${filterJobType}`);
    if (filterYear) query.push(`visitYear=${filterYear}`);

    const queryString = query.length ? `?${query.join('&')}` : '';

    try {
      const response = await fetch(`http://localhost:5001/companies/${queryString}`);
      let data = await response.json();

      // Client-side sorting
      if (sortBy === 'visitDate') {
        data.sort((a, b) => {
          const aDate = new Date(a.visitYear, parseInt(a.visitMonth || 0));
          const bDate = new Date(b.visitYear, parseInt(b.visitMonth || 0));
          return bDate - aDate;
        });
      } else if (sortBy === 'ctc') {
        data.sort((a, b) => {
          const extractNum = (val) =>
            val && val.toLowerCase().includes('lpa')
              ? parseFloat(val.replace(/[^\d.]/g, ''))
              : 0;
          return extractNum(b.ctc) - extractNum(a.ctc);
        });
      }

      setCompanies(data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleFilter = () => {
    fetchCompanies();
  };

  const handleViewStudents = (companyId) => {
    navigate(`/companies/${companyId}/placed-students`);
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, mt: 1 }}>
        📊 Companies Visited
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by Company Name"
              variant="outlined"
              fullWidth
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Filter by Job Type"
              fullWidth
              value={filterJobType}
              onChange={(e) => setFilterJobType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Visit Year"
              type="number"
              variant="outlined"
              fullWidth
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="">Default</MenuItem>
                {sortOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button variant="contained" fullWidth onClick={handleFilter}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Company Name</strong></TableCell>
                <TableCell><strong>Visit Month</strong></TableCell>
                <TableCell><strong>Visit Year</strong></TableCell>
                <TableCell><strong>Job Role</strong></TableCell>
                <TableCell><strong>Job Type</strong></TableCell>
                <TableCell><strong>CTC</strong></TableCell>
                <TableCell><strong>Stipend</strong></TableCell>
                <TableCell><strong>Students Placed</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company, index) => (
                <TableRow key={index}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.visitMonth}</TableCell>
                  <TableCell>{company.visitYear}</TableCell>
                  <TableCell>{company.jobRole || 'N/A'}</TableCell>
                  <TableCell>{company.jobType}</TableCell>
                  <TableCell>{company.ctc}</TableCell>
                  <TableCell>{company.stipend || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleViewStudents(company._id)}>
                    View Placed Students
                    </Button>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default CompanyTable;
