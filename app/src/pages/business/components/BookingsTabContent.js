import React from "react";
import {
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
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const BookingsTabContent = ({
  bookings,
  formatShortDate,
  getBookingStatusColor,
}) => (
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

export default BookingsTabContent;
