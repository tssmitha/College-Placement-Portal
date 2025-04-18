import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(true); // Flag to check if token is valid
  const navigate = useNavigate();

  // Check if the token is valid when the page loads
  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`http://localhost:5001/api/students/reset-password/${token}`);
      } catch (err) {
        setIsTokenValid(false);
        setMsg('The reset link is invalid or has expired.');
      }
    };

    validateToken();
  }, [token]);

  // Handle password reset submission
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMsg('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5001/api/students/reset-password/${token}`, {
        newPassword,
      });
      setMsg(res.data.msg);
      // Optionally redirect to login after successful reset
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error resetting password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 30, marginTop: 60 }}>
        <Typography variant="h5">Reset Password</Typography>
        
        {!isTokenValid && <Typography color="error">{msg}</Typography>}

        {isTokenValid && (
          <>
            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
              Reset Password
            </Button>
            {msg && <Typography style={{ marginTop: 15 }}>{msg}</Typography>}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
