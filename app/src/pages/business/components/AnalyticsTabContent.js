import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  AttachMoney,
  People,
  Event,
  CalendarToday,
  Star,
  Add,
  Search,
  FilterList,
  TrendingUp,
  PieChart,
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart, Bar } from "recharts";

const summaryData = [
  { icon: <AttachMoney />, title: "Revenue", value: "$65,400", color: "success" },
  { icon: <People />, title: "Attendees", value: "1,530", color: "info" },
  { icon: <Event />, title: "Events", value: "8", color: "warning" },
  { icon: <CalendarToday />, title: "Upcoming", value: "3", color: "primary" },
];

const revenueTrend = [
  { month: "Jan", value: 5000 },
  { month: "Feb", value: 8000 },
  { month: "Mar", value: 12000 },
  { month: "Apr", value: 9000 },
  { month: "May", value: 15000 },
  { month: "Jun", value: 16400 },
];

const eventTypes = [
  { name: "Conference", value: 35 },
  { name: "Workshop", value: 25 },
  { name: "Concert", value: 20 },
  { name: "Exhibition", value: 15 },
  { name: "Other", value: 5 },
];

const topEvents = [
  { name: "Tech Conference", revenue: 24500, attendees: 245 },
  { name: "Music Festival", revenue: 36000, attendees: 1200 },
  { name: "Food Expo", revenue: 18500, attendees: 320 },
];

const recentActivity = [
  { icon: <Add />, title: "New event created - Tech Workshop", time: "2 hours ago", color: "success" },
  { icon: <People />, title: "120 new attendees for Music Festival", time: "5 hours ago", color: "info" },
  { icon: <AttachMoney />, title: "$5,200 in new revenue", time: "1 day ago", color: "warning" },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const AnalyticsPage = () => {
  const [search, setSearch] = useState("");
  const filteredEvents = topEvents.filter(event => event.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh', widows: '100%' }}>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        {summaryData.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card sx={{ width: '100%', width: '300px' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar color={item.color}>{item.icon}</Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                  <Typography variant="h6">{item.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container sx={{ mb: 3, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Grid item sx={{ width: '70%' }} >
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp /> Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={{ width: '28%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PieChart /> Event Types
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie data={eventTypes} dataKey="value" outerRadius={80} label>
                    {eventTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Events */}
      <Grid container spacing={2} sx={{ mb: 3, widows: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Grid item sx={{ width: '50%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Star color="warning" sx={{ mr: 1 }} /> Top Events
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Attendees</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEvents.map((event, i) => (
                      <TableRow key={i}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell align="right">${event.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">{event.attendees.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    {filteredEvents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center">No results</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item sx={{ width: '48%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Recent Activity</Typography>
              <List>
                {recentActivity.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: `${item.color}.light`, color: `${item.color}.dark` }}>
                        {item.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={item.title} secondary={item.time} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;