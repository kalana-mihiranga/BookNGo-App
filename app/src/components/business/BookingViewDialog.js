import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Stack,
  Avatar,
  Divider,
  Chip,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";

const BookingViewDialog = ({ open, onClose, bookingId }) => {
  const [booking, setBooking] = useState(null);

  const fetchBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/api/tourist/getBooking/${bookingId}`);
      setBooking(response.data.booking);
    } catch (error) {
      console.error("Failed to fetch booking", error);
    }
  };

  useEffect(() => {
    if (open && bookingId) {
      fetchBooking(bookingId);
    }
  }, [open, bookingId]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#f1f5f9" }}>
        <Typography variant="h6" fontWeight="bold" color="primary.dark">🎟 Booking Details</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "#f9fafb" }}>
        {!booking ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
            {/* Header */}
            <Typography variant="h6" fontWeight="bold" mb={2} color="primary.main">
              #{booking.id} — {booking.event?.name}
            </Typography>

            {/* Tourist Info */}
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="secondary.main">
              👤 Tourist Information
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                {booking.tourist?.user?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">{booking.tourist?.user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {booking.tourist?.user?.email}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Event Info */}
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="success.main">
              📍 Event Information
            </Typography>
            <Box mb={2}>
              <Typography style={{ marginBottom: "2px" }} variant="body1"><strong>Event:</strong> {booking.event?.name}</Typography>
              <Typography style={{ marginBottom: "2px" }} variant="body2" color="text.secondary">
                {booking.event?.location}, {booking.event?.country}
              </Typography>
              <Typography style={{ marginBottom: "2px" }} variant="body2"><strong>Category:</strong> {booking.event?.category}</Typography>
              <Typography style={{ marginBottom: "2px" }} variant="body2"><strong>Date:</strong> {formatDate(booking.event?.date)}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Booking Info */}
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="info.dark">
              💳 Booking Summary
            </Typography>
            <Box mb={2}>
              <Typography style={{ marginBottom: "2px" }} variant="body2"><strong>Payment Date:</strong> {formatDate(booking.paymentDate)}</Typography>
              <Typography style={{ marginBottom: "2px" }} variant="body2"><strong>Tickets:</strong> {booking.ticketCount}</Typography>
              <Typography style={{ marginBottom: "2px" }} variant="body2"><strong>Price Category:</strong> {booking.priceCategory?.name}</Typography>
              <Typography variant="body2"><strong>Price per Ticket:</strong> <Chip label={`LKR ${booking.priceCategory?.price}`} color="info" size="small" /></Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Total Paid:</strong>{" "}
                <Chip label={`LKR ${booking.paymentAmount}`} color="success" variant="outlined" />
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Refunded:</strong>{" "}
                <Chip
                  label={booking.isRefunded ? "Yes" : "No"}
                  color={booking.isRefunded ? "error" : "primary"}
                  size="small"
                  variant="outlined"
                />
              </Typography>
            </Box>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDialog;
