import React, { useEffect, useState } from "react";
import {
  createIndustry,
  getAllIndustries,
  updateIndustry,
  getCategoriesByIndustry,
} from "./Industry";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Table } from "antd";
import Category from "./Category.jsx";

const Industry = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [industries, setIndustries] = useState([]);
  const [search, setSearch] = useState("");
  const [openIndustryDialog, setOpenIndustryDialog] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [editIndustry, setEditIndustry] = useState(null);

  const [showJobRoles, setShowJobRoles] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [industryCategories, setIndustryCategories] = useState([]);

  const fetchIndustries = async () => {
    try {
      const response = await getAllIndustries(authToken);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setIndustries(data);
    } catch (err) {
      console.error("Error fetching industries:", err);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleSaveIndustry = async () => {
    if (!newIndustry.trim()) return alert("Industry name is required");
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
    }
  };

  const handleAddCategory = async (industry) => {
    setCurrentIndustry(industry);

    try {
      const response = await getCategoriesByIndustry(industry.id, authToken);
      const categories = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setIndustryCategories(categories);
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

  const filteredIndustries = industries.filter(
    (ind) =>
      ind.industryname &&
      ind.industryname.toLowerCase().includes(search.toLowerCase())
  );

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

  const columns = [
    {
      title: "ID",
      key: "srno",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Industry",
      dataIndex: "industryname",
      key: "industryname",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              textTransform: "none",
            }}
            onClick={() => {
              setEditIndustry(record);
              setNewIndustry(record.industryname);
              setOpenIndustryDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#f57c00",
              "&:hover": { backgroundColor: "#ef6c00" },
              textTransform: "none",
            }}
            onClick={() => handleAddCategory(record)}
          >
            Add Category
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
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
          placeholder="Search Industry"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              textTransform: "none",
            }}
            onClick={() => {
              setOpenIndustryDialog(true);
              setEditIndustry(null);
              setNewIndustry("");
            }}
          >
            Add Industry
          </Button>
          <Box sx={{ fontWeight: "bold" }}>
            Total: {filteredIndustries.length}
          </Box>
        </Box>
      </Box>

      {/* Industry Table */}
      <Table
        columns={columns}
        dataSource={filteredIndustries}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No industries found" }}
      />

      {/* Industry Dialog */}
      <Dialog
        open={openIndustryDialog}
        onClose={() => setOpenIndustryDialog(false)}
      >
        <DialogTitle>
          {editIndustry ? "Edit Industry" : "Add Industry"}
        </DialogTitle>
        <DialogContent>
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              textTransform: "none",
            }}
            onClick={handleSaveIndustry}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Industry;