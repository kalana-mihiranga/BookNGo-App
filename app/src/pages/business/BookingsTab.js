import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Typography
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const sampleBookings = [
  { id: 101, customer: "John Smith", event: "Tech Conference 2023", date: "2023-10-01", tickets: 2, status: "confirmed" },
  { id: 102, customer: "Emma Johnson", event: "Music Festival", date: "2023-10-05", tickets: 4, status: "confirmed" }
];

const BookingsTab = ({ searchTerm }) => {
  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const filteredBookings = sampleBookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
            {filteredBookings.map((booking) => (
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
};

export default BookingsTab;