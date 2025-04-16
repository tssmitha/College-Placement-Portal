import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, TableContainer, Typography, CircularProgress
} from '@mui/material';
import axios from 'axios';

const ViewApplicantsTable = ({ jobId, searchText , filterBranch }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const token = localStorage.getItem("adminToken");

  const lowerSearch = searchText.toLowerCase();

  const filteredApplicants = applicants.filter((student) => {
    const matchesSearch =
      (student.name && student.name.toLowerCase().includes(lowerSearch)) ||
      (student.usn && student.usn.toLowerCase().includes(lowerSearch)) ||
      (student.personalEmail && student.personalEmail.toLowerCase().includes(lowerSearch)) ||
      (student.collegeEmail && student.collegeEmail.toLowerCase().includes(lowerSearch)) ||
      (student.branch && student.branch.toLowerCase().includes(lowerSearch));
  
    const matchesBranch =
      !filterBranch || (student.branch && student.branch.toLowerCase() === filterBranch.toLowerCase());
  
    return matchesSearch && matchesBranch;
  });
  
  

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/admin/viewApplicants/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplicants(res.data.applicants);
      } catch (error) {
        console.error("Error fetching applicants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (applicants.length === 0) {
    return <Typography>No applicants yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>USN</strong></TableCell>
            <TableCell><strong>Branch</strong></TableCell>
            <TableCell><strong>CGPA</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Resumes</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredApplicants.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.usn}</TableCell>
              <TableCell>{student.branch}</TableCell>
              <TableCell>{student.currentCGPA || "N/A"}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.personalEmail || student.collegeEmail}</TableCell>
              <TableCell>
                {student.resumes.length > 0 ? (
                  student.resumes.map((resume, i) => (
                    <a
                      key={i}
                      href={resume.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', color: '#1976d2' }}
                    >
                      {resume.tag || `Resume ${i + 1}`}
                    </a>
                  ))
                ) : (
                  "No Resume"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewApplicantsTable;
