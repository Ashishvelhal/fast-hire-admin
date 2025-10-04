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
import {
  createManager,
  getAllManagers,
  updateManager,
  deleteManager,
} from "./CreateManager"; 
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";

const CreateManager = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [managers, setManagers] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

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

  // Fetch managers
  const fetchManagers = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");

    try {
      setTableLoading(true);
      const res = await getAllManagers(authToken);
      setManagers(res.data || []);
    } catch {
      message.error("Failed to load managers.");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleClickOpen = () => {
    resetForm();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  const handleFileChange = (e) =>
    e.target.files[0] && setProfilePhoto(e.target.files[0]);

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
      status: "ACTIVE",
      gender: "",
    });
    setSelectedState("");
    setProfilePhoto(null);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");

    try {
      setLoading(true);
      const formDataObj = new FormData();
      formDataObj.append("manager", JSON.stringify(formData));
      if (profilePhoto) formDataObj.append("profilePhoto", profilePhoto);

      if (isEdit && editId) {
        await updateManager(editId, formDataObj, authToken);
        message.success("Manager updated successfully!");
      } else {
        await createManager(formDataObj, authToken);
        message.success("Manager created successfully!");
      }

      fetchManagers();
      resetForm();
      handleClose();
    } catch {
      message.error("Failed to submit manager.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setEditId(record.id);
    setFormData({ ...record, password: "" });
    setSelectedState(record.state);
    setProfilePhoto(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");
    try {
      await deleteManager(id, authToken);
      message.success("Manager deleted!");
      fetchManagers();
    } catch {
      message.error("Delete failed.");
    }
  };

  const columns = [
    { title: "Sr.No", key: "index", render: (_, __, index) => index + 1, width: 70 },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => handleEdit(record)}
        >
          {text}
        </span>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "District", dataIndex: "district", key: "district" },
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

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">
            {isEdit ? "Update Manager" : "Register Manager"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
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
            {loading ? (isEdit ? "Updating..." : "Registering...") : isEdit ? "Update" : "Register"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
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

export default CreateManager;
