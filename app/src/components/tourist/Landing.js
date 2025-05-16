import React, { useState, useEffect } from "react";
import Navbar from '../../components/tourist/NavBar';
import Footer from "../Footer/Footer";
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
import axiosInstance from "../../utils/axiosInstance";

const Landing = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get("/api/tourist/getAllEvents");
      setTotalPages(response.data.totalPages)
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);



const handleSeeMoreClick = (event) => {
  navigate('/event', { state: { eventId: event.eventId } });
};

  const filteredEvents = events.filter((event) => {
    const searchMatch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory
      ? event.category === filterCategory
      : true;
    const locationMatch = location ? event.location === location : true;
    const priceMatch =
      event.price >= priceRange[0] && event.price <= priceRange[1];
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
                    <MenuItem value="Festival">Festival</MenuItem>
                    <MenuItem value="Concert">Concert</MenuItem>
                    <MenuItem value="Conference">Conference</MenuItem>
                    <MenuItem value="Exhibition">Exhibition</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
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
                    <MenuItem value="Galle">Galle</MenuItem>
                    <MenuItem value="Colombo">Colombo</MenuItem>
                    <MenuItem value="Kurunegala">Kurunegala</MenuItem>
                    <MenuItem value="Jaffna">Jaffna</MenuItem>
                    <MenuItem value="Negombo">Negombo</MenuItem>
                    <MenuItem value="Kandy">Kandy</MenuItem>
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
            {filteredEvents.map((event) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={event.eventId}
                sx={{ display: "flex",px:1 }}
              >
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {event.location} • {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${event.price}
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