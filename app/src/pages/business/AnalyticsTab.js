import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Stack
} from '@mui/material';
import {
  AttachMoney,
  People,
  Event,
  CalendarToday,
  Timeline,
  PieChart,
  BarChart,
  Star,
  Add,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';

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

const AnalyticsTab = () => {
  return (
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
                  <PeopleIcon />
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
                  <AttachMoneyIcon />
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
};

export default AnalyticsTab;