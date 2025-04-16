import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const PlacedStudentsPage = () => {
  const { companyId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacedStudents = async () => {
      try {
        const res = await fetch(`http://localhost:5001/companies/${companyId}/placed-students`);
        if (!res.ok) throw new Error('Failed to fetch data');
        
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacedStudents();
  }, [companyId]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Placed Students</Typography>
      {loading ? (
        <CircularProgress />
      ) : students.length === 0 ? (
        <Typography>No students placed for this company.</Typography>  
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>USN</strong></TableCell>
                <TableCell><strong>Branch</strong></TableCell>
                <TableCell><strong>Year of Passing</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {students.map((student) => (
                <TableRow key={student._id}> {/* Use unique _id as key */}
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.usn}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.yearOfPassing}</TableCell>
                <TableCell>{student.email}</TableCell>
                </TableRow>
            ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PlacedStudentsPage;
