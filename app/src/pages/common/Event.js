import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Schedule,
  Person,
  AttachMoney,
  Add,
  Remove
} from '@mui/icons-material';

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
        eventName: event.name,
        ticketType: selectedTicket.name,
        quantity,
        price: selectedTicket.price,
        discount: event.discount,
        total: (selectedTicket.price * quantity * (1 - event.discount/100)).toFixed(2)
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
    <Container maxWidth="md" sx={{ width: '90%', py: 3 }}>
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="240"
          image={event.bannerUrl}
          alt={event.name}
        />
        
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <Chip 
              label={event.type} 
              size="small" 
              color="primary" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              label={event.category} 
              size="small" 
              color="secondary" 
            />
          </Box>

          <Typography variant="h4" fontWeight="600" mb={2}>
            {event.name}
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn color="primary" sx={{ mr: 1 }} />
            <Typography>
              {event.location}, {event.country}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={2}>
            <CalendarToday color="primary" sx={{ mr: 1 }} />
            <Typography sx={{ mr: 2 }}>
              {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Schedule color="primary" sx={{ mr: 1 }} />
            <Typography>
              {event.startTime} - {event.endTime}
            </Typography>
          </Box>

          <Typography paragraph mb={3}>
            {event.description}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Person color="primary" sx={{ mr: 1 }} />
            <Typography>
              Contact: {event.cordinatorName} ({event.cordinatorContact})
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" mb={2}>Ticket Options</Typography>
          
          <Box display="flex" flexDirection="column" gap={2} mb={3}>
            {event.priceCategories.map(ticket => (
              <Paper 
                key={ticket.id}
                elevation={selectedTicket?.id === ticket.id ? 3 : 1}
                onClick={() => setSelectedTicket(ticket)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: selectedTicket?.id === ticket.id ? '2px solid #1976d2' : 'none'
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="500">{ticket.name}</Typography>
                  <Typography color="primary" fontWeight="600">
                    ${ticket.price}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {selectedTicket && (
            <>
              <Typography mb={1}>Quantity:</Typography>
              <Box display="flex" alignItems="center" mb={3}>
                <IconButton 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  size="small"
                  sx={{ width: 60, mx: 1 }}
                  inputProps={{ min: 1 }}
                />
                <IconButton 
                  onClick={() => setQuantity(q => q + 1)}
                  size="small"
                >
                  <Add />
                </IconButton>
              </Box>

              <Box bgcolor="#f5f5f5" p={2} borderRadius={2} mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${(selectedTicket.price * quantity).toFixed(2)}</Typography>
                </Box>
                {event.discount > 0 && (
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Discount ({event.discount}%):</Typography>
                    <Typography color="green">
                      -${(selectedTicket.price * quantity * event.discount/100).toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="600">Total:</Typography>
                  <Typography fontWeight="600">
                    ${(selectedTicket.price * quantity * (1 - event.discount/100)).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={handleBook}
              >
                Book Now
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Event Details</Typography>
          
          <Typography fontWeight="500" mb={1}>Specifications:</Typography>
          <List dense>
            {event.specifications.map(spec => (
              <ListItem key={spec.id} sx={{ py: 0 }}>
                <ListItemText primary={`• ${spec.specName}`} />
              </ListItem>
            ))}
          </List>

          <Typography fontWeight="500" mt={2} mb={1}>Conditions:</Typography>
          <List dense>
            {event.conditions.map(cond => (
              <ListItem key={cond.id} sx={{ py: 0 }}>
                <ListItemText primary={`• ${cond.condition}`} />
              </ListItem>
            ))}
          </List>

          <Typography fontWeight="500" mt={2}>Refund Policy:</Typography>
          <Typography>{event.refundPolicy}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Event;