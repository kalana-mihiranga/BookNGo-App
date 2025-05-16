import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogTitle, DialogContent, Typography, Avatar, Box,
  Chip,
  Divider,
  Grid,
  Alert,
  DialogActions
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
      <Typography variant="h5" fontWeight="500" gutterBottom>
        Booking Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Banner</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Tickets</TableCell>
              <TableCell>Event Date</TableCell>
              <TableCell align="center">View More</TableCell>
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
                <TableCell>{new Date(booking.event.date).toLocaleDateString()}</TableCell>
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
      <DialogTitle sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" component="div">
          {selectedBooking.event.name} - Booking Details
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        {/* Event Header Section */}
        <Box display="flex" gap={3} mb={3} alignItems="flex-start">
          <Avatar
            src={selectedBooking.event.bannerUrl}
            variant="rounded"
            sx={{ 
              width: 160, 
              height: 90,
              objectFit: 'cover',
              borderRadius: 1,
              boxShadow: 1
            }}
          />
          <Box flexGrow={1}>
            <Box display="flex" flexWrap="wrap" gap={2} mb={1.5}>
              <Chip 
                label={selectedBooking.event.category} 
                color="secondary" 
                size="small" 
              />
              <Chip 
                label={selectedBooking.event.type} 
                variant="outlined" 
                size="small" 
              />
            </Box>
            
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold" mr={1}>Date:</Box>
                {new Date(selectedBooking.event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold" mr={1}>Time:</Box>
                {selectedBooking.event.startTime} - {selectedBooking.event.endTime}
              </Typography>
              <Typography variant="body1">
                <Box component="span" fontWeight="bold" mr={1}>Location:</Box>
                {selectedBooking.event.location}, {selectedBooking.event.country}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Description Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph sx={{ 
            lineHeight: 1.6,
            bgcolor: 'action.hover',
            p: 2,
            borderRadius: 1
          }}>
            {selectedBooking.event.description}
          </Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Coordinator Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Event Coordinator
          </Typography>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar sx={{ width: 40, height: 40 }}>
              {selectedBooking.event.cordinatorName.charAt(0)}
            </Avatar>
            <Box>
              <Typography>{selectedBooking.event.cordinatorName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedBooking.event.cordinatorContact}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Ticket Details Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Ticket Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">
                <Box component="span" color="text.secondary">Category:</Box>
                <Box fontWeight="medium">{selectedBooking.priceCategory.name}</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">
                <Box component="span" color="text.secondary">Price:</Box>
                <Box fontWeight="medium">${selectedBooking.priceCategory.price}</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">
                <Box component="span" color="text.secondary">Quantity:</Box>
                <Box fontWeight="medium">{selectedBooking.ticketCount}</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="body1">
                <Box component="span" color="text.secondary">Total Paid:</Box>
                <Box fontWeight="medium" color="success.main">
                  ${selectedBooking.paymentAmount}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={8}>
              <Typography variant="body1">
                <Box component="span" color="text.secondary">Payment Date:</Box>
                <Box fontWeight="medium">
                  {new Date(selectedBooking.paymentDate).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Refund Policy Section */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Refund Policy
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            {selectedBooking.event.refundPolicy}
          </Alert>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="contained" 
          color="primary"
          sx={{ minWidth: 120 }}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>
    </>
  );
};

export default BookingHistory;
