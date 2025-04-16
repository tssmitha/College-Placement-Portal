// src/components/ATSScore.js

import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Stack, Chip } from "@mui/material";
import { CheckCircle, Close } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

// ✅ Custom Snackbar Component
const AlertSnackbar = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ATSScore = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJDFile] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // or 'error'

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      showSnackbar("✅ Resume uploaded successfully!", "success");
    }
  };

  const handleJDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJDFile(file);
      showSnackbar("✅ Job description uploaded successfully!", "success");
    }
  };

  const handleUpload = async () => {
    if (!resumeFile || !jdFile) {
      setError("Please upload both resume and job description.");
      showSnackbar("Please upload both resume and job description.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jdFile);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/ats/upload", formData);

    //   const response = await axios.post(
    //     `${process.env.REACT_APP_FLASK_API}/upload`,
    //     formData
    //   );
      

      if (response.data.score) {
        setScore(response.data.score);
        setError(null);
        showSnackbar("✅ Score calculated successfully!", "success");
      } else if (response.data.error) {
        setError(response.data.error);
        showSnackbar(response.data.error, "error");
      }
    } catch (err) {
      setError("Error uploading files. Please try again.");
      showSnackbar("🚨 Error uploading files. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        ATS Resume Score Checker
      </Typography>

      {/* Resume Upload */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={resumeFile ? "contained" : "outlined"}
          component="label"
          color={resumeFile ? "success" : "primary"}
          fullWidth
        >
          {resumeFile ? "Change Resume (PDF)" : "Upload Resume (PDF)"}
          <input type="file" hidden accept=".pdf" onChange={handleResumeUpload} />
        </Button>
        {resumeFile && (
          <Chip
            icon={<CheckCircle />}
            label={resumeFile.name}
            color="success"
            onDelete={() => setResumeFile(null)}
            deleteIcon={<Close />}
          />
        )}
      </Stack>

      {/* JD Upload */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant={jdFile ? "contained" : "outlined"}
          component="label"
          color={jdFile ? "success" : "primary"}
          fullWidth
        >
          {jdFile ? "Change Job Description (PDF)" : "Upload Job Description (PDF)"}
          <input type="file" hidden accept=".pdf" onChange={handleJDUpload} />
        </Button>
        {jdFile && (
          <Chip
            icon={<CheckCircle />}
            label={jdFile.name}
            color="success"
            onDelete={() => setJDFile(null)}
            deleteIcon={<Close />}
          />
        )}
      </Stack>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Checking..." : "Get ATS Score"}
      </Button>

      {loading && <LinearProgress sx={{ my: 2 }} />}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {score !== null && (
        <Card sx={{ mt: 4, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h5">
              Your Resume Score: <strong>{score}%</strong>
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {score >= 80
                ? "✅ Great match for the job!"
                : "⚠️ Consider improving your resume to match the job better."}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* 🔔 Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <AlertSnackbar
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </AlertSnackbar>
      </Snackbar>
    </Container>
  );
};

export default ATSScore;
