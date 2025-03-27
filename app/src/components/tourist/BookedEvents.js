import React, { useState } from 'react';
import { Typography, TableContainer, TableCell, Paper, Table, TableHead, TableRow, TableBody } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const BookingHistory = () => {

  const [bookedEvents] = useState([
    {
      id: 1,
      title: 'Music Concert',
      category: 'Music',
      price: 50,
      bookingPrice: 10,
      quantity: 2,
      totalPrice: 120,
      bookingDate: '2025-03-20',
    },
    {
      id: 2,
      title: 'Art Exhibition',
      category: 'Art',
      price: 30,
      bookingPrice: 5,
      quantity: 3,
      totalPrice: 105,
      bookingDate: '2025-03-15',
    },
    {
      id: 3,
      title: 'Food Festival',
      category: 'Food',
      price: 20,
      bookingPrice: 8,
      quantity: 4,
      totalPrice: 112,
      bookingDate: '2025-03-10',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">

<Navbar/>
      <Typography variant="h4" component="h1" className="text-center py-8 font-bold pt-4">
        Booking History
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Total Price</strong></TableCell>
            <TableCell><strong>Booking Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{event.quantity}</TableCell>
              <TableCell>${event.totalPrice}</TableCell>
              <TableCell>{event.bookingDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Footer/>
    </div>
  );
};

export default BookingHistory;
