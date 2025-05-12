import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { 
  Button, 
  CardMedia, 
  Grid, 
  IconButton, 
  Typography, 
  Paper, 
  Chip,
  Container,
  Box,
  Divider,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  Add, 
  Remove,
  BookmarkAdd, 
  Category, 
  LocalOffer,
  CalendarToday,
  LocationOn,
  Info,
  Person,
  Star,
  Share
} from '@mui/icons-material';

const Event = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const event = location.state?.cardData;
  
  const price = 50;
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <Typography variant="h4" color="textSecondary">
          No event data found.
        </Typography>
      </Box>
    );
  }
  
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);
  const totalPrice = price * quantity;
  
  const navigateToPayment = () => {
    navigate('/payment', { 
      state: { 
        event: event,
        quantity: quantity,
        totalPrice: totalPrice
      } 
    });
  };

  const eventDetails = [
    { icon: <CalendarToday fontSize="small" />, label: "Date", 
      value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) },
    { icon: <CalendarToday fontSize="small" />, label: "Time", 
      value: `${event.startTime} - ${event.endTime}` },
    { icon: <LocationOn fontSize="small" />, label: "Location", 
      value: `${event.location}, ${event.country}` }
  ];

  const highlights = [
    "Full-day immersive experience",
    "Live performances throughout",
    `Limited to ${event.maximumCount} attendees`,
    "Food and drinks included"
  ];

  return (
    <Box sx={{ backgroundColor: '#fefefe' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${theme.palette.divider}` }}>
          <Grid container spacing={0}>
            {/* Image Section - Wider */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                <CardMedia
                  component="img"
                  image={event.bannerUrl || "https://source.unsplash.com/random/1200x800/?festival"}
                  alt={event.name}
                  sx={{
                    height: 350,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 3
                  }}
                />
                
                {/* About Section */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Info color="primary" sx={{ mr: 1 }} /> 
                    About This Experience
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    {event.description || 'Join us for an unforgettable experience filled with music, art, and community.'}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={`#${event.hashtag}`} size="small" />
                    <Chip label={`Refund: ${event.refundPolicy}`} size="small" color="info" />
                  </Box>
                  
                  {/* Highlights */}
                  <Box sx={{ backgroundColor: theme.palette.primary.light, p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                      What's Included
                    </Typography>
                    <List dense sx={{ py: 0 }}>
                      {highlights.map((item, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemAvatar sx={{ minWidth: 32 }}>
                            <Star color="primary" fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={item}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Details Section - Still spacious */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.dark }}>
                    {event.name || 'Premium Experience'}
                  </Typography>
                  
                  {/* Meta Info */}
                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip 
                      icon={<Category fontSize="small" />} 
                      label={event.category || 'Event'} 
                      color="primary" 
                      variant="outlined"
                      size="small"
                    />
                    <Chip 
                      icon={<LocalOffer fontSize="small" />} 
                      label={`$${price} per person`} 
                      size="small"
                    />
                    {event.discount > 0 && (
                      <Chip label={`Save ${event.discount}%`} color="success" size="small" />
                    )}
                  </Stack>
                  
                  {/* Event Details */}
                  <Paper elevation={0} sx={{ 
                    p: 2, 
                    mb: 3, 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2
                  }}>
                    {eventDetails.map((detail, index) => (
                      <Box key={index} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1.5,
                        '&:last-child': { mb: 0 }
                      }}>
                        <Box sx={{ 
                          backgroundColor: theme.palette.primary.light, 
                          p: 1, 
                          borderRadius: '50%',
                          mr: 2,
                          color: theme.palette.primary.main
                        }}>
                          {detail.icon}
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {detail.label}
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {detail.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                  
                  {/* Host */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                      Your Host
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2
                    }}>
                      <Avatar 
                        src="https://randomuser.me/api/portraits/men/42.jpg" 
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {event.cordinatorName || 'Professional Host'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.cordinatorContact || 'Contact for details'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
                {/* Booking Card - Fixed at bottom */}
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper
                }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Secure Your Spot
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">Price per person:</Typography>
                    <Typography variant="body1" fontWeight="bold">${price}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="body1">Number of people:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        onClick={handleDecreaseQuantity} 
                        size="small"
                        disabled={quantity <= 1}
                        sx={{ 
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: '50%',
                          p: 0.5
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 2, minWidth: 30, textAlign: 'center' }}>{quantity}</Typography>
                      <IconButton 
                        onClick={handleIncreaseQuantity} 
                        size="small"
                        sx={{ 
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: '50%',
                          p: 0.5
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body1" fontWeight="bold">Total:</Typography>
                    <Typography variant="h6" fontWeight="bold">${totalPrice}</Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<BookmarkAdd />}
                      onClick={navigateToPayment}
                      sx={{
                        py: 1.5,
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark
                        }
                      }}
                    >
                      Reserve Now
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      startIcon={<Share />}
                      sx={{ py: 1.5 }}
                    >
                      Share
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Event;