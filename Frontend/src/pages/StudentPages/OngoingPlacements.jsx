import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import dayjs from "dayjs";

const mockPlacements = [
  {
    companyName: "Google",
    logoUrl: "https://logo.clearbit.com/google.com",
    role: "Software Engineer Intern",
    round: "Technical",
    roundDateTime: "2025-04-20T10:00:00",
    location: "Remote",
  },
  {
    companyName: "HPE",
    logoUrl: "https://logo.clearbit.com/hpe.com",
    role: "SDE Intern",
    round: "HR",
    roundDateTime: "2025-04-21T14:30:00",
    location: "Mysuru",
  },
];

const OngoingPlacementsTable = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        🟡 Ongoing Placements
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Round</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPlacements.map((placement, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={placement.logoUrl}
                      alt={placement.companyName}
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body1">
                      {placement.companyName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{placement.role}</TableCell>
                <TableCell>{placement.round}</TableCell>
                <TableCell>
                  {dayjs(placement.roundDateTime).format("MMM D, YYYY h:mm A")}
                </TableCell>
                <TableCell>{placement.location}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OngoingPlacementsTable;
