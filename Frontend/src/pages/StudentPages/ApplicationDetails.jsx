// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// // At the top of your file
// import {
//     Stepper,
//     Step,
//     StepLabel,
//     StepContent,
//     Typography,
//     Paper
//   } from "@mui/material";
  
// // At the top of your file
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ComputerIcon from "@mui/icons-material/Computer";
// import PeopleIcon from "@mui/icons-material/People";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import axios from "axios";

// const ApplicationDetails = () => {
//   const { applicationId } = useParams();
//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/students/");
//         setApplication(res.data);
//       } catch (err) {
//         console.error("Error fetching application:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplication();
//   }, [applicationId]);

//   if (loading) return <CircularProgress className="m-6" />;

//   if (!application) return <Typography>No application found.</Typography>;

  
// {application.interviewRounds?.length === 0 && (
//   <Paper elevation={0} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
//     <Typography>No interview rounds recorded yet.</Typography>
//   </Paper>
// )}


//   const getStageIcon = (status) => {
//     switch (status) {
//       case "Completed":
//         return <CheckCircleIcon color="success" />;
//       case "Rejected":
//         return <CancelIcon color="error" />;
//       case "Technical Interview":
//         return <ComputerIcon />;
//       case "HR Interview":
//         return <PeopleIcon />;
//       case "Online Assessment":
//         return <AssignmentIcon />;
//       default:
//         return <AccessTimeIcon />;
//     }
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <Card className="mb-4 shadow-md rounded-2xl">
//         <CardContent>
//           <Typography variant="h5" className="font-semibold mb-2">
//             {application.jobTitle} @ {application.companyName}
//           </Typography>
//           <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//   Interview Rounds & Feedback
// </Typography>

// <Stepper orientation="vertical" nonLinear activeStep={-1}>
//   {application.interviewRounds?.map((round, index) => (
//     <Step key={index} expanded>
//       <StepLabel
//         icon={getStageIcon(round.status)}
//         optional={
//           <Typography variant="caption" color="text.secondary">
//             {new Date(round.updatedAt).toLocaleString()}
//           </Typography>
//         }
//       >
//         Round {round.roundNumber} — {round.status}
//       </StepLabel>
//       <StepContent>
//         <Typography>
//           {round.feedback ? round.feedback : "No feedback available yet."}
//         </Typography>
//       </StepContent>
//     </Step>
//   ))}
// </Stepper>

//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ApplicationDetails;

import {
    Card,
    CardContent,
    Divider,
    Typography,
    CircularProgress,
    Box,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  import ApplicationHeader from "./ApplicationHeader";
  import ApplicationProgress from "./ApplicationProgress";
  // import InterviewRounds from "./InterviewRounds"; // next
  // import JDAndResumeSection from "./JDAndResumeSection"; // coming
  // import WithdrawButton from "./WithdrawButton"; // optional
  
  const ApplicationDetails = () => {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchApplication = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5001/api/application/${applicationId}`
          );
          setApplication(res.data);
        } catch (err) {
          console.error("Error fetching application:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchApplication();
    }, [applicationId]);
  
    if (loading) return <CircularProgress className="m-6" />;
    if (!application) return <Typography>No application found.</Typography>;
  
    return (
      <Box className="p-4 md:p-8">
        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent>
            <ApplicationHeader application={application} />
            <Divider sx={{ my: 2 }} />
            <ApplicationProgress application={application} />
            <Divider sx={{ my: 2 }} />
  
            {/* Placeholder for next components */}
            {/* <InterviewRounds rounds={application.interviewRounds} /> */}
            {/* <JDAndResumeSection jd={application.jd} resume={application.resume} /> */}
            {/* <WithdrawButton status={application.status} id={application._id} /> */}
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default ApplicationDetails;
  
