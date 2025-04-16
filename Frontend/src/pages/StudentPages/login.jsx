import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google"; // Using Material UI Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate instead 


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/students/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // alert(response.data.message);
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Card sx={{ padding: "20px", borderRadius: "12px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Hi, Welcome Back! 👋
          </Typography>

          {/* Email Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Show error message */}
          {error && (
            <Typography color="error" textAlign="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* Remember Me and Forgot Password */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />
            <Button sx={{ textTransform: "none", color: "#1976d2" }}>Forgot Password?</Button>
          </div>

          {/* Login Button */}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
            LOGIN
          </Button>

          {/* Divider */}
          {/* <Typography textAlign="center" sx={{ margin: "15px 0", color: "gray" }}>
            ──── Or With ────
          </Typography> */}

          {/* Social Logins
          <Button fullWidth variant="outlined" sx={{ mb: 1, display: "flex", alignItems: "center", gap: "8px" }}>
            <GoogleIcon style={{ color: "#DB4437" }} />
            Login with Google
          </Button> */}

          {/* Sign Up Link */}
          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don’t have an account? <Button sx={{ textTransform: "none", color: "#1976d2" }}  onClick={() => navigate("/signup")} >Sign Up</Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;

