import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  Autocomplete
} from "@mui/material";
import axios from "axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/students/profile", { withCredentials: true });
        setProfile(response.data || {});
        setSkills(response.data.skills || []);
        calculateProgress(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5001/skills");
        console.log(response.data)
        setAllSkills(response.data || []);
        console.log(allSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (event, newValue) => {
    setSkills(newValue);  // newValue should be an array of selected skill objects
    setProfile((prev) => ({ ...prev, skills: newValue }));
  };
  

  const calculateProgress = (data) => {
    const totalFields = Object.keys(data).filter(key => data[key] !== null && data[key] !== undefined).length;
    const filledFields = Object.values(data).filter((val) => val && val !== "").length;
    setProgress(Math.round((filledFields / totalFields) * 100));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5001/api/students/profile", profile, { withCredentials: true });
      setProfile(response.data); // Updating state with new data
      calculateProgress(response.data.student);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" textAlign="center" color="primary" gutterBottom>
          Student Profile
        </Typography>
        <Box textAlign="center" mb={2}>
          <CircularProgress variant="determinate" value={progress} />
          <Typography>{progress}% Completed</Typography>
        </Box>
        <form onSubmit={handleSave}>
          <TextField fullWidth label="Full Name" name="name" value={profile.name || ""} disabled margin="normal" />
          <TextField fullWidth label="USN" name="usn" value={profile.usn || ""} disabled margin="normal" />
          <TextField fullWidth label="College Email" type="email" name="collegeEmail" value={profile.collegeEmail || ""} disabled margin="normal" />
          <TextField fullWidth label="Date of Birth" type="date" name="dob" value={profile.dob || ""} disabled margin="normal" InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="normal" disabled>
            <InputLabel>Branch</InputLabel>
            <Select name="branch" value={profile.branch || ""}>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" disabled>
            <InputLabel>Year of Passing</InputLabel>
            <Select name="yearOfPassing" value={profile.yearOfPassing || ""}>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" gutterBottom mt={3}>Academic Details</Typography>
          <TextField fullWidth label="10th Percentage" name="tenthPercentage" value={profile.tenthPercentage || ""} onChange={handleInputChange} margin="normal" />
          {/* <TextField fullWidth label="10th Marks Card (Google Drive link)" name="tenthMarksCard" value={profile.tenthMarksCard || ""} onChange={handleInputChange} margin="normal" /> */}
          <TextField fullWidth label="12th Percentage" name="twelfthPercentage" value={profile.twelfthPercentage || ""} onChange={handleInputChange} margin="normal" />
          {/* <TextField fullWidth label="12th Marks Card (Google Drive link)" name="twelfthMarksCard" value={profile.twelfthMarksCard || ""} onChange={handleInputChange} margin="normal" /> */}
          <Typography variant="h6" gutterBottom mt={3}>Additional Information</Typography>
          {/* <Autocomplete
            multiple
            options={allSkills}
            getOptionLabel={(option) => option?.name || 'No Name'}  // Ensure 'name' exists
            renderOption={(props, option) => {
              // Ensure option is defined before accessing properties
              if (!option || !option._id) {
                return null;  // Prevent rendering of the option if it's invalid
              }
              return (
                <li {...props} key={option._id.toString()}>
                  {option?.name || 'No Name'}
                </li>
              );
            }}
            value={skills}
            onChange={handleSkillChange}
            renderInput={(params) => (
              <TextField {...params} label="Skills" variant="outlined" />
            )}
          /> */}
          {/* <TextField fullWidth label="Certifications (Google Drive link)" name="certifications" value={profile.certifications || ""} onChange={handleInputChange} margin="normal" /> */}
          <TextField fullWidth label="Resume (Google Drive link)" name="resume" value={profile.resume || ""} onChange={handleInputChange} margin="normal" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
        </form>
      </Box>
    </Container>
  );
};

export default StudentProfile;
