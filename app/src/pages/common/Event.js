import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  Container
} from '@mui/material';
import { 
  Add, 
  Remove,
  BookmarkAdd, 
  Category, 
  LocalOffer 
} from '@mui/icons-material';

const Event = () => {
  const location = useLocation();
  const { cardData } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h4" color="textSecondary">
          No event data available.
        </Typography>
      </div>
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
  const bookingPrice = cardData.bookingPrice ?? 0;
  const totalPrice = (Number(price) * quantity).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <Container maxWidth={false}>
        <Paper elevation={3} className=" rounded-lg">
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={cardData.imageUrl}
                alt={cardData.title}
                sx={{
                  maxHeight: 250,
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </Grid>

            {/* Event Details Section */}
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                className="font-bold text-gray-800"
              >
                {cardData.title || 'Untitled Event'}
              </Typography>

              {/* Category and Price Chips */}
              <div className="flex justify-between items-center mb-4">
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
              </div>

              {/* Description */}
              <Typography 
                variant="h6" 
                color="textPrimary" 
                className="mb-4 font-semibold"
              >
                Description
              </Typography>


              {/* Booking Price */}
              <Typography 
                variant="h6" 
                color="textPrimary" 
                className="mb-2 font-semibold"
              >
                Booking Price
              </Typography>
              <Typography 
                variant="body1" 
                color="textSecondary" 
                className="mb-4"
              >
                ${Number(bookingPrice).toFixed(2)}
              </Typography>

              {/* Quantity Control */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border rounded-full">
                  <IconButton 
                    onClick={handleDecreaseQuantity} 
                    color="primary" 
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <span className="px-4 text-lg font-medium">{quantity}</span>
                  <IconButton 
                    onClick={handleIncreaseQuantity} 
                    color="primary" 
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </div>
                
                <Typography variant="h6" className="font-bold">
                  Total: ${totalPrice}
                </Typography>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                   
                  variant="contained" 
                  color="primary" 
                  startIcon={<BookmarkAdd />}
                >
                  Book Now
                </Button>

              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Event;