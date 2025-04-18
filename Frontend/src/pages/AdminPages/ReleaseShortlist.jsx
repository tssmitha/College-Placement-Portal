import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";

const ReleaseShortlist = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    jobId: "",
    round: "",
    roundDateTime: "",
    message: "",
    stage: "",
  });
  const [file, setFile] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);

  // 🔄 Fetch active job applications on mount
  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/admin/viewApplications/active", {
          withCredentials: true,
        });
        setActiveJobs(res.data.data || []);
      } catch (err) {
        console.error("Error fetching active job applications", err);
      }
    };
    fetchActiveJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "companyName") {
        // When company is selected, autofill job role and jobId
        const selectedJob = activeJobs.find((job) => job.companyName === value);
        return {
          ...prevData,
          companyName: value,
          jobRole: selectedJob ? selectedJob.role : "",
          jobId: selectedJob ? selectedJob._id : "",
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a shortlist CSV file.");
      return;
    }

    if (!formData.jobId) {
      alert("Please select a job.");
      return;
    }

    const payload = new FormData();
    payload.append("shortlistCsv", file); // 👈 if your backend expects this key

    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost:5001/api/admin/releaseShortlist", payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Shortlist released and emails sent successfully!");
      setFormData({
        companyName: "",
        jobRole: "",
        jobId: "",
        round: "",
        roundDateTime: "",
        message: "",
        stage: "",
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Release Shortlist
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* 🎯 Company Dropdown */}
        <TextField
          select
          fullWidth
          label="Select Company"
          name="jobId"
          value={formData.jobId}
          onChange={handleChange}
          margin="normal"
          required
        >
          {activeJobs.map((job) => (
            <MenuItem key={job._id} value={job._id}>
              {job.companyName}
            </MenuItem>
          ))}
        </TextField>


        {/* Autofill Job Role */}
        <TextField
          fullWidth
          label="Job Role"
          name="jobRole"
          value={formData.jobRole}
          onChange={handleChange}
          margin="normal"
          disabled
        />

        <TextField
          select
          fullWidth
          label="Round Type"
          name="round"
          value={formData.round}
          onChange={handleChange}
          margin="normal"
        >
          {["OA", "Technical", "HR", "Final"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Date & Time"
          name="roundDateTime"
          type="datetime-local"
          value={formData.roundDateTime}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Message to Students"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Stage"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          margin="normal"
        />

        <Box mt={2}>
          <Button variant="outlined" component="label">
            Upload CSV
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography mt={1}>{file.name}</Typography>}
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          Release Shortlist
        </Button>
      </form>
    </Paper>
  );
};

export default ReleaseShortlist;
