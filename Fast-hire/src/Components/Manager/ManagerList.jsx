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
  Chip
} from "@mui/material";
import { Table, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
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
    try {
      await deleteManager(id, authToken);
      message.success("Manager deleted!");
      fetchManagers();
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
            "&:hover": {
              color: "primary.dark",
            },
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Chip
          label={`Total  : ${managers.length}`}
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
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} managers`,
        }}
        locale={{ emptyText: 'No managers found' }}
      />
      {openDialog && selectedManager && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Manager Details</Typography>
              <Box display="flex" gap={1}>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleUpdateManager}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Update"}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <IconButton color="primary" onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={handleCloseDialog}>
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
                      <Typography>{selectedManager[name]}</Typography>
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