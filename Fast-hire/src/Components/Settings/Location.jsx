import React, { useEffect, useState } from "react";
import {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
} from "./Location";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import { Table ,Popconfirm} from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../Common/Design.css";

const Location = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [editLocation, setEditLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all locations
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await getAllLocations(authToken);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setLocations(data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // ✅ Handle Add / Update
  const handleSave = async () => {
    if (!newLocation.trim()) return alert("Location name is required");

    try {
      const payload = { locationname: newLocation };
      if (editLocation) {
        await updateLocation(editLocation.id, payload, authToken);
      } else {
        await createLocation(payload, authToken);
      }
      setOpen(false);
      setNewLocation("");
      setEditLocation(null);
      fetchLocations();
    } catch (err) {
      console.error("Error saving location:", err);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await deleteLocation(id, authToken);
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  };

  // ✅ Search filter
  const filteredLocations = locations.filter(
    (loc) =>
      loc.locationname &&
      loc.locationname.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Table Columns
  const columns = [
    {
      title: "Sr.No",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Location Name",
      dataIndex: "locationname",
      key: "locationname",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Box >
          {/* <IconButton
            color="primary"
            size="small"
            onClick={() => {
              setEditLocation(record);
              setNewLocation(record.locationname);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton> */}
          <Popconfirm
            title="Are you sure to delete this company?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="outlined"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search Location"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ minWidth: 140, height: 36 }}
          >
            Add Location
          </Button>

          <Chip
            label={`Total : ${filteredLocations.length}`}
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
      </Box>

      {/* Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredLocations}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [ "25", "50", "100","200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} locations`,
        }}
        locale={{ emptyText: "No locations found" }}
      />

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editLocation ? "Edit Location" : "Add Location"}
        </DialogTitle>
        <DialogContent className="textField-root">
          <TextField
            label="Location Name"
            fullWidth
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editLocation ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Location;
