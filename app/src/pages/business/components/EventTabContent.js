import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
  Group,
  LocationOn,
  MonetizationOn,
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
} from "@mui/icons-material";

const sampleEvents = [
  {
    id: 1,
    title: "Tech Conference 2023",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2023-11-15",
    location: "San Francisco, CA",
    attendees: 245,
    capacity: 300,
    status: "active",
    revenue: 24500,
    category: "Conference",
  },
  {
    id: 2,
    title: "Music Festival",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2023-12-05",
    location: "Austin, TX",
    attendees: 1200,
    capacity: 1500,
    status: "active",
    revenue: 36000,
    category: "Festival",
  },
];

const EventsTabContent = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState(sampleEvents);
  const [filtered, setFiltered] = useState(sampleEvents);

  useEffect(() => {
    const result = events.filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, events]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "upcoming":
        return "info";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search events..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outlined" startIcon={<FilterList />}>
          Filters
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filtered.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="160"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  {event.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={event.category} size="small" />
                  <Chip
                    icon={<LocationOn fontSize="small" />}
                    label={event.location}
                    size="small"
                  />
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {formatDate(event.date)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Group fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {event.attendees}/{event.capacity} attendees
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MonetizationOn fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold">
                    ${event.revenue.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <Box
                sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Tooltip title="View">
                  <IconButton>
                    <Visibility color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton>
                    <Edit color="info" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No events found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Try a different search term or create your first event
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            Create Event
          </Button>
        </Paper>
      )}
    </>
  );
};

export default EventsTabContent;