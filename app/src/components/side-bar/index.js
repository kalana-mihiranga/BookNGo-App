import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  styled
} from '@mui/material';
import {
  Menu,
  ChevronLeft,
  Event,
  Star,
  Category,
  NearMe,
  ConfirmationNumber,
  Receipt,
  Hotel,
  DirectionsCar,
  Place,
  WbSunny,
  Info,
  Mail,
  Help
} from '@mui/icons-material';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? 240 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 56,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden'
        },
      }}
    >
      <DrawerHeader>
        {sidebarOpen && <Typography variant="h6">Menu</Typography>}
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      {/* Events Section */}
      <List>
        <ListItem button>
          <ListItemIcon><Event /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Upcoming Events" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><Category /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Categories" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><NearMe /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Events Near Me" />}
        </ListItem>
      </List>
      <Divider />

      {/* Bookings Section */}
      <List>
        <ListItem button>
          <ListItemIcon><ConfirmationNumber /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="My Bookings" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><Receipt /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Payment History" />}
        </ListItem>
      </List>
      <Divider />

      {/* Tourist Guide Section */}
      <List>

        <ListItem button>
          <ListItemIcon><WbSunny /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Weather Updates" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><Info /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Cultural & Safety Tips" />}
        </ListItem>
      </List>
      <Divider />

      {/* Support Section */}
      <List>
        <ListItem button>
          <ListItemIcon><Mail /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="Contact Us" />}
        </ListItem>
        <ListItem button>
          <ListItemIcon><Help /></ListItemIcon>
          {sidebarOpen && <ListItemText primary="FAQs" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;