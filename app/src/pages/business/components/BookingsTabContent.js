import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { MoreVert, Search, FilterList } from "@mui/icons-material";

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
  {
    id: 103,
    customer: "Jane Doe",
    event: "Food Expo",
    date: "2023-09-28",
    tickets: 1,
    status: "pending",
  },
];

const BookingsTabContent = () => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState(sampleBookings);
  const [filtered, setFiltered] = useState(sampleBookings);

  useEffect(() => {
    const result = bookings.filter(
      (b) =>
        b.customer.toLowerCase().includes(search.toLowerCase()) ||
        b.event.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, bookings]);

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

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search bookings..."
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

      <Paper>
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
              {filtered.map((booking) => (
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
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default BookingsTabContent;
