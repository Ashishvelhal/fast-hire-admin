import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { Table, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import {
  getAllCustomPlan,
  updateCustomPlan,
  deleteCustomPlan,
} from "../Leads/Leads";

const Leads = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getAllCustomPlan();
      setPlans(data || []);
    } catch (error) {
      message.error("Failed to load custom plan records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const openPopup = (plan) => {
    setSelectedPlan({ ...plan });
    setOpenDialog(true);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlan(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this custom plan request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteCustomPlan(id);
      message.success("Record deleted successfully!");
      loadPlans();
      handleCloseDialog();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await updateCustomPlan(selectedPlan.id, selectedPlan);
      message.success("Record updated successfully!");
      loadPlans();
      handleCloseDialog();
    } catch (err) {
      message.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", align: "center", width: "6%" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "18%",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline", color: "primary.dark" },
          }}
          onClick={() => openPopup(record)}
        >
          {text}
        </Typography>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: "22%" },
    { title: "Mobile No", dataIndex: "mobNo", key: "mobNo", width: "15%" },
    { title: "Job Openings", dataIndex: "numberOfJobOpenings", key: "numberOfJobOpenings", width: "12%" },
    {
      title: "Message",
      dataIndex: "additionalMessage",
      key: "additionalMessage",
      render: (msg) => (
        <Typography
          sx={{
            maxWidth: 250,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={msg}
        >
          {msg || "No message"}
        </Typography>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Chip
          label={`Total : ${plans.length}`}
          sx={{
            border: "1px solid #1677ff",
            backgroundColor: "transparent",
            fontWeight: "bold",
            color: "#1677ff",
          }}
          variant="outlined"
        />
      </Box>

      <Table
              className="table-root"

        columns={columns}
        dataSource={plans}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
        }}
      />

      {/* === Dialog Box === */}
      {openDialog && selectedPlan && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ p: 0 }}>
            <Box
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 1.2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {editMode ? "Edit Custom Plan" : "Custom Plan Details"}
              </Typography>

              <Box display="flex" alignItems="center">
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleUpdate}
                      disabled={saving}
                      sx={{
                        mr: 1,
                        backgroundColor: "#fff",
                        color: "#1976d2",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      {saving ? "Saving..." : "Update"}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditMode(false)}
                      sx={{ mr: 1, color: "#fff", borderColor: "#fff" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton sx={{ color: "#fff" }} onClick={() => setEditMode(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#fff" }} onClick={() => handleDelete(selectedPlan.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}

                <IconButton sx={{ color: "#fff" }} onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "mobNo", label: "Mobile No" },
                { name: "numberOfJobOpenings", label: "Job Openings" },
                { name: "additionalMessage", label: "Message" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      multiline={name === "additionalMessage"}
                      rows={name === "additionalMessage" ? 3 : 1}
                      label={label}
                      name={name}
                      value={selectedPlan[name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedPlan[name] || "-"}</Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Leads;
