import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function SignUp() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    clearForm();
  };

  const clearForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.push("Invalid email format");

    if (!formData.password) errors.push("Password is required");
    if (formData.password.length < 6)
      errors.push("Password must be at least 6 characters");
    if (formData.password !== formData.confirmPassword)
      errors.push("Passwords do not match");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => enqueueSnackbar(err, { variant: "warning" }));
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: tabValue === 0 ? "TOURIST" : "BUSINESS",
    };

    try {
      const response = await axios.post(`${baseURL}/api/signup`, payload);
      const successMessage = response.data?.message || "Signup successful!";
      enqueueSnackbar(successMessage, { variant: "success" });
      setTimeout(() => {
        clearForm();
        navigate("/signin");
      }, 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Signup failed. Please try again.";
      enqueueSnackbar(errorMsg, { variant: "error" });
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
          Sign Up
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Tourist" />
          <Tab label="Business" />
        </Tabs>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={tabValue === 0 ? "Name" : "Business Name"}
            name="name"
            size="small"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
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
            size="small"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            size="small"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            sx={{ py: 1, mt: 2, backgroundColor: "#143D60" }}
            startIcon={<PersonAddIcon />}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignUp;
