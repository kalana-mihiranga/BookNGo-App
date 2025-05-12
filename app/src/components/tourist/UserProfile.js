import React, { useState, useEffect } from 'react';
import { Avatar, Button, Box, Typography, Card, CardContent, TextField, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BookingHistory from './BookedEvents';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contactNo: '',
    imageUrl: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...user});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tourist/touristProfile/1', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.status) {
          setUser(response.data.data);
          setFormData(response.data.data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/updateProfile/1`, 
        {
          name: formData.name,
          email: formData.email,
          contactNo: formData.contactNo,
          imageUrl: formData.imageUrl
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.status) {
        setUser(response.data.data);
        setEditMode(false);
        setSuccess(true);
        setSnackbarOpen(true);
      } else {
        setError(response.data.message || 'Failed to update profile');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Failed to update user data');
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !editMode) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar/>
      <Card sx={{ minHeight: 300, maxWidth: 500, margin: 'auto', boxShadow: 3, borderRadius: 2, my: 7, p: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={user.name}
            src={user.imageUrl}
            sx={{ width: 120, height: 120, marginRight: 3, border: `3px solid ${blue[500]}` }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {editMode ? (
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  required
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {user.contactNo}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{ marginTop: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Booking History */}
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >    
            <Typography variant="h5" component="h5">
              Booking Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <BookingHistory/>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <Footer/>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success ? 'Profile updated successfully!' : error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;