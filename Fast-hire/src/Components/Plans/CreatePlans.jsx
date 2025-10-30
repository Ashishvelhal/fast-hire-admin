import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from "@mui/material";
import { Table, Tag } from "antd";
import Swal from "sweetalert2";
import "../Common/Design.css";
import CloseIcon from "@mui/icons-material/Close";

import { createPlan, getAllPlans, updatePlan } from "./CreatePlans";

const statusOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

const initialForm = {
  name: "",
  durationInMonths: "",
  jobPostLimit: "",
  price: "",
  featuresInput: "",
  features: [],
  discountPercentage: "",
  isActive: true,
  planType: "MONTHLY",
};

function CreatePlan() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const authToken = sessionStorage.getItem("authToken");
  const createdByEmail = sessionStorage.getItem("email");

  const fetchPlans = async () => {
    try {
      // Use res.plans instead of res.data.plans
      const res = await getAllPlans(); 
      const dataArray = Array.isArray(res.plans) ? res.plans : [];

      const formatted = dataArray.map((p) => ({
        ...p,
        key: p.id,
        features: Array.isArray(p.features) ? p.features : [],
      }));

      setPlans(formatted);
    } catch (error) {
      console.error("Error fetching plans:", error);
      Swal.fire("Error", "Failed to load plans.", "error");
    }
  };

  useEffect(() => {
    if (authToken) fetchPlans();
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isActive") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleClose = () => setOpen(false);


  const addFeature = () => {
    const feature = formData.featuresInput?.trim();
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
        featuresInput: "",
      }));
    }
  };

  const removeFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken || !createdByEmail) {
      Swal.fire("Error", "SuperAdmin not logged in. Please login first.", "error");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        durationInMonths: formData.durationInMonths
          ? Number(formData.durationInMonths)
          : null,
        jobPostLimit: formData.jobPostLimit
          ? Number(formData.jobPostLimit)
          : null,
        price: formData.price ? Number(formData.price) : null,
        features: formData.features,
        discountPercentage: formData.discountPercentage
          ? Number(formData.discountPercentage)
          : null,
        isActive: formData.isActive,
        planType: formData.planType,
        createdByEmail,
      };

      if (editMode && selectedPlanId) {
        await updatePlan(selectedPlanId, payload, authToken);
        Swal.fire("Updated!", "Plan updated successfully!", "success");
      } else {
        await createPlan(payload, authToken);
        Swal.fire("Created!", "Plan created successfully!", "success");
      }

      fetchPlans();
      setFormData(initialForm);
      setOpen(false);
      setEditMode(false);
      setSelectedPlanId(null);
    } catch (error) {
      console.error("Error saving plan:", error);
      Swal.fire("Error", "Failed to save plan. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setFormData({
      ...record,
      features: Array.isArray(record.features) ? record.features : [],
      featuresInput: "",
    });
    setSelectedPlanId(record.id);
    setEditMode(true);
    setOpen(true);
  };

  const columns = [
    {
      title: "Sr.No",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 70,
    },
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button variant="text" color="primary" onClick={() => handleEdit(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Duration",
      dataIndex: "durationInMonths",
      key: "durationInMonths",
      render: (v) => (v ? `${v} Months` : "-"),
    },
    {
      title: "Job Limit",
      dataIndex: "jobPostLimit",
      key: "jobPostLimit",
      render: (v) => (v ? v : "Unlimited"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (v) =>
        v !== null && v !== undefined ? `₹${v.toLocaleString()}` : "Free",
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (v) => (v ? `${v}%` : "0%"),
    },
    {
      title: "Features",
      dataIndex: "features",
      key: "features",
      render: (list) =>
        Array.isArray(list) && list.length > 0 ? (
          list.map((f) => (
            <Tag color="blue" key={f} style={{ marginBottom: 4 }}>
              {f}
            </Tag>
          ))
        ) : (
          <span style={{ color: "#aaa" }}>No features added</span>
        ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (v) => (
        <Tag color={v ? "green" : "red"}>{v ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
  ];

  return (
    <Box p={3}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setFormData(initialForm);
          setEditMode(false);
          setOpen(true);
        }}
        sx={{ mb: 2 }}
      >
        Create Plan
      </Button>

      <Table
        className="table-root"
        columns={columns}
        dataSource={plans}
        bordered
        pagination={{ pageSize: 5 }}
      />


      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1976d2",
            color: "#fff",
            px: 3,
            py: 1,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {editMode ? "Update Manager" : "Create Plans"}
          </Typography>

          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className="textField-root">
              <Grid item xs={12} sm={6} md={4} >
                <TextField
                  label="Plan Name"
                  name="name"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Duration (Months)"
                  name="durationInMonths"
                  type="number"
                  fullWidth
                  value={formData.durationInMonths}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Job Post Limit"
                  name="jobPostLimit"
                  type="number"
                  fullWidth
                  value={formData.jobPostLimit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Discount (%)"
                  name="discountPercentage"
                  type="number"
                  fullWidth
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={9}>
                <TextField
                  label="Add Feature"
                  name="featuresInput"
                  fullWidth
                  value={formData.featuresInput || ""}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  onClick={addFeature}
                  variant="contained"
                  fullWidth
                  sx={{ height: "60%" }}
                >
                  Add Feature
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {formData.features.map((f) => (
                    <Chip
                      key={f}
                      label={f}
                      onDelete={() => removeFeature(f)}
                      color="primary"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Status"
                  name="isActive"
                  fullWidth
                  value={formData.isActive}
                  onChange={handleChange}
                >
                  {statusOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <DialogActions sx={{ mt: 2 }}>
              <Button
                onClick={() => {
                  setOpen(false);
                  setEditMode(false);
                  setFormData(initialForm);
                }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading
                  ? editMode
                    ? "Updating..."
                    : "Creating..."
                  : editMode
                    ? "Update"
                    : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CreatePlan;