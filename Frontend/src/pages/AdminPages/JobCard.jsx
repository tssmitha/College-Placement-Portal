import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  CardActions,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const JobCard = ({ job }) => {
    const navigate = useNavigate(); // ⬅️ Add this

    const handleViewDetails = () => {
      navigate(`/admin/jobs/${job._id}`);
    };
  return (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {job.companyName}
        </Typography>

        <Typography color="text.secondary" gutterBottom>
          {job.role}
        </Typography>

        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
          <Chip icon={<WorkIcon />} label={job.jobType} />
          <Chip icon={<LocationOnIcon />} label={job.location} />
          <Chip icon={<AccessTimeIcon />} label={`Deadline: ${formatDate(job.deadline)}`} />
        </Stack>

        <Typography variant="body2" mt={1}>
          <strong>CTC:</strong> {job.ctc}
        </Typography>

        {job.eligibilityCriteria && (
          <Typography variant="body2" mt={1}>
            <strong>Eligibility:</strong> {job.eligibilityCriteria}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="outlined"
          href={job.jobDescriptionPdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          View JD
        </Button>
      </CardActions>
      <CardActions>
        <Button variant="contained" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
