import React, { useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Paper,
  Divider,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Event,
  Schedule,
  LocationOn,
  Description,
  Close,
  Edit,
  CloudUpload,
  CheckCircle,
  Email,
  Business,
  Phone
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    capacity: '',
    ticketPrice: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event created:', eventData);
    // Submit logic here
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Create New Event
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              label="Business Pro" 
              color="primary" 
              variant="outlined" 
              sx={{ mr: 2 }}
            />
            <IconButton onClick={() => setShowProfile(true)}>
              <Avatar 
                src="https://randomuser.me/api/portraits/men/45.jpg" 
                sx={{ width: 48, height: 48 }}
              />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Event color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                multiline
                rows={6}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date & Time"
                    name="startDate"
                    type="datetime-local"
                    value={eventData.startDate}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Schedule color="action" />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date & Time"
                    name="endDate"
                    type="datetime-local"
                    value={eventData.endDate}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Event Image
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUpload />}
                  sx={{ height: 200, mb: 1 }}
                >
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: 4
                      }} 
                    />
                  ) : (
                    'Upload Banner Image'
                  )}
                  <VisuallyHiddenInput 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Recommended size: 1200x600px (JPG/PNG)
                </Typography>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="concert">Concert</MenuItem>
                  <MenuItem value="exhibition">Exhibition</MenuItem>
                  <MenuItem value="networking">Networking</MenuItem>
                </Select>
                <FormHelperText>Select event category</FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={eventData.capacity}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">people</InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Ticket Price"
                name="ticketPrice"
                type="number"
                value={eventData.ticketPrice}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              startIcon={<CheckCircle />}
              sx={{ px: 6, py: 1.5, fontSize: '1rem' }}
            >
              Publish Event
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Profile Drawer */}
      <Drawer
        anchor="right"
        open={showProfile}
        onClose={() => setShowProfile(false)}
        PaperProps={{
          sx: { width: 380 }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setShowProfile(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar 
              src="https://randomuser.me/api/portraits/men/45.jpg" 
              sx={{ 
                width: 120, 
                height: 120,
                mx: 'auto',
                mb: 2,
                border: '4px solid',
                borderColor: 'primary.main'
              }}
            />
            <Typography variant="h5" gutterBottom>
              Kalana Mihiranga
            </Typography>
            <Chip 
              label="Business Account" 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary">
              Event Masters
            </Typography>
          </Box>

          <List>
            <ListItem>
              <ListItemIcon>
                <Email color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary="kalana@eventmasters.com" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Business color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Company" 
                secondary="Event Masters Pvt Ltd" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Contact" 
                secondary="+94 76 123 4567" 
              />
            </ListItem>
          </List>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Edit />}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default EventForm;