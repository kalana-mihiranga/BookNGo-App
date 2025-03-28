import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider 
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import "../../styles/common/SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      navigate("/admin-dashboard");
    }
    if (email === "bus@example.com" && password === "admin123") {
      navigate("/manage-events");
    }
    if (email === "tourist@example.com" && password === "admin123") {
      navigate("/");
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
          alignItems: "center" 
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          SignIn
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
            sx={{ py: 1, mt: 2, backgroundColor: '#143D60' }}
            startIcon={<LoginIcon />}
          >
            SignIn
          </Button>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

        <Typography variant="body2">
          New here?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
            SignUp
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignIn;