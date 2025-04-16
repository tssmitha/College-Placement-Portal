import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Avatar,
    Grid,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useParams, useNavigate } from "react-router-dom";
  
  const ApplyPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [job, setJob] = useState(null);
    const [resumeUrl, setResumeUrl] = useState("");
    const [selectedRole, setSelectedRole] = useState("SDE");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [profileRes, jobRes] = await Promise.all([
            axios.get("http://localhost:5001/api/students/profile", {
              withCredentials: true,
            }),
            axios.get(`http://localhost:5001/api/students/jobs/${jobId}`, {
              withCredentials: true,
            }),
          ]);
          setProfile(profileRes.data);
          setJob(jobRes.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching data", err);
        }
      };
  
      fetchData();
    }, [jobId]);
  
    const handleSubmit = async () => {
      if (!resumeUrl) {
        alert("Please enter resume URL 📎");
        return;
      }
  
      try {
        await axios.post(
          "http://localhost:5001/api/students/apply",
          {
            jobId,
            resumeUrl,
          },
          { withCredentials: true }
        );
        alert("🎯 Application submitted!");
        navigate("/applications");
      } catch (err) {
        console.error(err);
        alert("Error submitting application 😢");
      }
    };
  
    if (loading) return <Typography mt={4}>Loading...</Typography>;
  
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar src={job.logoUrl} alt={job.companyName} />
            <Typography variant="h5" fontWeight="bold">
              Apply to {job.companyName}
            </Typography>
          </Box>
  
          <Divider sx={{ my: 2 }} />
  
          {/* Profile Info */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Your Details
          </Typography>
          <Grid container spacing={2}>
            {[
              ["Name", profile.name],
              ["USN", profile.usn],
              ["College Email", profile.collegeEmail],
              ["Phone", profile.phone],
              ["DOB", new Date(profile.dob).toLocaleDateString()],
              ["Branch", profile.branch],
              ["Year of Passing", profile.yearOfPassing],
              ["Current Semester", profile.currentSemester],
              ["10th %", profile.tenthPercentage],
              ["12th %", profile.twelfthPercentage],
              ["CGPA", profile.currentCGPA],
            ].map(([label, value]) => (
              <Grid item xs={12} sm={6} key={label}>
                <TextField
                  label={label}
                  value={value || "Not Available"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    input: { color: "gray" },
                  }}
                />
              </Grid>
            ))}
          </Grid>
  
          <Divider sx={{ my: 3 }} />
  
          {/* Role Selection */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Select Role
          </Typography>
          <RadioGroup
            row
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <FormControlLabel value="SDE" control={<Radio />} label="SDE" />
            <FormControlLabel value="Data Analyst" control={<Radio />} label="Data Analyst" />
          </RadioGroup>
  
          {/* Resume URL */}
          <TextField
            fullWidth
            label="Resume URL"
            variant="outlined"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            sx={{ mt: 3 }}
          />
  
          {/* Submit */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Submit Application
          </Button>
        </Paper>
      </Box>
    );
  };
  
  export default ApplyPage;
  