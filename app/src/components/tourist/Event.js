import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Schedule
} from '@mui/icons-material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Event = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = location.state || {};
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (eventId) {
      axiosInstance.get(`/api/business/getEventById/${eventId}`)
        .then(res => {
          setEvent(res.data.body);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [eventId]);

   const handleBook = () => {
     navigate('/payment', {
    state: {
      eventId: event.id,
      priceCategoryId: selectedTicket.id,
      ticketCount: quantity,
      paymentAmount: selectedTicket.price * quantity
    }
  });
};

  if (loading) return (

    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (!event) return (
    <Box textAlign="center" mt={4}>
      <Typography>Event not found</Typography>
    </Box>
  );

return (
  <Box>
    <Navbar />

    <Container  maxWidth={false}
  sx={{
    py: 4,
    px: 2,
    width: '70%',
    maxWidth: '1280px',
    mx: 'auto',
  }}>
      <Grid container spacing={4} sx={{ml:'5%'}}>

        
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: 'auto' }}>
            <CardMedia
              component="img"
              image={event.bannerUrl}
              alt={event.name}
              sx={{width: '100%', height: 300,objectFit: 'cover', display: 'block'}}/>
          </Card>
          <Card>
{/* Enhanced Event Details Section */}
<Box>
  <Grid  spacing={3}>
    {/* Specifications */}
    <Grid item xs={12} md={6} >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: "#f9fafb",
          borderColor: "divider"
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="600"
          color="primary"
          gutterBottom
        >
          Specifications
        </Typography>
        {event.specifications.length > 0 ? (
          <List dense disablePadding>
            {event.specifications.map((spec) => (
              <ListItem key={spec.id} disableGutters>
                <ListItemText primary={`• ${spec.specName}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No specifications listed.
          </Typography>
        )}
      </Paper>
    </Grid>

    {/* Conditions */}
    <Grid item xs={12} md={6}>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: "#f9fafb",
          borderColor: "divider"
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="600"
          color="secondary"
          gutterBottom
        >
          Conditions
        </Typography>
        {event.conditions.length > 0 ? (
          <List dense disablePadding>
            {event.conditions.map((cond) => (
              <ListItem key={cond.id} disableGutters>
                <ListItemText primary={`• ${cond.condition}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No conditions specified.
          </Typography>
        )}
      </Paper>
    </Grid>
  </Grid>

  {/* Refund Policy */}
  <Box>
    <Paper
      variant="outlined"
      sx={{ p: 1, borderRadius: 2, bgcolor: "#f9f9f9", borderColor: "divider" }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="600"
        color="error"
        gutterBottom
      >
        Refund Policy
      </Typography>
      <Typography variant="body2">
        {event.refundPolicy || "No refund policy specified."}
      </Typography>
    </Paper>
  </Box>
</Box>

          </Card>
        </Grid>

        {/* Event Info */}
        <Grid item xs={12} md={7} sx={{ml:'1%'}}>
          <Box display="flex" gap={1} mb={2}>
            <Chip label={event.type} color="primary" />
            <Chip label={event.category} color="secondary" />
          </Box>

          <Typography variant="h4" fontWeight={600} gutterBottom>
            {event.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOn fontSize="small" color="primary" />
            <Typography>{event.location}, {event.country}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CalendarToday fontSize="small" color="primary" />
            <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
            <Schedule fontSize="small" color="primary" />
            <Typography>{event.startTime} - {event.endTime}</Typography>
          </Box>

          <Typography variant="body1" mb={2}>
            {event.description}
          </Typography>

          <Divider/>

          {/* Tickets */}
          <Typography variant="h6" mb={1}>Choose Your Ticket</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {event.priceCategories.map(ticket => (
              <Paper
                key={ticket.id}
                elevation={selectedTicket?.id === ticket.id ? 2 : 0}
                onClick={() => setSelectedTicket(ticket)}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  border: selectedTicket?.id === ticket.id ? '2px solid #1976d2' : '1px solid #ddd',
                  cursor: 'pointer',
                  transition: '0.2s ease',
                  '&:hover': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 6px rgba(25, 118, 210, 0.2)'
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography>{ticket.name}</Typography>
                  <Typography fontWeight={600} color="primary">
                    ${ticket.price.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Quantity and Summary */}
          {selectedTicket && (
            <>
              <Box mt={1}>
                <Typography variant="subtitle1" gutterBottom>Quantity</Typography>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    sx={{ minWidth: 40 }}
                  >−</Button>
                  <TextField
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    sx={{
                      width: 80,
                      mx: 1,
                      '& input': { textAlign: 'center' }
                    }}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    onClick={() => setQuantity(q => q + 1)}
                    sx={{ minWidth: 40 }}
                  >+</Button>
                </Box>
              </Box>

              {/* Price Summary */}
              <Box bgcolor="#f5f5f5" borderRadius={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  {/* <Typography>Subtotal</Typography> */}
                  {/* <Typography>${(selectedTicket.price * quantity).toFixed(2)}</Typography> */}
                </Box>
                {/* {event.discount > 0 && (
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Discount ({event.discount}%)</Typography>
                    <Typography color="success.main">
                      -${(selectedTicket.price * quantity * event.discount / 100).toFixed(2)}
                    </Typography>
                  </Box>
                )} */}
                <Divider/>
                <Box display="flex" justifyContent="space-between" fontWeight={600}>
                  <Typography>Total</Typography>
                  <Typography>
                    {/* ${(selectedTicket.price * quantity * (1 - event.discount / 100)).toFixed(2)} */}
                    ${(selectedTicket.price * quantity).toFixed(2)}

                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 1 }}
                onClick={handleBook}
              >
                Book Now
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Container>

    <Footer />
  </Box>
);

};

export default Event;