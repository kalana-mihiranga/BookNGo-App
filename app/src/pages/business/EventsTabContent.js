import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Avatar,
  Badge
} from '@mui/material';
import {
  Add,
  CalendarToday,
  Delete,
  Edit,
  Group,
  LocationOn,  // This was the missing import
  MonetizationOn,
  Visibility
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 10,
    padding: '0 4px',
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const EventsTabContent = ({ 
  filteredEvents, 
  handleViewEvent,
  handleEditEvent,
  handleDeleteEvent,
  getStatusColor,
  handleCreateEvent,
  searchTerm
}) => {
  return (
    <>
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <StyledBadge
                badgeContent={event.status.toUpperCase()}
                color={getStatusColor(event.status)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={event.image}
                  alt={event.title}
                />
              </StyledBadge>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {event.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={event.category} size="small" />
                  <Chip
                    icon={<LocationOn fontSize="small" />}
                    label={event.location}
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {formatDate(event.date)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Group fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {event.attendees}/{event.capacity} attendees
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MonetizationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold">
                    ${event.revenue.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip title="View">
                  <IconButton onClick={() => handleViewEvent(event.id)}>
                    <Visibility color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditEvent(event.id)}>
                    <Edit color="info" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteEvent(event.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No events found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm ? 'Try a different search term' : 'Create your first event to get started'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
        </Paper>
      )}
    </>
  );
};

export default EventsTabContent;