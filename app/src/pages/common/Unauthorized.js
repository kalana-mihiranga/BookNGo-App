// src/pages/common/Unauthorized.js
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';

const Unauthorized = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back to previous page
  };

  return (
    <Container maxWidth="md" sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      py: 4
    }}>
      <Box sx={{
        backgroundColor: theme.palette.error.light,
        width: 80,
        height: 80,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
      }}>
        <ErrorOutlineIcon sx={{ 
          fontSize: 48,
          color: theme.palette.error.contrastText 
        }} />
      </Box>

      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Access Denied
      </Typography>
      
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        403 - Unauthorized
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 600 }}>
        You don't have permission to access this page. Please contact the administrator if you believe this is an error.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleGoBack}
          size="large"
          sx={{
            backgroundColor: theme.palette.grey[700],
            '&:hover': { backgroundColor: theme.palette.grey[800] }
          }}
        >
          Go Back
        </Button>
        
        <Button
          variant="contained"
          onClick={handleGoHome}
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark }
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;