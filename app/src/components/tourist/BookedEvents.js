import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogTitle, DialogContent, Typography, Avatar, Box
} from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axiosInstance.get(`/api/tourist/getBookingByTouristId/${userId}`)
      .then(res => setBookings(res.data.bookings))
      .catch(err => console.error("Failed to fetch bookings", err));
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Booking History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Banner</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Tickets</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Avatar
                    src={booking.event.bannerUrl}
                    variant="rounded"
                    sx={{ width: 80, height: 45 }}
                  />
                </TableCell>
                <TableCell>{booking.event.name}</TableCell>
                <TableCell>${booking.paymentAmount}</TableCell>
                <TableCell>{booking.ticketCount}</TableCell>
                <TableCell>{new Date(booking.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewDetails(booking)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Booking Details */}
      <Dialog open={modalOpen} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedBooking && (
          <>
            <DialogTitle>{selectedBooking.event.name} - Booking Details</DialogTitle>
            <DialogContent dividers>
              <Box display="flex" gap={2} mb={2}>
                <Avatar
                  src={selectedBooking.event.bannerUrl}
                  variant="rounded"
                  sx={{ width: 160, height: 90 }}
                />
                <Box>
                  <Typography><strong>Category:</strong> {selectedBooking.event.category}</Typography>
                  <Typography><strong>Type:</strong> {selectedBooking.event.type}</Typography>
                  <Typography><strong>Date:</strong> {new Date(selectedBooking.event.date).toLocaleDateString()}</Typography>
                  <Typography><strong>Time:</strong> {selectedBooking.event.startTime} - {selectedBooking.event.endTime}</Typography>
                </Box>
              </Box>

              <Typography gutterBottom><strong>Description:</strong> {selectedBooking.event.description}</Typography>
              <Typography><strong>Location:</strong> {selectedBooking.event.location}, {selectedBooking.event.country}</Typography>
              <Typography><strong>Coordinator:</strong> {selectedBooking.event.cordinatorName} ({selectedBooking.event.cordinatorContact})</Typography>
              <Typography><strong>Refund Policy:</strong> {selectedBooking.event.refundPolicy}</Typography>

              <Box mt={2}>
                <Typography><strong>Ticket Category:</strong> {selectedBooking.priceCategory.name}</Typography>
                <Typography><strong>Ticket Price:</strong> ${selectedBooking.priceCategory.price}</Typography>
                <Typography><strong>Total Tickets:</strong> {selectedBooking.ticketCount}</Typography>
                <Typography><strong>Total Paid:</strong> ${selectedBooking.paymentAmount}</Typography>
                <Typography><strong>Payment Date:</strong> {new Date(selectedBooking.paymentDate).toLocaleString()}</Typography>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default BookingHistory;
