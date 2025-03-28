import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of high-quality tourism images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Discover Amazing Tourism Events",
      subtitle: "We create unforgettable travel experiences with local experts"
    },
    {
      url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Explore Hidden Gems",
      subtitle: "Find unique destinations off the beaten path"
    },
    {
      url: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Adventure Awaits",
      subtitle: "Thrilling experiences for every type of traveler"
    }
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      height: { xs: '70vh', md: '80vh' },
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background images with fade effect */}
      {heroImages.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ))}
      
      {/* Content overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 3,
        zIndex: 1
      }}>
        <Box sx={{ maxWidth: '800px' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {heroImages[currentImageIndex].title}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {heroImages[currentImageIndex].subtitle}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Explore Events
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;