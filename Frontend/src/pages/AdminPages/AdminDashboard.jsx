import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from "react-router-dom";


const actions = [
  {
    title: "View Applications",
    description: "Check how many students applied and track their status.",
    buttonLabel: "VIEW APPLICATIONS",
    icon: <WorkIcon color="primary" fontSize="large" />,
    buttonColor: "primary",
    navigateTo: "/admin-released-applications",
  },

  {
    title: "Release Shortlist",
    description: "Upload shortlist and notify selected students via email.",
    buttonLabel: "RELEASE SHORTLIST",
    icon: <CheckCircleIcon color="success" fontSize="large" />,
    buttonColor: "success",
  },
  {
    title: "Post New Application",
    description: "Upload JD and eligibility to release a new job role.",
    buttonLabel: "POST APPLICATION",
    icon: <PostAddIcon color="info" fontSize="large" />,
    buttonColor: "primary",
  },
  {
    title: "Upload Resources",
    description: "Upload prep materials or drive links to guide students.",
    buttonLabel: "UPLOAD",
    icon: <MenuBookIcon color="secondary" fontSize="large" />,
    buttonColor: "secondary",
  },
  {
    title: "Collect Interview Questions",
    description: "Automate feedback collection after interviews.",
    buttonLabel: "COLLECT NOW",
    icon: <UploadFileIcon color="warning" fontSize="large" />,
    buttonColor: "warning",
  },
  {
    title: "Placement Dashboard",
    description: "Visualize 3-year stats and track live placement progress.",
    buttonLabel: "VIEW DASHBOARD",
    icon: <BarChartIcon sx={{ color: "#009688" }} fontSize="large" />,
    buttonColor: "inherit",
  },
];

export default function AdminDashboard() {
    const navigate = useNavigate();
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
        Manage placement workflows and track progress all in one place.
      </Typography>

      <Grid container spacing={3} justifyContent="center" mt={2}>
        {actions.map((action, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ minHeight: 200, borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                  {action.icon}
                  <Typography variant="h6">{action.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {action.description}
                </Typography>
                <Button
  variant="contained"
  color={action.buttonColor}
  onClick={() => action.navigateTo && navigate(action.navigateTo)}
>
  {action.buttonLabel}
</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
