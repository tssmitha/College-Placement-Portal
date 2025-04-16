// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
// import axios from 'axios';

// const Aiinterview: React.FC = () => {
//   const [jobRole, setJobRole] = useState('');
//   const [experience, setExperience] = useState('');
//   const [techStack, setTechStack] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const startInterview = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5001/api/ai/", {
//         jobRole, experience, techStack
//       });
  
//       const qaPairs = response.data.questions;
//  // your backend returns: { questions: [ ... ] }
  
//       navigate('/interview', {
//         state: {
//           qaPairs,
//           jobRole, 
//           experience, 
//           techStack
//         }
//       });
//     } catch (error) {
//       console.error("Error starting interview:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
//       <Box textAlign="center" marginBottom={4}>
//         <Typography variant="h4">Interview Prep</Typography>
//       </Box>

//       <TextField
//         label="Job Role"
//         variant="outlined"
//         fullWidth
//         value={jobRole}
//         onChange={(e) => setJobRole(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
      
//       <TextField
//         label="Years of Experience"
//         variant="outlined"
//         type="number"
//         fullWidth
//         value={experience}
//         onChange={(e) => setExperience(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />

//       <TextField
//         label="Tech Stack"
//         variant="outlined"
//         fullWidth
//         value={techStack}
//         onChange={(e) => setTechStack(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />

//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={startInterview}
//         sx={{ marginBottom: 2 }}
//         disabled={loading}
//       >
//         Start Interview
//       </Button>

//       {loading && (
//         <Box display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Aiinterview;
// pages/InterviewPage.tsx
// pages/Aiinterview.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const Aiinterview: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/ai/", {
        jobRole, experience, techStack
      });

      const qaPairs = response.data.questions;

      const transformed = qaPairs.map((pair: any) => ({
        ...pair,
        userAnswer: ""
      }));

      navigate('/interview', {
        state: {
          qaPairs: transformed,
          jobRole,
          experience,
          techStack
        }
      });
    } catch (error) {
      console.error("Error starting interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h4">Interview Prep</Typography>
      </Box>

      <TextField label="Job Role" variant="outlined" fullWidth value={jobRole} onChange={(e) => setJobRole(e.target.value)} sx={{ marginBottom: 2 }} />
      <TextField label="Years of Experience" variant="outlined" type="number" fullWidth value={experience} onChange={(e) => setExperience(e.target.value)} sx={{ marginBottom: 2 }} />
      <TextField label="Tech Stack" variant="outlined" fullWidth value={techStack} onChange={(e) => setTechStack(e.target.value)} sx={{ marginBottom: 2 }} />

      <Button variant="contained" color="primary" fullWidth onClick={startInterview} disabled={loading}>
        Start Interview
      </Button>

      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
    </Container>
  );
};

export default Aiinterview;
