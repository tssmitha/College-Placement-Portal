// import React from "react";
// import {
//   Container,
//   Typography,
//   Grid2,
//   Card,
//   CardContent,
//   CardActionArea,
//   Box,
// } from "@mui/material";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import { useNavigate } from "react-router-dom";

// const ResourcesPage = () => {
//   const navigate = useNavigate();

//   const categories = [
//     {
//       title: "DSA Resources",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Learn and practice Data Structures & Algorithms.",
//     },
//     {
//       title: "Aptitude Resources",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Boost your logical reasoning and aptitude.",
//     },
//     {
//       title: "Placement Prep",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Curated materials for placement interviews.",
//     },
//     {
//       title: "Core Subjects",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Notes and materials for core engineering subjects.",
//     },
//     {
//       title: "Company-wise Questions",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Interview questions asked in various companies.",
//     },
//     {
//       title: "Resume Building",
//       icon: <MenuBookIcon fontSize="large" color="primary" />,
//       description: "Tips, samples and tools for resume writing.",
//     },
//   ];

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>s
//         📚 Student Resources
//       </Typography>

//       <Grid2 container spacing={3}>
//         {categories.map((category, index) => (
//           <Grid2 item xs={12} sm={6} md={4} key={index}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 transition: "transform 0.2s ease-in-out",
//                 "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
//               }}
//               onClick={() => navigate(`/resources/${category.title}`)}
//             >
//               <CardActionArea sx={{ height: "100%" }}>
//                 <CardContent
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Box mb={1}>{category.icon}</Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {category.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {category.description}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid2>
//         ))}
//       </Grid2>
//     </Container>
//   );
// };

// export default ResourcesPage;

import React from "react";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";

const ResourcesPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "DSA Resources",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Learn and practice Data Structures & Algorithms.",
    },
    {
      title: "Aptitude Resources",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Boost your logical reasoning and aptitude.",
    },
    {
      title: "Placement Prep",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Curated materials for placement interviews.",
    },
    {
      title: "Core Subjects",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Notes and materials for core engineering subjects.",
    },
    {
      title: "Company-wise Questions",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Interview questions asked in various companies.",
    },
    {
      title: "Resume Building",
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      description: "Tips, samples and tools for resume writing.",
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📚 Student Resources
      </Typography>

      <Grid2 container spacing={3}>
        {categories.map((category, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
              // onClick={() => navigate(`/resources/${category.title}`)}
              onClick={() => navigate(`/resources/${encodeURIComponent(category.title)}`)}
>
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box mb={1}>{category.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ResourcesPage;
