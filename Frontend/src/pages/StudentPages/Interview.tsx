// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Typography, TextField, Button, CircularProgress, Paper, Box } from '@mui/material';

// const InterviewPage: React.FC = () => {
//   interface LocationState {
//     questions?: { question: string }[];
//     jobRole?: string;
//     experience?: string;
//     techStack?: string;
//   }

//   const location = useLocation() as { state: LocationState };
  
//   const questions = location.state?.questions || [];
//   const jobRole = location.state?.jobRole || '';
//   const experience = location.state?.experience || '';
//   const techStack = location.state?.techStack || '';

//   const navigate = useNavigate();
//   console.log("Location State:", location);

//   const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
//   const [loading, setLoading] = useState(false);

//   const handleAnswerChange = (index: number, value: string) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = value;
//     setAnswers(updatedAnswers);
//   };

//   const submitAnswers = async () => {
//     setLoading(true);

//     const userAnswers = questions.map((q, index) => ({
//       question: q.question,
//       answer: answers[index] || ''
//     }));

//     try {
//       const response = await axios.post("http://localhost:5001/api/ai/", {
//         jobRole, 
//         experience, 
//         techStack,
//         userAnswers
//       });
      
//       console.log("Response" , response.data.feedback);
//       sessionStorage.setItem("feedback", JSON.stringify(response.data.feedback));
//     // navigate('/feedback');

//     //   navigate('/feedback', { state: { feedback: response.data.feedback } });
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log("Questions Array:", questions);


//   return (
//     <Box sx={{ padding: 2, backgroundColor: '#f5f7fa' }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Interview Questions
//       </Typography>

//       {questions.length > 0 ? (
//         questions.map((q, index) => (
//           <Paper key={index} sx={{ padding: 2, marginBottom: 2, boxShadow: 3 }}>
//             <Typography variant="h6">{q.question}</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//               value={answers[index]}
//               onChange={(e) => handleAnswerChange(index, e.target.value)}
//               placeholder="Type your answer here..."
//               sx={{ marginTop: 2 }}
//             />
//           </Paper>
//         ))
//       ) : (
//         <Typography>No questions available.</Typography>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={submitAnswers}
//         disabled={questions.length === 0 || loading}
//         sx={{ marginTop: 2 }}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Submit Answers'}
//       </Button>
//     </Box>
//   );
// };

// export default InterviewPage;

// pages/InterviewPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';

const InterviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { qaPairs, jobRole, experience, techStack } = location.state;

  const [userAnswers, setUserAnswers] = useState<string[]>(qaPairs.map(() => ""));

  const handleChange = (index: number, value: string) => {
    const updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    const updatedPairs = qaPairs.map((pair: any, index: number) => ({
      ...pair,
      userAnswer: userAnswers[index]
    }));

    navigate('/feedback', {
      state: {
        qaPairs: updatedPairs,
        jobRole,
        experience,
        techStack
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>Answer the Questions</Typography>

      {qaPairs.map((pair: any, index: number) => (
        <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h6">{pair.question}</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Answer"
            value={userAnswers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </Paper>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit & Get Feedback</Button>
    </Container>
  );
};

export default InterviewPage;
