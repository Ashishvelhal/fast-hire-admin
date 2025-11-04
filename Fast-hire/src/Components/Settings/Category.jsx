import React, { useEffect, useState } from "react";
import { getSubcategoriesByCategory } from "../Common/jobSettingsService";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "./Category";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Chip,
} from "@mui/material";
import { Table } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Subcategory from "./SubCategory.jsx";
import "../Common/Design.css";

const Category = ({ onBack, industryId, industryName }) => {
  const authToken = sessionStorage.getItem("authToken");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySubcategories, setCategorySubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories(authToken, industryId);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [industryId]);

  // ✅ Save or update category
  const handleSave = async () => {
    if (!newCategory.trim()) return alert("Job Role name is required");

    const payload = { categoryname: newCategory, industryId };
    try {
      if (editCategory) {
        await updateCategory(editCategory.id, payload, authToken);
      } else {
        await createCategory(payload, authToken);
      }
      setOpenDialog(false);
      setNewCategory("");
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  // ✅ Navigate to Subcategories
  const handleAddSubcategory = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await getSubcategoriesByCategory(category.id, authToken);
      const subcategories = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCategorySubcategories(subcategories);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setCategorySubcategories([]);
    }
    setShowSubcategories(true);
  };

  const handleBackFromSubcategories = () => {
    setShowSubcategories(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  // ✅ Filter by search
  const filteredCategories = categories.filter(
    (cat) =>
      cat.categoryname &&
      cat.categoryname.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Show subcategories if toggled
  if (showSubcategories && selectedCategory) {
    return (
      <Box sx={{ p: 3 }}>
        <Subcategory
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.categoryname}
          subcategories={categorySubcategories}
          onBack={handleBackFromSubcategories}
        />
      </Box>
    );
  }

  // ✅ Table Columns
  const columns = [
    {
      title: "Sr.No",
      key: "srno",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Job Role",
      dataIndex: "categoryname",
      key: "categoryname",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#f57c00",
            "&:hover": { backgroundColor: "#ef6c00" },
            textTransform: "none",
          }}
          onClick={() => handleAddSubcategory(record)}
        >
          Add Subcategory
        </Button>
      ),
    },
  ];

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
          "&:hover": {
            borderColor: "#1565c0",
            bgcolor: "#e3f2fd",
          },
        }}
      >
        Back
      </Button>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
        }}
      >
        <TextField
          placeholder="Search Job Role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#999" }} />
              </InputAdornment>
            ),
          }}
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
              setOpenDialog(true);
              setEditCategory(null);
              setNewCategory("");
            }}
          >
            Add Job Role
          </Button>

          <Chip
            label={`Total: ${filteredCategories.length}`}
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
        dataSource={filteredCategories}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [ "25", "50", "100","200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} job roles`,
        }}
        locale={{ emptyText: "No job roles found" }}
      />

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editCategory ? "Edit Job Role" : "Add Job Role"}
        </DialogTitle>
        <DialogContent className="textField-root">
          <TextField
            label="Job Role Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            {editCategory ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
