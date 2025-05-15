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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      enqueueSnackbar("Email and password are required", { variant: "warning" });
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/api/signin", payload);
      const successMessage = response.data?.message || "Signin successful!";
      enqueueSnackbar(successMessage, { variant: "success" });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      clearForm();

      const role = response.data.role;
      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "BUSINESS") {
        navigate("/manage-events");
      } else if (role === "TOURIST") {
        navigate("/");
      }
      logUserdata();
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Signin failed. Please try again.";
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };


const logUserdata = async () => {
  try {
    const response = await axiosInstance.get("/api/tourist/userDetails");
    console.log("Logged in user details:", response.data.user);
     localStorage.setItem("userId", response.data.user.id);
    return response.data.user;
  } catch (err) {
    console.error("Failed to fetch user data", err);
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
            sx={{ py: 1, mt: 2, backgroundColor: "#143D60" }}
            startIcon={<LoginIcon />}
          >
            Sign In
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
