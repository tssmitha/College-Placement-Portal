// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Divider
// } from '@mui/material';

// const Feedback: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   let parsedFeedback = [];
//   try {
//     const raw = sessionStorage.getItem("feedback");
//     if (raw && raw !== "undefined") {
//       parsedFeedback = JSON.parse(raw);
//     }
//   } catch (error) {
//     console.error("Failed to parse feedback from sessionStorage:", error);
//   }
  

//   const stateFeedback = (location.state as any)?.feedback;
// const feedback = stateFeedback || parsedFeedback;

// if (stateFeedback) {
//   sessionStorage.setItem("feedback", JSON.stringify(stateFeedback));
// }

// console.log("Feedback received:", feedback);

  

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Feedback
//       </Typography>

//       <Divider sx={{ mb: 3 }} />

//       {feedback.length > 0 ? (
//         <Grid container spacing={3}>
//           {feedback.map((f: any, index: number) => (
//             <Grid item xs={12} key={index}>
//               <Card elevation={3}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     Q{index + 1}. {f.question}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" gutterBottom>
//                     <strong>Your Answer:</strong> {f.userAnswer}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" gutterBottom>
//                     <strong>Correct Answer:</strong> {f.correctAnswer}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 1 }}>
//                     <strong>Feedback:</strong> {f.feedback}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="body1" align="center" sx={{ mt: 5 }}>
//           No feedback available.
//         </Typography>
//       )}

//       <Box sx={{ textAlign: 'center', mt: 4 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={() => navigate('/')}
//         >
//           Finish
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Feedback;


// pages/FeedbackPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Container } from '@mui/material';

const FeedbackPage: React.FC = () => {
  const location = useLocation();
  const { qaPairs, jobRole } = location.state;

  const simpleScore = (user: string, correct: string) => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, '');
    return normalize(user).includes(normalize(correct).slice(0, 15))
      ? "👍 Close!"
      : "🧐 Needs improvement";
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>Feedback for {jobRole}</Typography>

      {qaPairs.map((pair: any, index: number) => (
        <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h6">❓ {pair.question}</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1" color="primary">💬 Your Answer:</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>{pair.userAnswer}</Typography>

            <Typography variant="subtitle1" color="secondary">✅ Suggested Answer:</Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>{pair.answer}</Typography>

            <Typography variant="subtitle2">💡 Feedback: {simpleScore(pair.userAnswer, pair.answer)}</Typography>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default FeedbackPage;
