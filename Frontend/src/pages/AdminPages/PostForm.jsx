import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Grid2,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)({
  borderRadius: "16px",
  padding: "20px",
  maxWidth: "700px",
  margin: "40px auto",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
});

const CircularLogo = styled(Avatar)({
  width: "64px",
  height: "64px",
  marginRight: "16px",
});

export default function PostJobForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    ctc: "",
    jobType: "",
    location: "",
    eligibilityCriteria: "",
    deadline: "",
    branchesAllowed: "",
    minCGPA: "",
    backlogsAllowed: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    console.log("Logo selected:", e.target.files[0]);
    setLogoFile(e.target.files[0]);
  };
  
  const handleJdChange = (e) => {
    console.log("JD selected:", e.target.files[0]);
    setJdFile(e.target.files[0]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(data);

    Object.entries(formData).forEach(([key, value]) => {
        console.log(`Appending field: ${key} = ${value}`);
        data.append(key, value);
      });
    
     // Check if files are being appended
     if (logoFile) {
        console.log("Appending logo file:", logoFile.name, logoFile.size);
        data.append("companyLogo", logoFile);
      }
      
      if (jdFile) {
        console.log("Appending JD file:", jdFile.name, jdFile.size);
        data.append("jdPdf", jdFile);

      }
      

  console.log("FormData entries:");
for (let [key, value] of data.entries()) {
  console.log(`${key}: ${value}`);
}


    try {
      const res = await axios.post("http://localhost:5001/api/admin/release-forms", data,{ headers: {
        "Content-Type": "multipart/form-data"
      }});
      console.log("Response:", res.data);
      alert("Job posted successfully!");
      navigate("/admin-released-applications"); // Redirect to admin dashboard

    } catch (error) {
      console.error("Error posting job:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <StyledCard>
      <CardHeader title="Post New Job Application" />
      <CardContent component="form" onSubmit={handleSubmit}>
        <Grid2 container alignItems="center" spacing={2} mb={3}>
          <Grid2 item>
            <CircularLogo src={logoFile ? URL.createObjectURL(logoFile) : ""} />
          </Grid2>
          <Grid2 item xs>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={12}>
            <Button component="label" variant="outlined">
              Upload Company Logo
              <input type="file" accept="image/*" hidden onChange={handleLogoChange} />
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <TextField
              label="Job Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              label="CTC"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              fullWidth
              placeholder='e.g. "Full-Time", "Internship"'
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              label="Eligibility Criteria"
              name="eligibilityCriteria"
              value={formData.eligibilityCriteria}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </Grid2>

          <Grid2 item xs={6}>
            <TextField
              label="Branches Allowed (comma-separated)"
              name="branchesAllowed"
              value={formData.branchesAllowed}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>

          <Grid2 item xs={3}>
            <TextField
              label="Min CGPA"
              name="minCGPA"
              type="number"
              value={formData.minCGPA}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>

          <Grid2 item xs={3}>
            <TextField
              label="Backlogs Allowed"
              name="backlogsAllowed"
              value={formData.backlogsAllowed}
              onChange={handleChange}
              fullWidth
              placeholder='Yes / No'
            />
          </Grid2>

          <Grid2 item xs={6}>
            <TextField
              label="Application Deadline"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              fullWidth
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid2>

          <Grid2 item xs={6}>
            <Button component="label" fullWidth variant="outlined">
              Upload JD (PDF)
              <input type="file" accept=".pdf" hidden onChange={handleJdChange} />
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 container justifyContent="flex-end" mt={4}>
          <Button type="submit" variant="contained" color="primary">
            Post Job
          </Button>
        </Grid2>
      </CardContent>
    </StyledCard>
  );
}
