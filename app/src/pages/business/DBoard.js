import React from "react";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  CheckCircle,
  PendingActions,
  Cancel,
  AttachMoney,
} from "@mui/icons-material"; // Material UI Icons
import MiniDrawer from "./BusinessLayout"; // MiniDrawer component import

// Data for bar chart with increased bookings (up to 70%)
const bookingData = [
  { name: "Jan", bookings: 300 },
  { name: "Feb", bookings: 275 },
  { name: "Mar", bookings: 450 },
  { name: "Apr", bookings: 520 },
  { name: "May", bookings: 700 },
  { name: "Jun", bookings: 800 },
  { name: "Jul", bookings: 850 },
  { name: "Aug", bookings: 900 },
  { name: "Sep", bookings: 950 },
  { name: "Oct", bookings: 1050 },
  { name: "Nov", bookings: 1200 },
  { name: "Dec", bookings: 1275 },
];

// Data for pie chart (customer categories)
const customerData = [
  { name: "Hotels", value: 600 },
  { name: "Tours", value: 400 },
  { name: "Flights", value: 200 },
  { name: "Packages", value: 300 },
];

// Colors for Pie chart
const pieColors = ["#27667B", "#A0C878", "#DDEB9D", "#FF6F61"];

// Top Stats Data (Completed, Pending, Cancelled bookings)
const topStats = {
  completed: 1500,
  pending: 250,
  cancelled: 100,
  revenue: 50000, // New card for revenue
};

export default function TourismDashboard() {
  return (
    <MiniDrawer>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
          height: "100vh",
          background: "linear-gradient(to bottom right, #f3f4f6, #e0f7fa)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#143D60", letterSpacing: "2px" }}
        >
          Tourism Business Dashboard
        </Typography>

        {/* Top Stats Section */}
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
          spacing={0}
          mb={3}
        >
          {/* Completed Bookings */}
          <Grid md={3}>
            <Paper
              sx={{
                width: "250px",
                height: "100px",
                paddingTop: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#A0C878",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Completed Bookings
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                <CheckCircle sx={{ fontSize: 30, marginBottom: 1 }} />{" "}
                {topStats.completed}
              </Typography>
            </Paper>
          </Grid>

          {/* Pending Bookings */}
          <Grid md={3}>
            <Paper
              sx={{
                width: "250px",
                height: "100px",
                paddingTop: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#27667B",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Pending Bookings
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                <PendingActions sx={{ fontSize: 30, marginBottom: 1 }} />{" "}
                {topStats.pending}
              </Typography>
            </Paper>
          </Grid>

          {/* Cancelled Bookings */}
          <Grid md={3}>
            <Paper
              sx={{
                width: "250px",
                height: "100px",
                paddingTop: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#DDEB9D",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#143D60" }}>
                Cancelled Bookings
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#143D60", fontWeight: "bold" }}
              >
                <Cancel sx={{ fontSize: 30, marginBottom: 1 }} />{" "}
                {topStats.cancelled}
              </Typography>
            </Paper>
          </Grid>

          {/* Revenue (New Card) */}
          <Grid md={3}>
            <Paper
              sx={{
                width: "250px",
                height: "100px",
                paddingTop: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#FF6F61",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Revenue
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                <AttachMoney sx={{ fontSize: 30, marginBottom: 1 }} /> $
                {topStats.revenue.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Booking Analysis - Bar Chart */}
        <Grid container spacing={0}>
          <Grid sx={{ width: "70%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#27667B" }}
            >
              Monthly Booking Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#A0C878" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Customer Categories - Pie Chart */}
          <Grid sx={{ width: "30%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#27667B" }}
            >
              Customer Categories
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#A0C878"
                  label
                >
                  {customerData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </MiniDrawer>
  );
}
