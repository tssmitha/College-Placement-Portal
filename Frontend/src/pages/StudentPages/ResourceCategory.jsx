import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


const CategoryResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryTitle } = useParams();


  useEffect(() => {
    console.log("Category from URL:", categoryTitle);
    const fetchResources = async () => {
      try {
        
        // console.log(`Fetching from: http://localhost:5001/api/students/resources?category=${encodeURIComponent(categoryTitle)}`);
        const cleanedCategory = categoryTitle.split(' ')[0];  // Take only the first part (e.g., "DSA")
console.log(`Fetching from: http://localhost:5001/api/students/resources?category=${encodeURIComponent(cleanedCategory)}`);
const res = await axios.get(`http://localhost:5001/api/students/resources?category=${encodeURIComponent(cleanedCategory)}`);

        setResources(res.data.resources);
      } catch (err) {
        console.error("Failed to fetch resources", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [categoryTitle]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📚 {categoryTitle} Resources
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Grid2 container spacing={3}>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Grid2 item xs={12} sm={6} md={4} key={resource._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{resource.fileName}</Typography>
                    <Button
                      variant="outlined"
                      href={resource.downloadUrl}
                      target="_blank"
                    >
                      View / Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <Typography>No resources available for this category.</Typography>
          )}
        </Grid2>
      )}
    </Container>
  );
};

export default CategoryResourcesPage;
