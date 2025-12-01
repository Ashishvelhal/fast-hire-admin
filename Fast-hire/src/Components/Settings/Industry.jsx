import React, { useEffect, useState } from "react";
import { getCategoriesByIndustry } from "../Common/jobSettingsService";
import { createIndustry, getAllIndustries, updateIndustry, deleteIndustry } from "./Industry";
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
import { AlertService } from "../Common/AlertService";
import { Table } from "antd";
import Category from "./Category.jsx";
import "../Common/Design.css";

const Industry = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [industries, setIndustries] = useState([]);
  const [search, setSearch] = useState("");
  const [openIndustryDialog, setOpenIndustryDialog] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [editIndustry, setEditIndustry] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showJobRoles, setShowJobRoles] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [industryCategories, setIndustryCategories] = useState([]);

  // ✅ Fetch all industries
  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const response = await getAllIndustries(authToken);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setIndustries(data);
    } catch (err) {
      console.error("Error fetching industries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // Safe alert helper: uses AlertService if method exists, otherwise falls back to window.alert
  const showAlert = (type, message) => {
    if (AlertService && typeof AlertService[type] === "function") {
      AlertService[type](message);
    } else if (AlertService && typeof AlertService.show === "function") {
      // in case AlertService has a generic show(type, message) method
      try {
        AlertService.show(type, message);
      } catch {
        window.alert(message);
      }
    } else {
      window.alert(message);
    }
  };

  // ✅ Handle Add / Update Industry
  const handleSaveIndustry = async () => {
    if (!newIndustry.trim()) {
      showAlert("warning", "Industry name is required");
      return;
    }

    const payload = { industryname: newIndustry };
    try {
      if (editIndustry) {
        await updateIndustry(editIndustry.id, payload, authToken);
      } else {
        await createIndustry(payload, authToken);
      }
      setOpenIndustryDialog(false);
      setNewIndustry("");
      setEditIndustry(null);
      fetchIndustries();
    } catch (err) {
      console.error("Error saving industry:", err);
      showAlert("error", "Failed to save industry");
    }
  };

  // ✅ Handle Delete Industry
  const handleDeleteIndustry = async (industryId) => {
    if (!industryId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this industry? This will remove its categories as well."
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteIndustry(industryId, authToken);
      showAlert("success", "Industry deleted successfully");
      fetchIndustries();
    } catch (err) {
      console.error("Error deleting industry:", err);
      showAlert("error", "Failed to delete industry");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Add Category
  const handleAddCategory = async (industry) => {
    setCurrentIndustry(industry);
    try {
      const categories = await getCategoriesByIndustry(industry.id, authToken);
      setIndustryCategories(Array.isArray(categories) ? categories : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setIndustryCategories([]);
    }

    setSelectedCategory({
      id: null,
      categoryname: "",
      industryId: industry.id,
      industryname: industry.industryname,
    });
    setShowJobRoles(true);
  };

  const handleBackFromJobRoles = () => {
    setShowJobRoles(false);
    setSelectedCategory(null);
    fetchIndustries();
  };

  // ✅ Search Filter
  const filteredIndustries = industries.filter(
    (ind) =>
      ind.industryname &&
      ind.industryname.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ When in Job Roles View
  if (showJobRoles && selectedCategory) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}>
          Job Roles for: {selectedCategory.industryname}
        </Box>

        <Category
          categoryName={selectedCategory.categoryname}
          categoryId={selectedCategory.id}
          industryId={selectedCategory.industryId}
          industryName={selectedCategory.industryname}
          categories={industryCategories}
          onBack={handleBackFromJobRoles}
        />
      </Box>
    );
  }

  // ✅ Table Columns
  const columns = [
    {
      title: "Sr.No",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Industry Name",
      dataIndex: "industryname",
      key: "industryname",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Box>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setEditIndustry(record);
              setNewIndustry(record.industryname);
              setOpenIndustryDialog(true);
            }}
          >
            Edit
          </Button> */}

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#f57c00",
              "&:hover": { backgroundColor: "#ef6c00" },
              textTransform: "none",
              mr: 1,
            }}
            onClick={() => handleAddCategory(record)}
          >
            Add Category
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => handleDeleteIndustry(record.id)}
          >
            Delete
          </Button>
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
          label="Search Industry"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenIndustryDialog(true);
              setEditIndustry(null);
              setNewIndustry("");
            }}
            sx={{ minWidth: 140, height: 36 }}
          >
            Add Industry
          </Button>

          <Chip
            label={`Total : ${filteredIndustries.length}`}
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
        dataSource={filteredIndustries}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [ "25", "50", "100","200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} industries`,
        }}
        locale={{ emptyText: "No industries found" }}
      />

      {/* Dialog for Add/Edit */}
      <Dialog
        open={openIndustryDialog}
        onClose={() => setOpenIndustryDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editIndustry ? "Edit Industry" : "Add Industry"}
        </DialogTitle>
        <DialogContent className="textField-root">
          <TextField
            label="Industry Name"
            fullWidth
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIndustryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveIndustry}>
            {editIndustry ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Industry;
