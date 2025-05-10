import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  Group,
  MonetizationOn,
  Email,
  Business,
  Phone,
  Logout,
  FilterList,
  Search,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import EventFormDialog from "../../components/business/BusinessEventCreate";
import BookingsTabContent from "./components/BookingsTabContent";
import EventsTabContent from "./components/EventTabContent";
import AnalyticsTabContent from "./components/AnalyticsTabContent";

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

const sampleBookings = [
  {
    id: 101,
    customer: "John Smith",
    event: "Tech Conference 2023",
    date: "2023-10-01",
    tickets: 2,
    status: "confirmed",
  },
  {
    id: 102,
    customer: "Emma Johnson",
    event: "Music Festival",
    date: "2023-10-05",
    tickets: 4,
    status: "confirmed",
  },
];

const analyticsData = {
  totalRevenue: 65400,
  totalAttendees: 1530,
  totalEvents: 8,
  upcomingEvents: 3,
  revenueTrend: [5000, 8000, 12000, 9000, 15000, 16400],
  attendeeTrend: [120, 250, 180, 300, 400, 280],
  eventDistribution: [],
  topEvents: [
    { name: "Tech Conference", revenue: 24500, attendees: 245 },
    { name: "Music Festival", revenue: 36000, attendees: 1200 },
    { name: "Food Expo", revenue: 18500, attendees: 320 },
  ],
};

const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ManageEvents = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState(sampleEvents);
  const [bookings, setBookings] = useState(sampleBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const businessUser = {
    name: "Lagoonria Event",
    email: "lagoonria@info.com",
    company: "Lagoonria Pvt Ltd",
    phone: "+94 76 123 4567",
    avatar: "https://i.pravatar.cc/300",
  };

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

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

  const getBookingStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const ProfileDrawer = () => (
    <Drawer
      anchor="right"
      open={profileOpen}
      onClose={toggleProfile}
      sx={{
        "& .MuiDrawer-paper": {
          width: 350,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleProfile}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={businessUser.avatar}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {businessUser.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Event Organizer
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={businessUser.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Company" secondary={businessUser.company} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={businessUser.phone} />
          </ListItem>
        </List>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            fullWidth
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box
      sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", display: "flex" }}
    >
      <ProfileDrawer />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ backgroundColor: "white", boxShadow: 1, py: 3 }}>
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Welcome back,
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Hello {businessUser.name.split(" ")[0]}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setDialogOpen(true)}
                >
                  EVENT
                </Button>
                <IconButton onClick={toggleProfile}>
                  <Avatar src={businessUser.avatar} />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper sx={{ mb: 3, borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="My Events" icon={<CalendarToday />} />
              <Tab label="Bookings" icon={<Group />} />
              <Tab label="Analytics" icon={<MonetizationOn />} />
            </Tabs>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <TextField
              placeholder="Search events..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              }}
              sx={{ width: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filters
            </Button>
          </Box>

          {tabValue === 0 && (
            <EventsTabContent
              filteredEvents={filteredEvents}
              getStatusColor={getStatusColor}
              searchTerm={searchTerm}
            />
          )}

          {tabValue === 1 && (
            <BookingsTabContent
              bookings={bookings}
              formatShortDate={formatShortDate}
              getBookingStatusColor={getBookingStatusColor}
            />
          )}

          {tabValue === 2 && (
            <AnalyticsTabContent analyticsData={analyticsData} />
          )}
        </Container>
      </Box>

      <EventFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default ManageEvents;