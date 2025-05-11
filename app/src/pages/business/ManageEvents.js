import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  Group,
  MonetizationOn,
  Email,
  Business,
  Phone,
  Logout,
  AccessTime,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import EventFormDialog from "../../components/business/BusinessEventCreate";
import BookingsTabContent from "./components/BookingsTabContent";
import EventsTabContent from "./components/EventTabContent";
import AnalyticsTabContent from "./components/AnalyticsTabContent";
import axiosInstance from "../../utils/axiosInstance";
import { useSnackbar } from "notistack";
import { logout } from "../../utils/logout";
import ConfirmLogoutDialog from "../../components/logout/ConfirmLogoutDialog";

const ManageEvents = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    logout(navigate, enqueueSnackbar);
  };

  const avatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&psig=AOvVaw10UdcwpPCLtdoDa25YWk53&ust=1747024093817000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPjv9oXKmo0DFQAAAAAdAAAAABAE";
  const phone = "+94 71 2543635"

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/business/getBusinessBasicDetails");
      if (response.data.data) {
        setDetails(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch details", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const ProfileDrawer = () => (
    <Drawer
      anchor="right"
      open={profileOpen}
      onClose={toggleProfile}
      sx={{
        "& .MuiDrawer-paper": {
          width: 350,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleProfile}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={avatar}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {details.name}
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
            <ListItemText primary="Email" secondary={details.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Company" secondary={details.name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={phone} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Account Created" secondary={new Date(details.createdAt).toLocaleDateString()} />
          </ListItem>
        </List>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            fullWidth
            onClick={() => setConfirmLogoutOpen(true)}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box
      sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", display: "flex" }}
    >
      <ProfileDrawer />

      <ConfirmLogoutDialog
        open={confirmLogoutOpen}
        onClose={() => setConfirmLogoutOpen(false)}
        onConfirm={handleLogout}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ backgroundColor: "white", boxShadow: 1, py: 3 }}>
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Welcome back,
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Hello {details.name ? details.name.split(" ")[0] : "User"}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setDialogOpen(true)}
                >
                  EVENT
                </Button>
                <IconButton onClick={toggleProfile}>
                  <Avatar src={avatar} />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper sx={{ mb: 3, borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="My Events" icon={<CalendarToday />} />
              <Tab label="Bookings" icon={<Group />} />
              <Tab label="Analytics" icon={<MonetizationOn />} />
            </Tabs>
          </Paper>

          {tabValue === 0 && <EventsTabContent />}

          {tabValue === 1 && <BookingsTabContent />}

          {tabValue === 2 && <AnalyticsTabContent />}
        </Container>
      </Box>

      <EventFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default ManageEvents;
