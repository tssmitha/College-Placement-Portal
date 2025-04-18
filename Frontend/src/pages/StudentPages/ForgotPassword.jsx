import { useState } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/students/forgot-password', { email });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error sending reset link');
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 30, marginTop: 60 }}>
        <Typography variant="h5">Forgot Password</Typography>
        <TextField
          fullWidth
          label="College Email ID"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSend}>
          Send Reset Link
        </Button>
        {msg && <Typography style={{ marginTop: 15 }}>{msg}</Typography>}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
