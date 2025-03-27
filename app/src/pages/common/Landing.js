import React, { useState } from "react";
import "../../styles/common/Landing.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
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
      title: "Adventure Tour 1",
      content: "Explore the mountains.",
      category: "Adventure",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Embark on a thrilling adventure through rugged mountain terrains, experiencing breathtaking views and challenging trails. This tour is designed for those seeking excitement and a connection with nature. Our experienced guides ensure safety while you push your limits and create unforgettable memories.",
      bookingPrice: 200, // Average daily cost in USD
    },
    {
      title: "Beach Getaway 2",
      content: "Relax by the sea.",
      category: "Beach",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Unwind on pristine beaches with golden sands and clear blue waters. This getaway offers a serene environment to relax, swim, and enjoy beachside activities. Ideal for travelers looking to escape the hustle and rejuvenate by the sea.",
      bookingPrice: 150, // Average daily cost in USD
    },
    {
      title: "City Tour 3",
      content: "Discover the city.",
      category: "City",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Explore the vibrant urban landscape, visiting historical landmarks, cultural sites, and experiencing the city's dynamic atmosphere. Perfect for those interested in history, architecture, and urban life.",
      bookingPrice: 180, // Average daily cost in USD
    },
    {
      title: "Adventure Tour 12",
      content: "Last adventure.",
      category: "Adventure",
      imageUrl:
        "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Join us for a final exhilarating journey through challenging terrains, pushing your limits and embracing the spirit of adventure. A fitting end to a series of thrilling expeditions.",
      bookingPrice: 220, // Average daily cost in USD
    },
    {
      title: "Beach Tour 13",
      content: "Last beach.",
      category: "Beach",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Experience the tranquility of secluded beaches, away from the crowds. This tour offers peaceful seaside moments, ideal for reflection and relaxation.",
      bookingPrice: 160, // Average daily cost in USD
    },
    {
      title: "City Tour 14",
      content: "Last city.",
      category: "City",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Conclude your urban explorations with a visit to a city rich in history and culture. Discover hidden gems, local cuisine, and the unique charm of this final destination.",
      bookingPrice: 190, // Average daily cost in USD
    },
  ];
  

  const filteredCards = cardData.filter((card) => {
    const searchMatch = card.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory
      ? card.category === filterCategory
      : true;
    return searchMatch && categoryMatch;
  });

  return (
    <>
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1100 }}>
        <Navbar />
      </Box>

      <Grid
        container
        style={{ paddingTop: "64px", backgroundColor: "#fafafa" }}
      >
        <Grid item xs={12} style={{ padding: "20px" }}>
          <Box
            sx={{
              marginBottom: "20px",
              padding: "4px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "flex-end",
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
              <Grid item xs={12} sm={4} md={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  style={{ minWidth: "200px" }}
                >
                  <InputLabel id="category-filter-label">Category</InputLabel>
                  <Select
                    labelId="category-filter-label"
                    id="category-filter"
                    value={filterCategory}
                    label="Category"
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Adventure">Adventure</MenuItem>
                    <MenuItem value="Beach">Beach</MenuItem>
                    <MenuItem value="City">City</MenuItem>
                    <MenuItem value="Culture">Culture</MenuItem>
                    <MenuItem value="Nature">Nature</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("");
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#1976d2",
                    },
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {filteredCards.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                style={{ display: "flex" }}
              >
                <Card
                  elevation={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "15vw",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.imageUrl}
                    alt={card.title}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Category: {card.category}
                    </Typography>
                    <Button size="small" color="primary" onClick={() => handleSeeMoreClick(card)}
                      >
                      See More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Landing;
