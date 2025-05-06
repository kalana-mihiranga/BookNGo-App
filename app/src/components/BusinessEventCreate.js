import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EventFormDialog({ open, onClose }) {
  const [form, setForm] = useState({
    businessId: 2,
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
    specifications: [""],
    conditions: [""],
    priceCategories: [{ name: "", price: "" }],
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (section, index, key, value) => {
    const updated = [...form[section]];
    if (key) updated[index][key] = value;
    else updated[index] = value;
    setForm(prev => ({ ...prev, [section]: updated }));
  };

  const addItem = (section, item) => {
    setForm(prev => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const removeItem = (section, index) => {
    const updated = [...form[section]];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, [section]: updated }));
  };

  const handleSubmit = () => {
    console.log("Submit Payload:", form);
    onClose();
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
          {/* Basic Fields */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField fullWidth label="Name" size="small" value={form.name}
              onChange={e => handleChange("name", e.target.value)} InputProps={{ sx: { textTransform: "uppercase" } }} />
            <TextField fullWidth label="Type" size="small" value={form.type}
              onChange={e => handleChange("type", e.target.value)} InputProps={{ sx: { textTransform: "uppercase" } }} />
            <TextField fullWidth label="Category" size="small" value={form.category}
              onChange={e => handleChange("category", e.target.value)} InputProps={{ sx: { textTransform: "uppercase" } }} />
            <TextField fullWidth label="Max Count" type="number" size="small" value={form.maximumCount}
              onChange={e => handleChange("maximumCount", e.target.value)} />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField fullWidth label="Coordinator Name" size="small" value={form.cordinatorName}
              onChange={e => handleChange("cordinatorName", e.target.value)} />
            <TextField fullWidth label="Coordinator Contact" size="small" value={form.cordinatorContact}
              onChange={e => handleChange("cordinatorContact", e.target.value)} />
            <TextField fullWidth label="Location" size="small" value={form.location}
              onChange={e => handleChange("location", e.target.value)} />
            <TextField fullWidth label="Country" size="small" value={form.country}
              onChange={e => handleChange("country", e.target.value)} />
          </Box>

          <TextField fullWidth label="Description" size="small" multiline rows={2} value={form.description}
            onChange={e => handleChange("description", e.target.value)} />

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField fullWidth label="Hashtag" size="small" value={form.hashtag}
              onChange={e => handleChange("hashtag", e.target.value)} />
            <TextField fullWidth label="Banner URL" size="small" value={form.bannerUrl}
              onChange={e => handleChange("bannerUrl", e.target.value)} />
            <TextField fullWidth label="Refund Policy" size="small" value={form.refundPolicy}
              onChange={e => handleChange("refundPolicy", e.target.value)} />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField fullWidth label="Start Time" type="time" size="small" value={form.startTime}
              onChange={e => handleChange("startTime", e.target.value)} />
            <TextField fullWidth label="End Time" type="time" size="small" value={form.endTime}
              onChange={e => handleChange("endTime", e.target.value)} />
            <TextField fullWidth label="Date" type="date" size="small" value={form.date}
              onChange={e => handleChange("date", e.target.value)} InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="Discount (%)" type="number" size="small" value={form.discount}
              onChange={e => handleChange("discount", e.target.value)} />
          </Box>

          {/* Side-by-side Specifications and Conditions */}
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
                    value={item}
                    onChange={e =>
                      handleArrayChange("specifications", i, null, e.target.value)
                    }
                  />
                  <IconButton
                    onClick={() => removeItem("specifications", i)}
                    disabled={form.specifications.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={() => addItem("specifications", "")}>
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
                    value={item}
                    onChange={e =>
                      handleArrayChange("conditions", i, null, e.target.value)
                    }
                  />
                  <IconButton
                    onClick={() => removeItem("conditions", i)}
                    disabled={form.conditions.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={() => addItem("conditions", "")}>
                Add Condition
              </Button>
            </Box>
          </Box>

          {/* Price Categories */}
          <Box>
            <Box sx={{ fontWeight: "bold", mb: 1 }}>Price Categories</Box>
            {form.priceCategories.map((cat, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 1 }}>
                <TextField fullWidth size="small" label="Name" value={cat.name}
                  onChange={e => handleArrayChange("priceCategories", i, "name", e.target.value)} />
                <TextField fullWidth size="small" label="Price" type="number" value={cat.price}
                  onChange={e => handleArrayChange("priceCategories", i, "price", e.target.value)} />
                <IconButton onClick={() => removeItem("priceCategories", i)} disabled={form.priceCategories.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={() => addItem("priceCategories", { name: "", price: "" })}>Add Price Category</Button>
          </Box>

          {/* Submit */}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
              Publish Event
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
