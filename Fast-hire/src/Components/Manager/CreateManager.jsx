import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import { message } from "antd";
import { createManager, updateManager } from "./CreateManager";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import "../Common/Design.css";

const CreateManager = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    alternatePhone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    aadharNumber: "",
    pancardNumber: "",
    experienceYears: "",
    status: "Active",
    gender: "",
    dateOfJoining: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Handle text field changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle state dropdown
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  // ✅ Handle profile photo upload
  const handleFileChange = (e) =>
    e.target.files[0] && setProfilePhoto(e.target.files[0]);

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      alternatePhone: "",
      address: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pinCode: "",
      aadharNumber: "",
      pancardNumber: "",
      experienceYears: "",
      status: "Active",
      gender: "",
      dateOfJoining: "",
    });
    setSelectedState("");
    setProfilePhoto(null);
    setIsEdit(false);
    setEditId(null);
  };

  // ✅ Submit form
  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");

    // Required validation
    if (!formData.email?.trim()) return message.error("Email is required.");
    if (!formData.name?.trim()) return message.error("Name is required.");
    if (!isEdit && !formData.password?.trim())
      return message.error("Password is required for new managers.");

    try {
      setLoading(true);

      if (isEdit && editId) {
        await updateManager(editId, formData, profilePhoto, authToken);
        message.success("Manager updated successfully!");
      } else {
        await createManager(formData, profilePhoto, authToken);
        message.success("Manager created successfully!");
      }

      resetForm();
    } catch (err) {
      console.error("Error:", err);
      message.error(
        err.response?.data?.message || "Failed to submit manager."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} sx={{ maxWidth: "1000px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {isEdit ? "Update Manager" : ""}
      </Typography>

      <Grid container spacing={2} className="textField-root">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required={!isEdit}
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            fullWidth
            required
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="City"
            name="city"
            fullWidth
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="State"
            name="state"
            fullWidth
            value={formData.state}
            onChange={handleStateChange}
          >
            {Object.keys(indianStatesAndDistricts).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="District"
            name="district"
            fullWidth
            value={formData.district}
            onChange={handleChange}
            disabled={!selectedState}
          >
            {selectedState &&
              indianStatesAndDistricts[selectedState].map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Country"
            name="country"
            fullWidth
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="PinCode"
            name="pinCode"
            fullWidth
            value={formData.pinCode}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Profile Photo
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          </Button>
          {profilePhoto && (
            <Typography variant="body2" color="textSecondary" mt={1}>
              Selected: {profilePhoto.name}
            </Typography>
          )}
        </Grid> */}
      </Grid>

      <Box mt={3} display="flex" justifyContent="center">
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#1976d2", borderRadius: "6px" }}
          disabled={loading}
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Submitting..."
            : isEdit
            ? "Update"
            : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateManager;
