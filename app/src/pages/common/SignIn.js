import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useSnackbar } from "notistack";
import "../../styles/common/SignIn.css";
import axiosInstance from "../../utils/axiosInstance";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      enqueueSnackbar("Email and password are required", { variant: "warning" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/signin`, {
        email,
        password
      });

      // Store authentication data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userId', response.data.id);

      enqueueSnackbar(response.data.message, { variant: "success" });

      // Redirect based on role
      switch(response.data.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'TOURIST':
          navigate('/business/dashboard');
          break;
        case 'BUSINESS':
          navigate('/manage-events');
          break;
        default:
          navigate('/');
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signin failed. Please try again.";
      enqueueSnackbar(errorMsg, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            size="small"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ 
              py: 1, 
              mt: 2, 
              backgroundColor: "#143D60",
              '&:disabled': {
                backgroundColor: '#cccccc'
              }
            }}
            startIcon={<LoginIcon />}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

        <Typography variant="body2">
          New here?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignIn;