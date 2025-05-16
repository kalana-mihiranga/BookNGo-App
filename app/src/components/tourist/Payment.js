import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { 
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import {
  CreditCard,
  Event as EventIcon,
  Security,
  Person,
  Visibility,
  VisibilityOff,
  CheckCircle
} from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showCvv, setShowCvv] = useState(false);

  const bookingData = state || {};
  const { eventId, priceCategoryId, ticketCount, paymentAmount } = bookingData;

  useEffect(() => {
    if (!eventId || !priceCategoryId || !ticketCount || !paymentAmount) {
      navigate('/');
    }
  }, [eventId, priceCategoryId, ticketCount, paymentAmount, navigate]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === "cardNumber") {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    if (name === "expiryDate" && value.length === 2 && !paymentDetails.expiryDate.includes('/')) {
      value += '/';
    }
    
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const toggleCvvVisibility = () => {
    setShowCvv(!showCvv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        eventId,
        priceCategoryId,
        ticketCount,
        paymentAmount,
        paymentMethod: "Credit Card",
        cardLastFour: paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)
      };

      const response = await axiosInstance.post('/api/tourist/eventBooking', payload);
      setSuccess(true);
      //EMAIL SERVICE
      
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box textAlign="center">
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Payment Successful
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
              sx={{ mt: 3 }}
              fullWidth
            >
              Back to Home
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Payment Details
          </Typography>
          
          <Box sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3, borderRadius: 1 }}>
            <Typography>Tickets: {ticketCount}</Typography>
            <Typography fontWeight="bold">Total: ${paymentAmount?.toFixed(2)}</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                startAdornment: <Person color="action" />
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
                startAdornment: <CreditCard color="action" />
              }}
            />
            
            <Box display="flex" gap={2} mb={2}>
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
                  startAdornment: <EventIcon color="action" />
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
                  startAdornment: <Security color="action" />,
                  endAdornment: (
                    <IconButton onClick={toggleCvvVisibility} edge="end" size="small">
                      {showCvv ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 1, py: 1 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Pay Now'}
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default Payment;