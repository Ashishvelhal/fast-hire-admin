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
import { getAllManagers, updateManager, deleteManager } from "./CreateManager";

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchManagers = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");
    try {
      setLoading(true);
      const res = await getAllManagers(authToken);
      setManagers(res.data || []);
    } catch (err) {
      message.error("Failed to load managers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleDelete = async (id) => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the manager.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;
    try {
      await deleteManager(id, authToken);
      message.success("Manager deleted successfully!");
      fetchManagers();
      handleCloseDialog();
    } catch (err) {
      message.error("Delete failed.");
    }
  };

  const handleOpenDialog = (manager) => {
    setSelectedManager({ ...manager });
    setOpenDialog(true);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedManager(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedManager((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateManager = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");
    try {
      setSaving(true);
      await updateManager(selectedManager.id, selectedManager, authToken);
      message.success("Manager updated successfully!");
      fetchManagers();
      handleCloseDialog();
    } catch (err) {
      message.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: "Sr.No", key: "index", render: (_, __, index) => index + 1 },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            "&:hover": { color: "primary.dark" },
          }}
          onClick={() => handleOpenDialog(record)}
        >
          {text}
        </Typography>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "District", dataIndex: "district", key: "district", render: (d) => d || "-" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Chip
          label={`Total : ${managers.length}`}
          sx={{
            border: "1px solid #1976D2",
            backgroundColor: "transparent",
            fontWeight: "bold",
            color: "#1976D2",
            ml: 2,
          }}
          variant="outlined"
        />
      </Box>

      <Table
        className="table-root"
        columns={columns}
        dataSource={managers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} managers`,
        }}
        locale={{ emptyText: "No managers found" }}
      />

      {openDialog && selectedManager && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ p: 0 }}>
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
              {/* Title */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {editMode ? "Edit Manager" : "Manager Details"}
              </Typography>

              {/* Action Icons */}
              <Box display="flex" alignItems="center">
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleUpdateManager}
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
                      sx={{
                        mr: 1,
                        color: "#fff",
                        borderColor: "#fff",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton sx={{ color: "#fff" }} onClick={() => setEditMode(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#fff" }}
                      onClick={() => handleDelete(selectedManager.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
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
                { name: "mobileNumber", label: "Mobile" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "district", label: "District" },
                { name: "status", label: "Status" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      name={name}
                      label={label}
                      value={selectedManager[name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedManager[name] || "-"}</Typography>
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

export default ManagerList;
