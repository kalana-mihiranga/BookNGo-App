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
      title: "Surfing",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://images.ctfassets.net/xhzuh2up4xai/4qxBb6Nw4NARuV8AUDXZn6/1c594f817ac1aa69e81d8c07bfa90c0e/massive_waves.jpg?fm=jpg&fl=progressive&w=1920&q=75",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Jetskiing",
      content: "Explore breathtaking mountain landscapes with expert guides",
      category: "Adventure",
      imageUrl: "https://jetboatmiami.com/wp-content/uploads/2022/05/i07_Kawasaki-Jet-Ski-Cover.jpg",
      description: "Experience thrilling hikes with expert guides",
      bookingPrice: 200
    },
    {
      title: "Parasailing",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://www.kittyhawk.com/wp-content/uploads/2012/01/parasailing-double-1.jpg",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "kiteboarding",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://miro.medium.com/v2/resize:fit:1024/1*AWCYtU1Uuay6cwK2AbAc0g.jpeg",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 280
    },
    {
      title: "sea kayaking",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/66/08/3f/caption.jpg?w=1200&h=-1&s=1",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Windsurfing",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://res.cloudinary.com/manawa/image/private/f_auto,c_limit,w_3840,q_auto/eb3883d20cc177905bc2ad81f471ae67",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "canoeing",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://bendingbranches.com/cdn/shop/articles/BB_Harder_Five2Nine.jpg?v=1655143550",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Water Rafting",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://smokymtnriverrat.com/wp-content/uploads/2024/03/RRW-_-Family-Upper-_-8-_-faded-bottom-white.webp",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "atv ride",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Mountain",
      imageUrl: "https://aceraft.com/wp-content/uploads/2019/05/new-river-gorge-atv-tour-ace-adventure-resort-3-scaled.jpg",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Zipline in Oahu",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://adventureinhawaii.com/img/kauai/koloa-zipline-1.jpg",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "DJ Party",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Entertaintment",
      imageUrl: "https://www.shutterstock.com/image-photo/crowd-raising-their-hands-enjoying-600nw-480758203.jpg",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Diving",
      content: "Relax on pristine white sand beaches with crystal waters",
      category: "Beach",
      imageUrl: "https://assets.cntraveller.in/photos/632da314969e60ec08d35e8a/4:3/w_4992,h_3744,c_limit/498283106",
      description: "Unwind with crystal clear waters and palm trees",
      bookingPrice: 180
    },
    {
      title: "Music Events",
      content: "Discover vibrant urban culture and historic landmarks",
      category: "City",
      imageUrl: "https://media.gettyimages.com/id/1242743138/photo/france-arts-festival-music-rock-en-seine.jpg?s=2048x2048&w=gi&k=20&c=-XmluCciBVSa0NtaQe1pYgUu8hCi1qWnz1Mc_SKRc9w=",
      description: "Tour historic landmarks and modern attractions",
      bookingPrice: 150
    },
    {
      title: "Cultural Journey",
      content: "Immerse yourself in authentic local traditions",
      category: "Culture",
      imageUrl: "https://media.gettyimages.com/id/2166769048/photo/sri-lanka-religion-buddhism-festival.jpg?s=2048x2048&w=gi&k=20&c=5u29dim0v_Dm7rtw5dgQv2YW59gNy08vxLalYK3JpIk=",
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
        < >
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
        </>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Landing;