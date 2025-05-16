import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export default function EventFormDialog({ open, onClose }) {
  const EVENT_TYPES = [
    "Public",
    "Private",
    "VIP Exclusive",
    "Open Air",
    "Indoor",
    "Festival",
    "Themed Party",
    "Workshop",
    "Retreat",
    "Tour Package",
  ];

  const EVENT_CATEGORIES = [
    "Weekend Vibe",
    "DJ Party",
    "Beach Party",
    "Nightlife Experience",
    "Cultural Night",
    "Camping & Bonfire",
    "Live Music Show",
    "Food & Drink Festival",
    "Luxury Cruise Party",
    "Sunset Gathering",
  ];

  const COUNTRIES = ["Sri Lanka", "Thailand", "Indonesia", "Vietnam", "India"];

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    maximumCount: "",
    cordinatorName: "",
    cordinatorContact: "",
    description: "",
    hashtag: "",
    location: "",
    country: "",
    discount: "",
    refundPolicy: "",
    startTime: "",
    endTime: "",
    date: "",
    bannerUrl: "",
    specifications: [{ specName: "" }],
    conditions: [{ condition: "" }],
    priceCategories: [{ name: "", price: "" }],
  });

  const { enqueueSnackbar } = useSnackbar();

  // const handleChange = (key, value) => {
  //   setForm((prev) => ({ ...prev, [key]: value }));
  // };

  // const handleArrayChange = (section, index, key, value) => {
  //   const updated = [...form[section]];
  //   updated[index][key] = value;
  //   setForm((prev) => ({ ...prev, [section]: updated }));
  // };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleArrayChange = (section, index, key, value) => {
    const updated = [...form[section]];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, [section]: updated }));
    const errorKey = `${section}-${
      key === "price" ? key : ""
    }-${index}`.replace("--", "-");
    setErrors((prev) => ({ ...prev, [errorKey]: false }));
  };

  const addItem = (section, item) => {
    setForm((prev) => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const removeItem = (section, index) => {
    const updated = [...form[section]];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fix validation issues.", {
        variant: "error",
      });
      return;
    }

    const payload = {
      ...form,
      maximumCount: parseInt(form.maximumCount),
      discount: parseFloat(form.discount),
      priceCategories: form.priceCategories.map((cat) => ({
        name: cat.name,
        price: parseFloat(cat.price),
      })),
    };

    try {
      const response = await axiosInstance.post(
        "/api/business/addEvent",
        payload
      );
      const successMessage = response.data?.message || "Event created!";
      enqueueSnackbar(successMessage, { variant: "success" });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Event creation failed. Please try again.";
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "type",
      "category",
      "maximumCount",
      "cordinatorName",
      "cordinatorContact",
      "description",
      "hashtag",
      "location",
      "country",
      "discount",
      "refundPolicy",
      "startTime",
      "endTime",
      "date",
      "bannerUrl",
    ];

    requiredFields.forEach((field) => {
      if (!form[field] || form[field].toString().trim() === "") {
        newErrors[field] = true;
      }
    });

    form.specifications.forEach((item, i) => {
      if (!item.specName.trim()) {
        newErrors[`specifications-${i}`] = true;
      }
    });

    form.conditions.forEach((item, i) => {
      if (!item.condition.trim()) {
        newErrors[`conditions-${i}`] = true;
      }
    });

    form.priceCategories.forEach((item, i) => {
      if (!item.name.trim()) {
        newErrors[`priceCategories-name-${i}`] = true;
      }
      if (item.price === "" || isNaN(parseFloat(item.price))) {
        newErrors[`priceCategories-price-${i}`] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setForm({
      name: "",
      type: "",
      category: "",
      maximumCount: "",
      cordinatorName: "",
      cordinatorContact: "",
      description: "",
      hashtag: "",
      location: "",
      country: "",
      discount: "",
      refundPolicy: "",
      startTime: "",
      endTime: "",
      date: "",
      bannerUrl: "",
      specifications: [{ specName: "" }],
      conditions: [{ condition: "" }],
      priceCategories: [{ name: "", price: "" }],
    });
    setErrors({});
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          color: "white",
          bgcolor: "#edc24c",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "1em",
        }}
      >
        <span>Create Event</span>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Name"
              size="small"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              InputProps={{ sx: { textTransform: "uppercase" } }}
              error={!!errors.name}
            />
            <TextField
              select
              fullWidth
              label="Type"
              size="small"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              error={!!errors.type}
            >
              {EVENT_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Category"
              size="small"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              error={!!errors.category}
            >
              {EVENT_CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Max Count"
              type="number"
              size="small"
              value={form.maximumCount}
              onChange={(e) => handleChange("maximumCount", e.target.value)}
              error={!!errors.maximumCount}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Coordinator Name"
              size="small"
              value={form.cordinatorName}
              onChange={(e) => handleChange("cordinatorName", e.target.value)}
              error={!!errors.cordinatorName}
            />
            <TextField
              fullWidth
              label="Coordinator Contact"
              size="small"
              value={form.cordinatorContact}
              onChange={(e) =>
                handleChange("cordinatorContact", e.target.value)
              }
              error={!!errors.cordinatorContact}
            />
            <TextField
              fullWidth
              label="Location"
              size="small"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={!!errors.location}
            />
            <TextField
              select
              fullWidth
              label="Country"
              size="small"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              error={!!errors.country}
            >
              {COUNTRIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Description"
            size="small"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={!!errors.description}
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Hashtag"
              size="small"
              value={form.hashtag}
              onChange={(e) => handleChange("hashtag", e.target.value)}
              error={!!errors.hashtag}
            />
            <TextField
              fullWidth
              label="Banner URL"
              size="small"
              value={form.bannerUrl}
              onChange={(e) => handleChange("bannerUrl", e.target.value)}
              error={!!errors.bannerUrl}
            />
            <TextField
              fullWidth
              label="Refund Policy"
              size="small"
              value={form.refundPolicy}
              onChange={(e) => handleChange("refundPolicy", e.target.value)}
              error={!!errors.refundPolicy}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              size="small"
              value={form.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              error={!!errors.startTime}
            />
            <TextField
              fullWidth
              label="End Time"
              type="time"
              size="small"
              value={form.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              error={!!errors.endTime}
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              size="small"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
            />
            <TextField
              fullWidth
              label="Discount (%)"
              type="number"
              size="small"
              value={form.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
              error={!!errors.discount}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Specifications */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: "bold", mb: 1 }}>Specifications</Box>
              {form.specifications.map((item, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Specification ${i + 1}`}
                    value={item.specName}
                    onChange={(e) =>
                      handleArrayChange(
                        "specifications",
                        i,
                        "specName",
                        e.target.value
                      )
                    }
                    error={!!errors[`specifications-${i}`]}
                  />
                  <IconButton
                    onClick={() => removeItem("specifications", i)}
                    disabled={form.specifications.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                onClick={() => addItem("specifications", { specName: "" })}
              >
                Add Specification
              </Button>
            </Box>

            {/* Conditions */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: "bold", mb: 1 }}>Conditions</Box>
              {form.conditions.map((item, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Condition ${i + 1}`}
                    value={item.condition}
                    onChange={(e) =>
                      handleArrayChange(
                        "conditions",
                        i,
                        "condition",
                        e.target.value
                      )
                    }
                      error={!!errors[`conditions-${i}`]}
                  />
                  <IconButton
                    onClick={() => removeItem("conditions", i)}
                    disabled={form.conditions.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={() => addItem("conditions", { condition: "" })}>
                Add Condition
              </Button>
            </Box>
          </Box>

          {/* Price Categories */}
          <Box>
            <Box sx={{ fontWeight: "bold", mb: 1 }}>Price Categories</Box>
            {form.priceCategories.map((cat, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Name"
                  value={cat.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "priceCategories",
                      i,
                      "name",
                      e.target.value
                    )
                  }
                  error={!!errors[`priceCategories-name-${i}`]}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Price"
                  type="number"
                  value={cat.price}
                  onChange={(e) =>
                    handleArrayChange(
                      "priceCategories",
                      i,
                      "price",
                      e.target.value
                    )
                  }
                  error={!!errors[`priceCategories-price-${i}`]}
                />
                <IconButton
                  onClick={() => removeItem("priceCategories", i)}
                  disabled={form.priceCategories.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={() =>
                addItem("priceCategories", { name: "", price: "" })
              }
            >
              Add Price Category
            </Button>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Box width="150px">
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleClear}
                sx={{
                  "&:hover": {
                    backgroundColor: "red",
                    borderColor: "#fff",
                  },
                }}
              >
                Clear
              </Button>
            </Box>

            <Box width="150px">
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                Publish Event
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
