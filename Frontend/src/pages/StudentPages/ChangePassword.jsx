import { useState } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';

const ChangePassword = () => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = async () => {
    if (newPass !== confirm) return setMsg('New passwords do not match!');
    try {
      const res = await axios.post('http://localhost:5001/api/students/change-password', {
        currentPassword: current,
        newPassword: newPass
      }, { withCredentials: true }); // Assuming you're using cookies
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 30, marginTop: 60 }}>
        <Typography variant="h5">Change Password</Typography>
        <TextField
          fullWidth
          label="Current Password"
          type="password"
          margin="normal"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleChange}>
          Change Password
        </Button>
        {msg && <Typography style={{ marginTop: 15 }}>{msg}</Typography>}
      </Paper>
    </Container>
  );
};

export default ChangePassword;
