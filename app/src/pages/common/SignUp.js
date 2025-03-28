import React from "react";
import { Link } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Divider
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import "../../styles/common/SignUp.css";

function SignUp() {
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
          SignUp
        </Typography>

        <Box component="form" sx={{ width: "100%", mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            size="small"
            autoComplete="name"
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
            autoComplete="email"
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
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            size="small"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="small"
            sx={{ py: 1, mt: 2, backgroundColor: '#143D60' }}
            startIcon={<PersonAddIcon />}
          >
            SignUp
          </Button>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

        <Typography variant="body2">
          Already have an account?{" "}
          <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
            SignIn
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignUp;