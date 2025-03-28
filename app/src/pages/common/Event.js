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
  ListItemText
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
  AccessTime,
  Group
} from '@mui/icons-material';

const Event = () => {
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate("/payment"); 
  };

  const location = useLocation();
  const { cardData } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  if (!cardData) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <Typography variant="h4" color="textSecondary">
          No event data available.
        </Typography>
      </Box>
    );
  }

  const handleDecreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Safe price handling
  const price = cardData.price ?? 0;
  const baseBookingPrice = cardData.bookingPrice ?? 0;
  const totalPrice = (baseBookingPrice * quantity).toFixed(2);
  const bookingPrice = (baseBookingPrice).toFixed(2);

  // Sample event details
  const eventDetails = [
    { icon: <AccessTime />, primary: "Duration", secondary: "3 hours" },
    { icon: <Group />, primary: "Group Size", secondary: "Max 15 people" }
  ];

  // Sample guide info
  const guideInfo = {
    name: "Alex Johnson",
    bio: "Professional tour guide with 8 years experience",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Grid container spacing={0}>
            {/* Image Section (now smaller) */}
            <Grid item xs={12} md={5}>
              <Box sx={{ p: 2 }}>
                <CardMedia
                  component="img"
                  image={cardData.imageUrl}
                  alt={cardData.title}
                  sx={{
                    height: 300,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />
                
                {/* Additional content below image */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    <Group sx={{ verticalAlign: 'middle', mr: 1 }} />
                    What's Included
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                          <Star sx={{ fontSize: 16 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Professional guide" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                          <Star sx={{ fontSize: 16 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="All equipment provided" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                          <Star sx={{ fontSize: 16 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Refreshments included" />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>

            {/* Event Details Section (now wider) */}
            <Grid item xs={12} md={7} sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 3
                }}
              >
                {cardData.title || 'Untitled Event'}
              </Typography>

              {/* Meta Information */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip 
                  icon={<Category />} 
                  label={cardData.category || 'Uncategorized'}
                  color="primary"
                  variant="outlined"
                />
                <Chip 
                  icon={<LocalOffer />} 
                  label={`$${Number(price).toFixed(2)} per ticket`}
                  color="secondary"
                />
              </Stack>

              {/* Event Highlights */}
              <Box sx={{ 
                backgroundColor: 'primary.light',
                p: 2,
                borderRadius: 1,
                mb: 3
              }}>
                <List dense>
                  {eventDetails.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main', 
                          width: 24, 
                          height: 24 
                        }}>
                          {item.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={item.primary} 
                        secondary={item.secondary}
                        primaryTypographyProps={{ variant: 'subtitle2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Guide Information */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Your Guide
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={guideInfo.avatar} 
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {guideInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {guideInfo.bio}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description Section */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Info color="primary" /> Event Description
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {cardData.description || 'No description available for this event.'}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Booking Section */}
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  Booking Details
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Price per ticket: ${bookingPrice}
                  </Typography>
                  
                  {/* Quantity Control */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 3,
                    mb: 3
                  }}>
                    <Typography variant="subtitle1">Quantity:</Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '50px'
                    }}>
                      <IconButton 
                        onClick={handleDecreaseQuantity} 
                        color="primary"
                        size="small"
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ px: 2 }}>{quantity}</Typography>
                      <IconButton 
                        onClick={handleIncreaseQuantity} 
                        color="primary"
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total: ${totalPrice}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<BookmarkAdd />}
                  onClick={navigateToPayment}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Book Now
                </Button>
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