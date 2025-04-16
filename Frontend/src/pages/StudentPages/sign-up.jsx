import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import collegeLogo from '../../assets/image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    collegeEmail: '',
    branch: '',
    yearOfPassing: '',
    phone: '',
    dob: '',
  });

  const navigate = useNavigate();

  const branches = [
    'Computer Science & Engineering',
    'Information Science & Engineering',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Artificial Intelligence & Machine Learning',
    'Data Science',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);
    
    try {
      const response = await axios.post("http://localhost:5001/signup", formData, {
        headers: { "Content-Type": "application/json" }, // Ensure correct headers
      });
      
      alert(response.data.message);
      navigate("/personal-email"); // Redirect to login page
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Try again!");
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
      >
         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={collegeLogo} alt="College Logo" style={{ height: 80 }} />
        </Box>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="USN"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="College Email"
            type="email"
            name="collegeEmail"
            value={formData.collegeEmail}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              margin="normal"
              required
              slotProps={{ inputLabel: { shrink: true } }}
              />

          <FormControl fullWidth margin="normal">
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              {branches.map((branch, index) => (
                <MenuItem key={index} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl fullWidth margin="normal">
            <InputLabel>Year of Passing</InputLabel>
            <Select
              name="yearOfPassing"
              value={formData.yearOfPassing}
              onChange={handleChange}
              required
            >
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
