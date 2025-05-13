import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
  Group,
  LocationOn,
  Visibility,
  Edit,
  Delete,
  Search,
  FilterList,
  MonetizationOn 
} from "@mui/icons-material";
import axiosInstance from "../../../utils/axiosInstance";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontWeight: "bold",
    borderRadius: "12px",
    border: "1px solid #ddd",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EventsTabContent = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/business/getPaginatedEvents",
        {
          params: {
            page: page,
            limit: limit,
          },
        }
      );
      setTotalPages(response.data.totalPages)
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search events..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ width: 300 }}
        />

        <Button variant="outlined" startIcon={<FilterList />}>
          Filters
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
        {events.map((event) => (
          <Card
            key={event.id}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height="160"
              image={event.bannerUrl}
              alt={event.keyword}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6">
                {event.name}
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
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Group fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {event.currentBookingCount}/{event.maximumCount} attendees
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MonetizationOn fontSize="small" sx={{ mr: 1 }} /> Min : 
                <Typography sx={{ pl: 1 }} variant="body2" fontWeight="bold">
                  LKR {event.price}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <Box
              sx={{ p: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Tooltip title="View">
                <IconButton>
                  <Visibility color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <Edit color="info" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>

      {events.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No events found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Try a different search term or create your first event
          </Typography>
        </Paper>
      )}

      {events.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <StyledPagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
};

export default EventsTabContent;
