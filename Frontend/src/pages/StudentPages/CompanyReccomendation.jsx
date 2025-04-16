import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";

const CompanyRecommendation = () => {
  const [companyName, setCompanyName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!companyName) {
      setError("Please enter a company name.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/recommend/${companyName}`);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError("Error fetching recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Company Recommendations
      </Typography>

      <TextField
        label="Enter Company Name"
        fullWidth
        value={companyName}
        onChange={handleInputChange}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Get Recommendations"}
      </Button>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        recommendations.length > 0 && (
          <Box sx={{ marginTop: 4 }}>
            {recommendations.map((rec, index) => (
              <Card sx={{ marginBottom: 2 }} key={index}>
                <CardContent>
                  <Typography variant="h6">{rec}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )
      )}
    </Box>
  );
};

export default CompanyRecommendation;
