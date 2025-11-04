import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
} from "@mui/material";
import { message, Table, Button as AntButton } from "antd";
import { getSubcategoriesByCategory } from "../Common/jobSettingsService";
import Skills from "./Skills.jsx";
import {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./SubCategory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../Common/Design.css";

const SubCategory = ({ categoryId, categoryName, onBack }) => {
  const authToken = sessionStorage.getItem("authToken");

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [showSkillPage, setShowSkillPage] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch Subcategories
  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const data = await getSubcategoriesByCategory(categoryId, authToken);
      setSubCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error("Failed to fetch subcategories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  // ✅ Add / Edit Dialog Handlers
  const openAddDialog = () => {
    setEditingSubCategory(null);
    setSubCategoryName("");
    setDialogOpen(true);
  };

  const openEditDialog = (subCategory) => {
    setEditingSubCategory(subCategory);
    setSubCategoryName(subCategory.subcategoryname || "");
    setDialogOpen(true);
  };

  // ✅ Save Subcategory
  const handleSave = async () => {
    if (!subCategoryName.trim()) {
      message.warning("Please enter subcategory name");
      return;
    }

    try {
      if (editingSubCategory) {
        await updateSubCategory(
          editingSubCategory.id,
          { subcategoryname: subCategoryName, categoryId },
          authToken
        );
        message.success("Subcategory updated successfully");
      } else {
        await createSubCategory(
          categoryId,
          { subcategoryname: subCategoryName, categoryId },
          authToken
        );
        message.success("Subcategory created successfully");
      }
      setDialogOpen(false);
      setSubCategoryName("");
      fetchSubCategories();
    } catch (error) {
      message.error("Operation failed");
      console.error(error);
    }
  };

  // ✅ Delete Subcategory
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      await deleteSubCategory(id, authToken);
      message.success("Subcategory deleted successfully");
      fetchSubCategories();
    } catch (error) {
      message.error("Failed to delete subcategory");
    }
  };

  // ✅ View Skills
  const handleViewSkills = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setShowSkillPage(true);
  };

  const handleBackFromSkills = () => {
    setShowSkillPage(false);
    setSelectedSubCategory(null);
  };

  // ✅ Search Filter
  const filteredSubCategories = subCategories.filter((sub) =>
    sub.subcategoryname.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Table Columns
  const columns = [
    {
      title: "Sr.No",
      key: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Subcategory Name",
      dataIndex: "subcategoryname",
      key: "subcategoryname",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Box >
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => openEditDialog(record)}
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
            }}
            onClick={() => handleViewSkills(record)}
          >
            Add Skills
          </Button>
          {/* <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button> */}
        </Box>
      ),
    },
  ];

  // ✅ When viewing Skills
  if (showSkillPage && selectedSubCategory) {
    return (
      <Box p={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackFromSkills}
          sx={{
            mb: 3,
            textTransform: "none",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": { borderColor: "#1565c0", bgcolor: "#e3f2fd" },
          }}
        >
          Back
        </Button>
        <Skills
          subCategoryId={selectedSubCategory.id}
          subCategoryName={selectedSubCategory.subcategoryname}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{
          mb: 3,
          textTransform: "none",
          borderColor: "#1976d2",
          color: "#1976d2",
          "&:hover": { borderColor: "#1565c0", bgcolor: "#e3f2fd" },
        }}
      >
        Back
      </Button>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {categoryName} - Subcategories
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={openAddDialog}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              textTransform: "none",
            }}
          >
            Add Subcategory
          </Button>
          <Chip
            label={`Total: ${filteredSubCategories.length}`}
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

      {/* Search Field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Subcategory"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      {/* Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredSubCategories}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [ "25", "50", "100","200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} subcategories`,
        }}
        locale={{ emptyText: "No subcategories found" }}
      />

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingSubCategory ? "Edit Subcategory" : "Add Subcategory"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Subcategory Name"
            fullWidth
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingSubCategory ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubCategory;
