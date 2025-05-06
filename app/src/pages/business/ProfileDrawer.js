import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar
} from '@mui/material';
import {
  Email,
  Business,
  Phone,
  Logout,
  Delete
} from '@mui/icons-material';

const ProfileDrawer = ({ open, onClose, userProfile, navigate }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': {
        width: 350,
        boxSizing: 'border-box',
      },
    }}
  >
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <Delete />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Avatar 
          src={userProfile.avatar} 
          sx={{ width: 120, height: 120, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          {userProfile.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Event Organizer
        </Typography>
      </Box>

      <List>
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Email" secondary={userProfile.email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText primary="Company" secondary={userProfile.company} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="Phone" secondary={userProfile.phone} />
        </ListItem>
      </List>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          fullWidth
          onClick={() => navigate('/')}
        >
          Logout
        </Button>
      </Box>
    </Box>
  </Drawer>
);

export default ProfileDrawer;