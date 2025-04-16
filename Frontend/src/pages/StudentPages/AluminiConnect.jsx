import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlumniData from "../../data/aluminidata";
import boy_img from "../../assets/boy.png";
import women_img from "../../assets/women.png";

const AlumniConnect = () => {
  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton href="/">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={1}>
          Alumni Connect
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {AlumniData.map((alumnus) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={alumnus.id}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                component="img"
                src={alumnus.gender === "male" ? boy_img : women_img}
                alt="alumni"
                sx={{
                  height: 120,
                  width: 120,
                  objectFit: "cover",
                  borderRadius: "50%",
                  mx: "auto",
                  my: 2,
                }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="alumni-name"
                  gutterBottom
                >
                  {alumnus.name}
                </Typography>

                <Box display="flex" alignItems="center" mb={1} justifyContent="center">
                  <EmojiEventsIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Graduation Year: {alumnus.graduationYear}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1} justifyContent="center">
                  <BusinessIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Company: {alumnus.company}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2} justifyContent="center">
                  <WorkIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Position: {alumnus.position}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#222",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                  fullWidth
                  onClick={() => window.open(alumnus.connectLink, "_blank")}
                >
                  Connect
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlumniConnect;
