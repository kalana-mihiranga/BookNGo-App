import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

const EventUpdateDialog = ({ open, onClose, eventId, onUpdated }) => {
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open && eventId) {
      axiosInstance.get(`/api/business/getEventById/${eventId}`).then((res) => {
        const data = res.data.body;
        setEvent(data);
        setFormData({
          name: data.name,
          date: data.date.slice(0, 10),
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
        });
      });
    }
  }, [open, eventId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        location: formData.location,
      };

      const response = await axiosInstance.put(`/api/tourist/updateEvent/${eventId}`, payload);

      if (response.data.success) {
        enqueueSnackbar("Successfully updated.", { variant: "success" });
        if (onUpdated) onUpdated();
        onClose();
      }
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Update Event
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {event ? (
          <Paper elevation={0} sx={{ p: 1 }}>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Event Name"
                    name="name"
                    fullWidth
                    size="small"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Date"
                    name="date"
                    type="date"
                    fullWidth
                    size="small"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="From"
                    name="startTime"
                    type="time"
                    fullWidth
                    size="small"
                    value={formData.startTime}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="To"
                    name="endTime"
                    type="time"
                    fullWidth
                    size="small"
                    value={formData.endTime}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    size="small"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventUpdateDialog;
