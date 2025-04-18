// import React from "react";
// import { Card, CardContent, Typography , Grid2} from "@mui/material";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline"; // Applications
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // Ongoing Placements
// import DescriptionIcon from "@mui/icons-material/Description"; // Resume ATS
// import QuizIcon from "@mui/icons-material/Quiz"; // Quiz
// import SchoolIcon from "@mui/icons-material/School"; // Mock Interview
// import MenuBookIcon from "@mui/icons-material/MenuBook"; // Resources
// import { useNavigate } from "react-router-dom";


// const cards = [
//   { title: "Applications", description: "View and manage your job applications" },
//   { title: "Ongoing Placements", description: "Track ongoing placement processes" },
//   { title: "Resume ATS", description: "Check your resume score and optimize it" },
//   { title: "Quiz", description: "Practice subject-wise and aptitude quizzes" },
//   { title: "Mock Interview", description: "AI-powered mock interviews for placements" },
//   { title: "Resources", description: "Study materials and DSA questions" },
//   { title: "Company Reccomendations", description: "Click on to view the similar companies" },
// ];

// const DashboardCards = () => {
//   const navigate = useNavigate();
//     const features = [
//         { title: "Applications", description: "View and manage your job applications", icon: <WorkOutlineIcon fontSize="large" color="primary" /> , route: "/applications",  },
//         { title: "Ongoing Placements", description: "Track ongoing placement processes", icon: <BusinessCenterIcon fontSize="large" color="primary" /> ,},
//         { title: "Resume ATS", description: "Check your resume score and optimize it", icon: <DescriptionIcon fontSize="large" color="primary" /> , route : "/ats-score" ,},
//         { title: "Quiz", description: "Practice subject-wise and aptitude quizzes", icon: <QuizIcon fontSize="large" color="primary" /> },
//         { title: "Mock Interview", description: "AI-powered mock interviews for placements", icon: <SchoolIcon fontSize="large" color="primary" /> },
//         { title: "DSA Practice", description: "Prepare for DSA", icon: <MenuBookIcon fontSize="large" color="primary" /> },
//         { title: "Resources", description: "Study materials and written Notes", icon: <MenuBookIcon fontSize="large" color="primary" />, route:"/resources" },
//       ];

//       const handleCardClick = (route) => {
//         if (route) navigate(route);
//       };
//   return (
//     <Grid2 container spacing={3} justifyContent="center">
//             {features.map((item, index) => (
//               <Grid2 item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                 onClick={() => handleCardClick(item.route)}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     boxShadow: 3,
//                     transition: "transform 0.2s ease-in-out",
//                     "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   {item.icon}
//                   <CardContent>
//                     <Typography variant="h6" fontWeight="bold">
//                       {item.title}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {item.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid2>
//             ))}
//           </Grid2>
//   );
// };

// export default DashboardCards;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"; // Applications
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // Ongoing Placements
import DescriptionIcon from "@mui/icons-material/Description"; // Resume ATS
import SchoolIcon from "@mui/icons-material/School"; // Mock Interview
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Resources
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Applications", description: "View and manage your job applications", icon: <WorkOutlineIcon fontSize="large" color="primary" />, route: "/applications" },
  { title: "Ongoing Placements", description: "Track ongoing placement processes", icon: <BusinessCenterIcon fontSize="large" color="primary" /> },
  { title: "Resume ATS", description: "Check your resume score and optimize it", icon: <DescriptionIcon fontSize="large" color="primary" />, route: "/ats-score" },
  { title: "Mock Interview", description: "AI-powered mock interviews for placements", icon: <SchoolIcon fontSize="large" color="primary" />, route : '/ai-interview' },
  { title: "DSA Practice", description: "Prepare for DSA", icon: <MenuBookIcon fontSize="large" color="primary" /> , route : '/dsa-tracker'},
  { title: "Resources", description: "Study materials and written Notes", icon: <MenuBookIcon fontSize="large" color="primary" />, route: "/resources" },
  { title: "Company Recommendations", description: "Click on to view similar companies", icon: <BusinessCenterIcon fontSize="large" color="primary" />, route: "/company-recommendations" },
  // {titele : "Alumini Connect" , description : "connect with alumini", {fontsize : "large" , color : "primary"} , route : "/alumini-connect"},
  {
    title: "Alumni Connect",
    description: "Connect with alumni",
    icon: <SchoolIcon fontSize="large" color="primary" />,
    route: "/alumini-connect"
  }
  
];

const DashboardCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    if (route) navigate(route);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {features.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            onClick={() => handleCardClick(item.route)}
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%", // Ensures all cards have equal height
            }}
          >
            {item.icon}
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
