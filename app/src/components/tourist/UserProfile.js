import React, { useState } from 'react';
import { Avatar, Button, Box, Typography, Card, CardContent, TextField, Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BookingHistory from './BookedEvents';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const UserProfile = () => {

  const [user, setUser] = useState({
    name: 'kevin peter',
    email: 'kevin.peter@gmail.com',
    mobile: '123-456-7890',
    avatarUrl: 'https://www.example.com/avatar.jpg',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setUser(formData);
    setEditMode(false);

    console.log('Updated user data:', formData);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  return (
    <div>
          <Navbar/>
          <Card sx={{ minHeight: 300, maxWidth: 500, margin: 'auto', boxShadow: 3, borderRadius: 2, my: 7, p: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
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
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                name="mobile"
                value={formData.mobile}
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
                {user.mobile}
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


{/* history */}
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
    </div>

  );
};

export default UserProfile;
