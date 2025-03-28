import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import HeroSection from "./HeroSection";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CardMedia,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  const handleSeeMoreClick = (card) => {
    navigate('/event', { state: { cardData: card } });
  };

  const cardData = [
    {
      title: "Mountain Adventure",
      content: "Explore breathtaking mountain landscapes with expert guides",
      category: "Adventure",
      imageUrl: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&fit=crop",
      description: "Experience thrilling hikes with expert guides",
      bookingPrice: 200
    },
    {
      title: "Beach Paradise",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&fit=crop",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "City Explorer",
      content: "Discover vibrant urban culture and historic landmarks",
      category: "City",
      imageUrl: "https://images.unsplash.com/photo-1485872299829-c673f5194813?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&fit=crop",
      description: "Tour historic landmarks and modern attractions",
      bookingPrice: 150
    },
    {
      title: "Cultural Journey",
      content: "Immerse yourself in authentic local traditions",
      category: "Culture",
      imageUrl: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&fit=crop",
      description: "Experience authentic customs and heritage",
      bookingPrice: 170
    }
  ];

  const filteredCards = cardData.filter((card) => {
    const searchMatch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       card.content.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory ? card.category === filterCategory : true;
    return searchMatch && categoryMatch;
  });

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Fixed Header with Navbar */}
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      {/* Main Content */}
      <Box sx={{ pt: '64px' }}>
        
        {/* Hero Section */}
        <HeroSection />

        {/* Events Section */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Search and Filter */}
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Search Events"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    label="Category"
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Adventure">Adventure</MenuItem>
                    <MenuItem value="Beach">Beach</MenuItem>
                    <MenuItem value="City">City</MenuItem>
                    <MenuItem value="Culture">Culture</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("");
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Event Cards - Uniform Size */}
          <Grid container spacing={4} justifyContent="center">
            {filteredCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex' }}>
                <Card sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={card.imageUrl}
                    alt={card.title}
                    sx={{ 
                      objectFit: 'cover',
                      width: '100%',
                      aspectRatio: '16/9'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 0
                  }}>
                    <Typography variant="caption" color="text.secondary">
                      {card.category}
                    </Typography>
                    <Button 
                      size="small" 
                      onClick={() => handleSeeMoreClick(card)}
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'bold'
                      }}
                    >
                      Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Landing;