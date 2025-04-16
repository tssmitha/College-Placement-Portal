import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import DashboardCards from "./dashboardcards";

const DashboardLayout = () => {
    
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3 }}>
          <DashboardCards />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;