import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { Table } from "antd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertService from "../Common/AlertService";

import {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
} from "./Education";

import "../Common/Design.css";

const Education = () => {
  const authToken = sessionStorage.getItem("authToken");

  const [educations, setEducations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const response = await getAllEducations(authToken);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setEducations(data);
    } catch (err) {
      AlertService.error("Failed to load educations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleAddEducation = () => {
    setSelectedEducation({ education: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEducation(null);
  };

  const handleSave = async () => {
    if (!selectedEducation.education.trim())
      return AlertService.warning("Education name is required");

    try {
      await createEducation({ education: selectedEducation.education }, authToken);
      AlertService.success("Education added successfully!");
      fetchEducations();
      handleCloseDialog();
    } catch (err) {
      AlertService.error("Failed to save education.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await AlertService.confirm("This will permanently delete the education.");
    if (!confirmed) return;

    try {
      await deleteEducation(id, authToken);
      AlertService.success("Education deleted successfully!");
      fetchEducations();
    } catch (err) {
      AlertService.error("Delete failed");
    }
  };

  const filteredEducations = educations.filter((edu) =>
    edu.education?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Sr.No", key: "index", render: (_, __, index) => index + 1 },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
      render: (text) => (
        <Typography sx={{ fontWeight: 500, color: "primary.main" }}>
          {text}
        </Typography>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(record.id)}
          sx={{ textTransform: "Delete", fontWeight: 600 }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      {/* Header section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search Education"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleAddEducation}
            sx={{ minWidth: 150 }}
          >
            Add Education
          </Button>

          <Chip
            label={`Total: ${filteredEducations.length}`}
            sx={{
              border: "1px solid #1976D2",
              backgroundColor: "transparent",
              fontWeight: "bold",
              color: "#1976D2",
            }}
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredEducations}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} educations`,
        }}
        locale={{ emptyText: "No educations found" }}
      />

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>Add Education</DialogTitle>
        <DialogContent>
          <TextField
            label="Education Name"
            fullWidth
            sx={{ mt: 2 }}
            value={selectedEducation?.education || ""}
            onChange={(e) =>
              setSelectedEducation({ ...selectedEducation, education: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Education;
