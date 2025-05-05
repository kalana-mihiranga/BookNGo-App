import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Add,
  CalendarToday,
  Delete,
  Edit,
  FilterList,
  Group,
  LocationOn,
  MonetizationOn,
  MoreVert,
  Search,
  Star,
  Visibility,
  Email,
  Business,
  Phone,
  Logout,
  BarChart,
  PieChart,
  Timeline,
  AttachMoney,
  People,
  Event
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// ==============================================
// SECTION 1: SAMPLE DATA
// ==============================================
const sampleEvents = [
  {
    id: 1,
    title: "Tech Conference 2023",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2023-11-15",
    location: "San Francisco, CA",
    attendees: 245,
    capacity: 300,
    status: "active",
    revenue: 24500,
    category: "Conference"
  },
  {
    id: 2,
    title: "Music Festival",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "2023-12-05",
    location: "Austin, TX",
    attendees: 1200,
    capacity: 1500,
    status: "active",
    revenue: 36000,
    category: "Festival"
  }
];

const sampleBookings = [
  { id: 101, customer: "John Smith", event: "Tech Conference 2023", date: "2023-10-01", tickets: 2, status: "confirmed" },
  { id: 102, customer: "Emma Johnson", event: "Music Festival", date: "2023-10-05", tickets: 4, status: "confirmed" }
];

const userProfile = {
  name: "Kalana Mihiranga",
  email: "kalana.johnson@business.com",
  company: "EventPro Inc.",
  phone: "+1 (555) 123-4567",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const analyticsData = {
  totalRevenue: 65400,
  totalAttendees: 1530,
  totalEvents: 8,
  upcomingEvents: 3,
  revenueTrend: [5000, 8000, 12000, 9000, 15000, 16400],
  attendeeTrend: [120, 250, 180, 300, 400, 280],
  eventDistribution: [
    { name: "Conferences", value: 35 },
    { name: "Workshops", value: 25 },
    { name: "Concerts", value: 20 },
    { name: "Exhibitions", value: 15 },
    { name: "Others", value: 5 }
  ],
  topEvents: [
    { name: "Tech Conference", revenue: 24500, attendees: 245 },
    { name: "Music Festival", revenue: 36000, attendees: 1200 },
    { name: "Food Expo", revenue: 18500, attendees: 320 }
  ]
};

// ==============================================
// SECTION 2: UTILITY FUNCTIONS & STYLED COMPONENTS
// ==============================================
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 10,
    padding: '0 4px',
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// ==============================================
// SECTION 3: REUSABLE COMPONENTS
// ==============================================
const AnalyticsCard = ({ icon, title, value, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
          {icon}
        </Avatar>
        <Box>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const AnalyticsChartPlaceholder = ({ title, icon }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        {icon} {title}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(title)}`}
          alt={title}
          style={{ maxWidth: '100%', borderRadius: 4 }}
        />
      </Box>
    </CardContent>
  </Card>
);

// ==============================================
// SECTION 4: MAIN COMPONENT
// ==============================================
const ManageEvents = () => {
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [events, setEvents] = useState(sampleEvents);
  const [bookings, setBookings] = useState(sampleBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Business user data
  const businessUser = {
    name: "Kalana Mihiranga",
    email: "kalana@business.com",
    company: "Event Masters",
    phone: "+94 76 123 4567",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  };

  // ==============================================
  // SECTION 4.1: EFFECTS & DATA FILTERING
  // ==============================================
  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // ==============================================
  // SECTION 4.2: EVENT HANDLERS
  // ==============================================
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleEditEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleViewEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'info';
      case 'completed': return 'secondary';
      default: return 'default';
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  // ==============================================
  // SECTION 4.3: PROFILE DRAWER COMPONENT
  // ==============================================
  const ProfileDrawer = () => (
    <Drawer
      anchor="right"
      open={profileOpen}
      onClose={toggleProfile}
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleProfile}>
            <Delete />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={userProfile.avatar} 
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {userProfile.name}
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
            <ListItemText primary="Email" secondary={userProfile.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Company" secondary={userProfile.company} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={userProfile.phone} />
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            fullWidth
            onClick={() => navigate('/')}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  // ==============================================
  // SECTION 4.4: MAIN RENDER
  // ==============================================
  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', display: 'flex' }}>
      <ProfileDrawer />

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
              placeholder="Search events..."
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
          {tabValue === 0 && (
            <EventsTabContent 
              filteredEvents={filteredEvents} 
              handleViewEvent={handleViewEvent}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
              getStatusColor={getStatusColor}
              handleCreateEvent={handleCreateEvent}
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
    </Box>
  );
};

// ==============================================
// SECTION 5: TAB CONTENT COMPONENTS
// ==============================================
const EventsTabContent = ({ 
  filteredEvents, 
  handleViewEvent,
  handleEditEvent,
  handleDeleteEvent,
  getStatusColor,
  handleCreateEvent,
  searchTerm
}) => (
  <>
    <Grid container spacing={3}>
      {filteredEvents.map((event) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <StyledBadge
              badgeContent={event.status.toUpperCase()}
              color={getStatusColor(event.status)}
            >
              <CardMedia
                component="img"
                height="160"
                image={event.image}
                alt={event.title}
              />
            </StyledBadge>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {formatDate(event.date)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Group fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {event.attendees}/{event.capacity} attendees
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" fontWeight="bold">
                  ${event.revenue.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Tooltip title="View">
                <IconButton onClick={() => handleViewEvent(event.id)}>
                  <Visibility color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton onClick={() => handleEditEvent(event.id)}>
                  <Edit color="info" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDeleteEvent(event.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>

    {filteredEvents.length === 0 && (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          No events found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {searchTerm ? 'Try a different search term' : 'Create your first event to get started'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateEvent}
        >
          Create Event
        </Button>
      </Paper>
    )}
  </>
);

const BookingsTabContent = ({ bookings, formatShortDate, getBookingStatusColor }) => (
  <Paper sx={{ p: 2 }}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Tickets</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>#{booking.id}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 32, height: 32 }} />
                  <Typography>{booking.customer}</Typography>
                </Stack>
              </TableCell>
              <TableCell>{booking.event}</TableCell>
              <TableCell>{formatShortDate(booking.date)}</TableCell>
              <TableCell>{booking.tickets}</TableCell>
              <TableCell>
                <Chip
                  label={booking.status.toUpperCase()}
                  size="small"
                  color={getBookingStatusColor(booking.status)}
                />
              </TableCell>
              <TableCell>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

const AnalyticsTabContent = ({ analyticsData }) => (
  <Box>
    {/* Summary Cards */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsCard
          icon={<AttachMoney />}
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsCard
          icon={<People />}
          title="Total Attendees"
          value={analyticsData.totalAttendees}
          color="info"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsCard
          icon={<Event />}
          title="Total Events"
          value={analyticsData.totalEvents}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsCard
          icon={<CalendarToday />}
          title="Upcoming Events"
          value={analyticsData.upcomingEvents}
          color="primary"
        />
      </Grid>
    </Grid>

    {/* Charts Row 1 */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={8}>
        <AnalyticsChartPlaceholder
          title="Revenue Trend (Last 6 Months)"
          icon={<Timeline />}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <AnalyticsChartPlaceholder
          title="Event Type Distribution"
          icon={<PieChart />}
        />
      </Grid>
    </Grid>

    {/* Charts Row 2 */}
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <AnalyticsChartPlaceholder
          title="Attendee Growth"
          icon={<BarChart />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Star color="warning" sx={{ mr: 1 }} /> Top Performing Events
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Attendees</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.topEvents.map((event) => (
                    <TableRow key={event.name}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell align="right">${event.revenue.toLocaleString()}</TableCell>
                      <TableCell align="right">{event.attendees.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Recent Activity */}
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark' }}>
                <Add />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="New event created - Tech Workshop"
              secondary="2 hours ago"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'info.light', color: 'info.dark' }}>
                <People />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="120 new attendees registered for Music Festival"
              secondary="5 hours ago"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark' }}>
                <AttachMoney />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="$5,200 in new revenue"
              secondary="1 day ago"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default ManageEvents;