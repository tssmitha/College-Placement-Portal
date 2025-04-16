// src/pages/PersonalEmailPage.jsx

import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PersonalEmailPage() {
  const [personalEmail, setPersonalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5001/api/students/personal-email",
        { personalEmail },
        { withCredentials: true } // ✅ Include cookies if you're using session-based auth
      );

      // On success, redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting personal email", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={10}
        p={4}
        boxShadow={3}
        borderRadius={4}
      >
        <Typography variant="h5" gutterBottom>
          Almost There! 🎉
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" mb={3}>
          Please enter your <strong>personal email</strong> to receive placement notifications and updates.
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Personal Email"
            type="email"
            fullWidth
            required
            value={personalEmail}
            onChange={(e) => setPersonalEmail(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit & Continue"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default PersonalEmailPage;
