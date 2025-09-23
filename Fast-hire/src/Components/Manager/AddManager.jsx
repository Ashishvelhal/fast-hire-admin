import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Grid,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Table, message, Spin } from "antd";
import { createManager, getAllManagers } from "./AddManager";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import "../Common/Design.css";

const ManagerLogin = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [managers, setManagers] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

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
    status: "ACTIVE",
    gender: "",
  });

  // fetch managers
  const fetchManagers = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      message.error("SuperAdmin not logged in. Please login first.");
      return;
    }
    try {
      setTableLoading(true);
      const response = await getAllManagers(authToken); // ⬅️ your API
      setManagers(response.data || []);
    } catch (error) {
      console.error("Error fetching managers:", error);
      message.error("Failed to load managers.");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      alert("SuperAdmin not logged in. Please login first.");
      return;
    }

    try {
      setLoading(true);
      const formDataObj = new FormData();
      formDataObj.append("manager", JSON.stringify(formData));
      if (profilePhoto) formDataObj.append("profilePhoto", profilePhoto);

      await createManager(formDataObj, authToken);
      alert("Manager created successfully!");
      fetchManagers(); // refresh table

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
        status: "ACTIVE",
        gender: "",
      });
      setSelectedState("");
      setProfilePhoto(null);
      handleClose();
    } catch (error) {
      console.error("Error creating manager:", error);
      alert("Failed to create manager. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "District", dataIndex: "district", key: "district" },
    { title: "Exp.Years", dataIndex: "experienceYears", key: "experienceYears" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "ACTIVE" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Register Manager
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Register Manager</Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
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
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
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
                label="Alternate Phone"
                name="alternatePhone"
                fullWidth
                value={formData.alternatePhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="City"
                name="city"
                fullWidth
                required
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
                required
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
                required
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
                required
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Pin Code"
                name="pinCode"
                fullWidth
                required
                value={formData.pinCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Aadhar Number"
                name="aadharNumber"
                fullWidth
                required
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="PAN Number"
                name="pancardNumber"
                fullWidth
                required
                value={formData.pancardNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Experience (Years)"
                name="experienceYears"
                type="number"
                fullWidth
                required
                value={formData.experienceYears}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Profile Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {profilePhoto && (
                <Typography variant="caption" display="block">
                  {profilePhoto.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={3}>
        {tableLoading ? (
          <Spin tip="Loading managers..." />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={managers}
            pagination={{ pageSize: 5 }}
            bordered
          />
        )}
      </Box>
    </Box>
  );
};

export default ManagerLogin;
