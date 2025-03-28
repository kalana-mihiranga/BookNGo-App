import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  CreditCard,
  Event,
  Security,
  Person,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Payment() {
  const { eventId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [showCvv, setShowCvv] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date with slash
    if (name === "expiryDate" && value.length === 2 && !paymentDetails.expiryDate.includes('/')) {
      value += '/';
    }
    
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const toggleCvvVisibility = () => {
    setShowCvv(!showCvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
  };

  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      <Container 
        maxWidth="sm" 
        sx={{ 
          py: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            width: '100%'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              color: 'primary.main',
              textAlign: 'center'
            }}
          >
            Secure Payment
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 3,
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            Booking for Event #{eventId}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Cardholder Name"
              name="cardholderName"
              value={paymentDetails.cardholderName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              margin="normal"
              required
              inputProps={{ maxLength: 19 }}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ maxLength: 5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Event color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type={showCvv ? "text" : "password"}
                value={paymentDetails.cvv}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ maxLength: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle cvv visibility"
                        onClick={toggleCvvVisibility}
                        edge="end"
                        size="small"
                      >
                        {showCvv ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3,
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              Confirm Payment
            </Button>
          </form>
          
          <Box sx={{ 
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <Security color="success" fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              Your payment is secured with 256-bit encryption
            </Typography>
          </Box>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
}

export default Payment;