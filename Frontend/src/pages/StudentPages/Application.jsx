import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications } from "../../Redux/slices/applicationSlice";
import { 
  Container, Typography, CircularProgress, Box 
} from "@mui/material";
import { Grid2 } from "@mui/material";
import ApplicationCard from "../../components/ApplicationCard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";


const ApplicationPage = () => {
  const dispatch = useDispatch();
  const { applications = [], loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        fontWeight="bold"
      >
        My Applications
      </Typography>

      {/* Show Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress size={50} />
        </Box>
      )}

      {/* Show Error Message */}
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {/* Show Empty State */}
      {!loading && applications.length === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          height="50vh"
        >
          <HourglassEmptyIcon sx={{ fontSize: 70, color: "gray" }} />
          <Typography variant="h6" color="gray" mt={2}>
            No applications found.
          </Typography>
        </Box>
      )}

      {/* Show Applications Grid2 */}
      {Array.isArray(applications) && applications.length > 0 ? (
  <Grid2 container spacing={3} justifyContent="center">
    {applications.map((app) => (
      <Grid2 item xs={12} sm={6} md={4} key={app._id}>
        <ApplicationCard application={app} />
      </Grid2>
    ))}
  </Grid2>
) : (
  !loading && (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
      <HourglassEmptyIcon sx={{ fontSize: 70, color: "gray" }} />
      <Typography variant="h6" color="gray" mt={2}>
        No applications found.
      </Typography>
    </Box>
  )
)}

    </Container>
  );
};

export default ApplicationPage;
