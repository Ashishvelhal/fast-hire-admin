// import React, { useEffect, useState } from "react";
// import {
//     createCategory,
//     getAllCategories,
//     getCategoryById,
//     updateCategory,
//     deleteCategory,
// } from "./Category";
// import {
//     Box,
//     Button,
//     TextField,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
// } from "@mui/material";
// import { Table } from "antd";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Skills from "./Skills.jsx";

// const Category = ({ onBack  }) => {
//     const authToken = sessionStorage.getItem("authToken");
//     const [categories, setCategories] = useState([]);
//     const [search, setSearch] = useState("");
//     const [open, setOpen] = useState(false);
//     const [newCategory, setNewCategory] = useState("");
//     const [editCategory, setEditCategory] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showSkills, setShowSkills] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const fetchCategories = async () => {
//         try {
//             const response = await getAllCategories(authToken);
//             console.log("API response:", response.data);
//             const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
//             setCategories(data);
//         } catch (err) {
//             console.error("Error fetching categories:", err);
//         }
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleEdit = async (record) => {
//         try {
//             setLoading(true);
//             const response = await getCategoryById(record.id, authToken);
//             const categoryData = response.data?.data || response.data;
            
//             setEditCategory(categoryData);
//             setNewCategory(categoryData.categoryname || record.categoryname);
//             setOpen(true);
//         } catch (err) {
//             console.error("Error fetching category by ID:", err);
//             setEditCategory(record);
//             setNewCategory(record.categoryname);
//             setOpen(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSave = async () => {
//         if (!newCategory.trim()) return alert("Category name is required");

//         try {
//             const payload = { categoryname: newCategory };
//             if (editCategory) {
//                 await updateCategory(editCategory.id, payload, authToken);
//             } else {
//                 await createCategory(payload, authToken);
//             }
//             setOpen(false);
//             setNewCategory("");
//             setEditCategory(null);
//             fetchCategories();
//         } catch (err) {
//             console.error("Error saving category:", err);
//             alert("Error saving category. Please try again.");
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this category?")) return;
//         try {
//             await deleteCategory(id, authToken);
//             setCategories((prev) => prev.filter((cat) => cat.id !== id));
//         } catch (err) {
//             console.error("Error deleting category:", err);
//             alert("Error deleting category. Please try again.");
//         }
//     };

//     const handleDialogClose = () => {
//         setOpen(false);
//         setNewCategory("");
//         setEditCategory(null);
//     };

//     const handleAddSkills = (record) => {
//         setSelectedCategory(record);
//         setShowSkills(true);
//     };

//     const handleBackFromSkills = () => {
//         setShowSkills(false);
//         setSelectedCategory(null);
//         fetchCategories();
//     };

//     const filteredCategories = categories.filter(
//         (cat) =>
//             cat.categoryname &&
//             cat.categoryname.toLowerCase().includes(search.toLowerCase())
//     );

//     if (showSkills && selectedCategory) {
//         return (
//             <Skills
//                 categoryId={selectedCategory.id}
//                 categoryName={selectedCategory.categoryname}
//                 onBack={handleBackFromSkills}
//             />
//         );
//     }

//     const columns = [
//         {
//             title: "ID",
//             dataIndex: "id",
//             key: "id",
//             render: (_, __, index) => index + 1,
//         },
//         {
//             title: "Category",
//             dataIndex: "categoryname",
//             key: "categoryname",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <>
//                     <Button
//                         variant="contained"
//                         size="small"
//                         sx={{ mr: 1 }}
//                         onClick={() => handleEdit(record)}
//                         disabled={loading}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         sx={{ mr: 1 }}
//                         onClick={() => handleAddSkills(record)}
//                     >
//                         Add Skills
//                     </Button>
//                     {/* <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() => handleDelete(record.id)}
//                     >
//                         Delete
//                     </Button> */}
//                 </>
//             ),
//         },
//     ];

//     return (
//         <Box sx={{ p: 3 }}>
//             <Box sx={{ mb: 2 }}>
//                 <Button
//                     variant="outlined"
//                     startIcon={<ArrowBackIcon />}
//                     onClick={onBack}
//                 >
//                     Back
//                 </Button>
//             </Box>

//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 2,
//                 }}
//             >
//                 <TextField
//                     placeholder="Search Category"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     size="small"
//                     sx={{ width: 250 }}
//                 />

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Button
//                         variant="contained"
//                         onClick={() => setOpen(true)}
//                         sx={{ minWidth: 140, height: 36 }}
//                     >
//                         Add Category
//                     </Button>
//                     <Box sx={{ fontWeight: "bold" }}>
//                         Total: {filteredCategories.length}
//                     </Box>
//                 </Box>
//             </Box>

//             <Table
//                 columns={columns}
//                 dataSource={filteredCategories}
//                 rowKey="id"
//                 bordered
//                 pagination={{ pageSize: 5 }}
//                 locale={{ emptyText: "No categories found" }}
//                 loading={loading}
//             />

//             <Dialog open={open} onClose={handleDialogClose}>
//                 <DialogTitle>
//                     {editCategory ? "Edit Category" : "Add Category"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Category Name"
//                         fullWidth
//                         value={newCategory}
//                         onChange={(e) => setNewCategory(e.target.value)}
//                         sx={{ mt: 2 }}
//                         autoFocus
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDialogClose}>Cancel</Button>
//                     <Button variant="contained" onClick={handleSave}>
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Category;

import React, { useEffect, useState } from "react";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getSkillsByCategory, 
} from "./Category";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Skills from "./Skills.jsx";

const Category = ({ onBack }) => {
  const authToken = sessionStorage.getItem("authToken");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skills, setSkills] = useState([]); // ✅ store skills

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(authToken);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (record) => {
    try {
      setLoading(true);
      const response = await getCategoryById(record.id, authToken);
      const categoryData = response.data?.data || response.data;

      setEditCategory(categoryData);
      setNewCategory(categoryData.categoryname || record.categoryname);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching category by ID:", err);
      setEditCategory(record);
      setNewCategory(record.categoryname);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newCategory.trim()) return alert("Category name is required");

    try {
      const payload = { categoryname: newCategory };
      if (editCategory) {
        await updateCategory(editCategory.id, payload, authToken);
      } else {
        await createCategory(payload, authToken);
      }
      setOpen(false);
      setNewCategory("");
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Error saving category. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await deleteCategory(id, authToken);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Error deleting category. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewCategory("");
    setEditCategory(null);
  };

  // ✅ Add Skills Button Click
  const handleAddSkills = async (record) => {
    try {
      setLoading(true);
      const response = await getSkillsByCategory(record.id, authToken);
      const skillsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setSkills(skillsData);
      setSelectedCategory(record);
      setShowSkills(true);
    } catch (err) {
      console.error("Error fetching skills:", err);
      alert("Failed to fetch skills for this category.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromSkills = () => {
    setShowSkills(false);
    setSelectedCategory(null);
    setSkills([]);
    fetchCategories();
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.categoryname &&
      cat.categoryname.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Show Skills component when Add Skills is clicked
  if (showSkills && selectedCategory) {
    return (
      <Skills
        categoryId={selectedCategory.id}
        categoryName={selectedCategory.categoryname}
        skills={skills} // ✅ pass skills
        onBack={handleBackFromSkills}
      />
    );
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "categoryname",
      key: "categoryname",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => handleEdit(record)}
            disabled={loading}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => handleAddSkills(record)}
          >
            Add Skills
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ minWidth: 140, height: 36 }}
          >
            Add Category
          </Button>
          <Box sx={{ fontWeight: "bold" }}>
            Total: {filteredCategories.length}
          </Box>
        </Box>
      </Box>

      <Table
        columns={columns}
        dataSource={filteredCategories}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No categories found" }}
        loading={loading}
      />

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>
          {editCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ mt: 2 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
