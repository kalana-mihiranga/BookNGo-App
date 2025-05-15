import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Avatar
} from '@mui/material';
import {
  Add,
  CalendarToday,
  Delete,
  Group,
  MonetizationOn,
  Search,
  FilterList
} from '@mui/icons-material';
import EventsTab from './EventsTab';
import BookingsTab from './BookingsTab';
import AnalyticsTab from './AnalyticsTab';
import ProfileDrawer from './ProfileDrawer';
import EventsTabContent from './EventsTabContent'; 

const ManageEvents = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const businessUser = {
    name: "Kalana Mihiranga",
    email: "kalana@business.com",
    company: "Event Masters",
    phone: "+94 76 123 4567",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  };

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleCreateEvent = () => navigate('/create-event');

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', display: 'flex' }}>
      <ProfileDrawer 
        open={profileOpen} 
        onClose={toggleProfile} 
        userProfile={businessUser}
        navigate={navigate}
      />

      <Box sx={{ flexGrow: 1 }}>
        {/* Header Section */}
        <Box sx={{ backgroundColor: 'white', boxShadow: 1, py: 3 }}>
          <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Welcome back,
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Hello {businessUser.name.split(' ')[0]}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleCreateEvent}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Create Event
                </Button>
                <IconButton onClick={toggleProfile}>
                  <Avatar src={businessUser.avatar} />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Tabs and Search Section */}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              placeholder={tabValue === 0 ? "Search events..." : tabValue === 1 ? "Search bookings..." : "Search..."}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />
              }}
              sx={{ width: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filters
            </Button>
          </Box>

          {/* Tab Content Section */}
          {tabValue === 0 && <EventsTab searchTerm={searchTerm} />}
          {tabValue === 1 && <BookingsTab searchTerm={searchTerm} />}
          {tabValue === 2 && <AnalyticsTab />}
        </Container>
      </Box>
    </Box>
  );
};

export default ManageEvents;