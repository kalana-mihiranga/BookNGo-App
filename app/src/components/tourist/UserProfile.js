import React, { useState, useEffect } from 'react';
import { 
  Avatar, 
  Button, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Accordion, 
  AccordionDetails, 
  Snackbar, 
  Alert,
  Collapse
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BookingHistory from './BookedEvents';
import axiosInstance from '../../utils/axiosInstance';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axiosInstance.get(`/api/tourist/touristProfile/${userId}`)
      .then(res => {
        setUser(res.data.data);
        setFormData({
          name: res.data.data.name,
          email: res.data.data.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate passwords if they're being changed
    if (showPasswordFields) {
      if (!formData.currentPassword) {
        setError("Current password is required");
        setSnackbarOpen(true);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords don't match");
        setSnackbarOpen(true);
        return;
      }
      if (formData.newPassword.length < 6) {
        setError("Password must be at least 6 characters long");
        setSnackbarOpen(true);
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem("userId");
      const payload = {
        name: formData.name,
        email: formData.email
      };

      // Include password fields only if password is being changed
      if (showPasswordFields) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const response = await axiosInstance.put(
        `/api/tourist/updateProfile/${userId}`, 
        payload,
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
        setShowPasswordFields(false);
        setSuccess(true);
        setError('Profile updated successfully!');
        setSnackbarOpen(true);
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
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
    setFormData({
      name: user.name,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setEditMode(false);
    setShowPasswordFields(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Card 
        sx={{ 
          minHeight: 300, 
          maxWidth: 500, 
          margin: 'auto', 
          boxShadow: 3, 
          borderRadius: 2, 
          my: 7, 
          p: 3 
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={user.name}
            src="/default-avatar.png"
            sx={{ 
              width: 120, 
              height: 120, 
              marginRight: 3, 
              border: `3px solid ${blue[500]}` 
            }}
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

                {!showPasswordFields && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setShowPasswordFields(true)}
                    sx={{ mt: 1 }}
                  >
                    Change Password
                  </Button>
                )}

                <Collapse in={showPasswordFields}>
                  <Box sx={{ borderTop: '1px solid #eee', pt: 2 }}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      variant="outlined"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      sx={{ marginBottom: 0.5 }}
                      required
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      sx={{ marginBottom: 0.5 }}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      variant="outlined"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                      required
                    />
                  </Box>
                </Collapse>

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

      {/* Booking History Section */}
      <div>
        <Accordion>
          <AccordionDetails sx={{ p: 0 }}>
            <Box sx={{ maxHeight: 500, overflowY: 'auto', width: '100%' }}>
              <Box sx={{ p: 2 }}>
                <BookingHistory />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <Footer />

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
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;