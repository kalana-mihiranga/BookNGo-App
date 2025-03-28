import React, { useState } from 'react';
import { 
  TableContainer, 
  TableCell, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableBody,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Stack,
  Pagination
} from '@mui/material';
import {
  Event,
  MusicNote,
  Palette,
  Restaurant,
  Receipt,
  CalendarToday,
  CheckCircle,
  MoreVert,
  Print,
  Share
} from '@mui/icons-material';

const BookingHistory = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

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
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
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
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
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
      status: 'cancelled',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      title: 'Theater Play',
      category: 'Theater',
      price: 45,
      bookingPrice: 12,
      quantity: 2,
      totalPrice: 114,
      bookingDate: '2025-03-25',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      title: 'Sports Event',
      category: 'Sports',
      price: 35,
      bookingPrice: 7,
      quantity: 5,
      totalPrice: 210,
      bookingDate: '2025-04-02',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'music': return <MusicNote />;
      case 'art': return <Palette />;
      case 'food': return <Restaurant />;
      default: return <Event />;
    }
  };

  const getStatusChip = (status) => {
    let color;
    switch(status) {
      case 'confirmed': color = 'primary'; break;
      case 'completed': color = 'success'; break;
      case 'cancelled': color = 'error'; break;
      case 'upcoming': color = 'warning'; break;
      default: color = 'default';
    }
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={color} 
        size="small"
        icon={<CheckCircle fontSize="small" />}
      />
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>

      <Paper elevation={3} sx={{ 
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f4f8' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Event</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Tickets</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookedEvents.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((event) => (
                <TableRow 
                  key={event.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={event.image} 
                        variant="rounded"
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {event.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getCategoryIcon(event.category)}
                      label={event.category}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {event.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold">
                      ${event.totalPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {new Date(event.bookingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(event.status)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Print receipt">
                        <IconButton size="small">
                          <Print fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton size="small">
                          <Share fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <IconButton size="small">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Pagination
            count={Math.ceil(bookedEvents.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingHistory;