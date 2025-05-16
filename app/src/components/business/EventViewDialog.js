import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Chip,
  Divider,
  Grid,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";

const EventViewDialog = ({ open, onClose, eventId }) => {
  const [event, setEvent] = useState(null);

  const fetchEvent = async (eventId) => {
    try {
      const response = await axiosInstance.get(
        `/api/business/getEventById/${eventId}`
      );

      console.log("Response : ", response.data.body);

      setEvent(response.data.body);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    if (open && eventId) {
      fetchEvent(eventId);
    }
  }, [open, eventId]);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Event Details
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {!event ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            {/* Banner */}
            {event.bannerUrl && (
              <Box mb={3}>
                <img
                  src={event.bannerUrl}
                  alt={event.name}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                  }}
                />
              </Box>
            )}

            {/* Name and Description */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {event.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {event.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Info Grid */}
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Type:</strong> {event.type}</Typography>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Category:</strong> {event.category}</Typography>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Location:</strong> {event.location}, {event.country}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Date:</strong> {new Date(event.date).toDateString()}</Typography>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Time:</strong> {event.startTime} - {event.endTime}</Typography>
                <Typography sx={{ mb: 1 }} variant="body2"><strong>Max Attendees:</strong> {event.maximumCount}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Coordinator */}
            <Typography variant="subtitle1" fontWeight="bold">Coordinator</Typography>
            <Typography variant="body2">{event.cordinatorName} ({event.cordinatorContact})</Typography>

            {/* Specifications */}
            {event.specifications?.length > 0 && (
              <>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
                  Specifications
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {event.specifications.map((spec) => (
                    <Chip key={spec.id} label={spec.specName} variant="outlined" />
                  ))}
                </Box>
              </>
            )}

            {/* Conditions */}
            {event.conditions?.length > 0 && (
              <>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
                  Conditions
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {event.conditions.map((cond) => (
                    <Chip key={cond.id} label={cond.condition} color="warning" />
                  ))}
                </Box>
              </>
            )}

            {/* Price Categories */}
            {event.priceCategories?.length > 0 && (
              <>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
                  Price Categories
                </Typography>
                {event.priceCategories.map((price) => (
                  <Typography sx={{ mb: 1 }} key={price.id} variant="body2">
                    • {price.name}: ${price.price}
                  </Typography>
                ))}
              </>
            )}

            {/* Refund Policy & Hashtag */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
              Refund Policy
            </Typography>
            <Typography variant="body2">{event.refundPolicy}</Typography>

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
              Hashtag
            </Typography>
            <Typography variant="body2">{event.hashtag}</Typography>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventViewDialog;