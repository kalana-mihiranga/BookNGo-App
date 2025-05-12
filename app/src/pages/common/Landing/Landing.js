import React, { useEffect, useState } from 'react';

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
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSeeMoreClick = (card) => {
    navigate("/event", { state: { cardData: card } });
  };

  const [events, setEvents] = useState([]);
    useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/business/searchEvents");
        if (res.data.status) {
          setEvents(res.data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);



  // const cardData = [
  //   {
  //     name: "Surfing",
  //     content: "Relax on pristine white sand beaches with crystal waters",
  //     category: "Beach",
  //     imageUrl:
  //       "https://images.ctfassets.net/xhzuh2up4xai/4qxBb6Nw4NARuV8AUDXZn6/1c594f817ac1aa69e81d8c07bfa90c0e/massive_waves.jpg?fm=jpg&fl=progressive&w=1920&q=75",
  //     description: "Unwind with crystal clear waters and palm trees",
  //     bookingPrice: 180,
  //     location: "Hawaii",
  //   },
  //   {
  //     name: "Jetskiing",
  //     content: "Explore breathtaking mountain landscapes with expert guides",
  //     category: "Adventure",
  //     imageUrl:
  //       "https://jetboatmiami.com/wp-content/uploads/2022/05/i07_Kawasaki-Jet-Ski-Cover.jpg",
  //     description: "Experience thrilling hikes with expert guides",
  //     bookingPrice: 200,
  //     location: "Miami",
  //   }
  // ];

const filteredCards = events.filter((event) => {
  const searchMatch =
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase());
  const categoryMatch = filterCategory ? event.category === filterCategory : true;
  const locationMatch = location ? event.country === location : true;
  const priceMatch = true; 
  return searchMatch && categoryMatch && locationMatch && priceMatch;
});


  const handleReset = () => {
    setSearchQuery("");
    setFilterCategory("");
    setPriceRange([0, 500]);
    setLocation("");
  };

  return (
    
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      <Box sx={{ py: 4 }}>
        <HeroSection />

        <>
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
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
                    sx={{ width: "200px" }}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Adventure">Adventure</MenuItem>
                    <MenuItem value="Beach">Beach</MenuItem>
                    <MenuItem value="City">City</MenuItem>
                    <MenuItem value="Culture">Culture</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="Mountain">Mountain</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={location}
                    label="Location"
                    sx={{ width: "200px" }}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <MenuItem value="">All Locations</MenuItem>
                    <MenuItem value="Hawaii">Hawaii</MenuItem>
                    <MenuItem value="Miami">Miami</MenuItem>
                    <MenuItem value="Florida">Florida</MenuItem>
                    <MenuItem value="California">California</MenuItem>
                    <MenuItem value="Colorado">Colorado</MenuItem>
                    <MenuItem value="West Virginia">West Virginia</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                    <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mx: 5 }} sm={6}>
                <Typography gutterBottom>Price Range ($)</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  step={10}
                  sx={{ mt: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4} justifyContent="center">
{filteredCards.map((event, index) => (
  <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: "flex" }}>
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={event.bannerUrl}
        alt={event.name}
        sx={{
          objectFit: "cover",
          width: "100%",
          aspectRatio: "16/9",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {event.category}
        </Typography>
        <Button
          size="small"
          onClick={() => handleSeeMoreClick(event)}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
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

      <Footer />
    </Box>
  );
};

export default Landing;
