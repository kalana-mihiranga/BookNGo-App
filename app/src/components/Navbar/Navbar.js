import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';  
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom";

export default function Navbar() {
  const buttonStyles = {
    borderColor: '#143D60',
    color: '#143D60',
    '&:hover': {
      backgroundColor: '#143D60',
      color: '#A0C878',
      borderColor: '#143D60',
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#A0C878',
          color: '#143D60'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            BOOKNGO
          </Typography>

          <Box sx={{ flexGrow: 1 }} />


          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button  
              variant="outlined" 
              startIcon={<LoginIcon />}
              sx={buttonStyles}
            >
                       <Link to="/signin">Sign In</Link>
            </Button>
         
            <Button 
              variant="outlined" 
              startIcon={<PersonAddIcon />}
              sx={buttonStyles}
            >
          <Link to="/signup">Sign Up</Link>
            </Button>
  
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}