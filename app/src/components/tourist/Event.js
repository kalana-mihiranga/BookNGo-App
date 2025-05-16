import { useState, useEffect } from 'react';
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
import Navbar from '../../components/tourist/NavBar';
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

      <Container maxWidth={false}
        sx={{
          py: 4,
          px: 2,
          width: '90%',
          maxWidth: '1280px',
          mx: 'auto',
        }}>
        <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Left Panel - 40% */}
          <Grid item sx={{ width: '40%' }}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', mb: 0.5 }}>
              <CardMedia
                component="img"
                image={event.bannerUrl}
                alt={event.name}
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                }}
              />
            </Card>

            {[{
              title: "Specifications",
              items: event.specifications,
              keyName: "specName",
            }, {
              title: "Conditions",
              items: event.conditions,
              keyName: "condition",
            }].map(({ title, items, keyName }) => (
              <Paper
                key={title}
                variant="outlined"
                sx={{ p: 1, borderRadius: 2 }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {title}
                </Typography>
                {items.length > 0 ? (
                  <List dense disablePadding>
                    {items.map((item) => (
                      <ListItem key={item.id} disableGutters>
                        <ListItemText primary={`• ${item[keyName]}`} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No {title.toLowerCase()} listed.
                  </Typography>
                )}
              </Paper>
            ))}

            {/* Refund Policy */}
            <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="error" gutterBottom>
                Refund Policy
              </Typography>
              <Typography variant="body2">
                {event.refundPolicy || "No refund policy specified."}
              </Typography>
            </Paper>
          </Grid>

          {/* Right Panel - 50% */}
          <Grid item sx={{ width: '50%', ml: '2%' }}>
            <Box sx={{ fontSize: '0.9rem' }}>
              <Box display="flex" gap={1} mb={2}>
                <Chip label={event.type} color="primary" />
                <Chip label={event.category} color="secondary" />
              </Box>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                {event.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationOn fontSize="small" color="primary" />
                <Typography>{event.location}, {event.country}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <CalendarToday fontSize="small" color="primary" />
                <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
                <Schedule fontSize="small" color="primary" />
                <Typography>{event.startTime} - {event.endTime}</Typography>
              </Box>

              <Typography variant="body2" mb={1}>
                {event.description}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" gutterBottom>Choose Your Ticket</Typography>
              <Box display="flex" flexDirection="column" gap={1} mb={1}>
                {event.priceCategories.map(ticket => (
                  <Paper
                    key={ticket.id}
                    elevation={selectedTicket?.id === ticket.id ? 3 : 1}
                    onClick={() => setSelectedTicket(ticket)}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      border: selectedTicket?.id === ticket.id ? '2px solid' : '1px solid',
                      borderColor: selectedTicket?.id === ticket.id ? 'primary.main' : 'divider',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>{ticket.name}</Typography>
                      <Typography fontWeight={600} color="primary">
                        Lkr {ticket.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>

              {selectedTicket && (
                <>
                  <Typography variant="subtitle1" gutterBottom>Quantity</Typography>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Button
                      variant="outlined"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      sx={{ minWidth: 40 }}
                    >−</Button>
                    <TextField
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      size="small"
                      sx={{
                        width: 80,
                        mx: 1,
                        '& input': { textAlign: 'center' },
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => setQuantity(q => q + 1)}
                      sx={{ minWidth: 40 }}
                    >+</Button>
                  </Box>

                  <Box bgcolor="#f8f9fa" p={2} borderRadius={2} mb={3}>
                    <Box display="flex" justifyContent="space-between" fontWeight={600}>
                      <Typography>Total</Typography>
                      <Typography>
                        Lkr {(selectedTicket.price * quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={handleBook}
                  >
                    Book Now
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Event;
