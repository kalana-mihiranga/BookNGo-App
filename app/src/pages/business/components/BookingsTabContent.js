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
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
  Pagination,
} from "@mui/material";
import { Visibility, Search, FilterList } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { Tooltip } from "@mui/material";
import axiosInstance from "../../../utils/axiosInstance";
import BookingViewDialog from "../../../components/business/BookingViewDialog";

const BookingsTabContent = () => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewBooking = (id) => {
    setSelectedBookingId(id);
    setDialogOpen(true);
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/business/getPaginatedBookings?page=${page}&limit=${limit}`
      );
      setBookings(res.data.bookings);
      setFiltered(res.data.bookings);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(bookings);
    } else {
      const result = bookings.filter(
        (b) =>
          b.tourist.user.name.toLowerCase().includes(search.toLowerCase()) ||
          b.event.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }
  }, [search, bookings]);

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
                <TableCell>Amount (LKR)</TableCell>
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
                      <Typography>{booking.tourist.user.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{booking.event.name}</TableCell>
                  <TableCell>{formatShortDate(booking.paymentDate)}</TableCell>
                  <TableCell>{booking.ticketCount}</TableCell>
                  <TableCell>
                    <Chip
                      label={`LKR ${booking.paymentAmount}`}
                      color="success"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Booking">
                      <IconButton onClick={() => handleViewBooking(booking.id)}>
                        <Visibility color="primary" />
                      </IconButton>
                    </Tooltip>
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

      {totalPages > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      <BookingViewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        bookingId={selectedBookingId}
      />
    </Box>
  );
};

export default BookingsTabContent;
