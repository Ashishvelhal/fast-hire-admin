// import React, { useEffect, useState } from "react";
// import { getCategoriesByIndustry } from "../Common/jobSettingsService";
// import { createIndustry, getAllIndustries, updateIndustry } from "./Industry";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip
// } from "@mui/material";
// import { Table } from "antd";
// import Category from "./Category.jsx";
// import "../Common/Design.css";

// const Industry = () => {
//   const authToken = sessionStorage.getItem("authToken");
//   const [industries, setIndustries] = useState([]);
//   const [search, setSearch] = useState("");
//   const [openIndustryDialog, setOpenIndustryDialog] = useState(false);
//   const [newIndustry, setNewIndustry] = useState("");
//   const [editIndustry, setEditIndustry] = useState(null);

//   const [showJobRoles, setShowJobRoles] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentIndustry, setCurrentIndustry] = useState(null);
//   const [industryCategories, setIndustryCategories] = useState([]);

//   const fetchIndustries = async () => {
//     try {
//       const response = await getAllIndustries(authToken);
//       const data = Array.isArray(response.data)
//         ? response.data
//         : response.data?.data || [];
//       setIndustries(data);
//     } catch (err) {
//       console.error("Error fetching industries:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIndustries();
//   }, []);

//   const handleSaveIndustry = async () => {
//     if (!newIndustry.trim()) return alert("Industry name is required");
//     const payload = { industryname: newIndustry };
//     try {
//       if (editIndustry) {
//         await updateIndustry(editIndustry.id, payload, authToken);
//       } else {
//         await createIndustry(payload, authToken);
//       }
//       setOpenIndustryDialog(false);
//       setNewIndustry("");
//       setEditIndustry(null);
//       fetchIndustries();
//     } catch (err) {
//       console.error("Error saving industry:", err);
//     }
//   };

//   const handleAddCategory = async (industry) => {
//     setCurrentIndustry(industry);

//     try {
//       const categories = await getCategoriesByIndustry(industry.id, authToken);
//       setIndustryCategories(Array.isArray(categories) ? categories : []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setIndustryCategories([]);
//     }

//     setSelectedCategory({
//       id: null,
//       categoryname: "",
//       industryId: industry.id,
//       industryname: industry.industryname,
//     });
//     setShowJobRoles(true);
//   };

//   const handleBackFromJobRoles = () => {
//     setShowJobRoles(false);
//     setSelectedCategory(null);
//     fetchIndustries();
//   };

//   const filteredIndustries = industries.filter(
//     (ind) =>
//       ind.industryname &&
//       ind.industryname.toLowerCase().includes(search.toLowerCase())
//   );

//   if (showJobRoles && selectedCategory) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}>
//           Job Roles for: {selectedCategory.industryname}
//         </Box>

//         <Category
//           categoryName={selectedCategory.categoryname}
//           categoryId={selectedCategory.id}
//           industryId={selectedCategory.industryId}
//           industryName={selectedCategory.industryname}
//           categories={industryCategories}
//           onBack={handleBackFromJobRoles}
//         />
//       </Box>
//     );
//   }

//   const columns = [
//     {
//       title: "ID",
//       key: "srno",
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Industry",
//       dataIndex: "industryname",
//       key: "industryname",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Box >
//           {/* <Button
//             variant="contained"
//             size="small"
//             sx={{
//               backgroundColor: "#1976d2",
//               "&:hover": { backgroundColor: "#1565c0" },
//               textTransform: "none",
//             }}
//             onClick={() => {
//               setEditIndustry(record);
//               setNewIndustry(record.industryname);
//               setOpenIndustryDialog(true);
//             }}
//           >
//             Edit
//           </Button> */}
//           <Button
//             variant="contained"
//             size="small"
//             sx={{
//               backgroundColor: "#f57c00",
//               "&:hover": { backgroundColor: "#ef6c00" },
//               textTransform: "none",
//             }}
//             onClick={() => handleAddCategory(record)}
//           >
//             Add Category
//           </Button>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 2,
//           gap: 2
//         }}
//       >
//         <TextField
//           placeholder="Search Industry"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           size="small"
//           sx={{ width: 250 }}
//         />
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#1976d2",
//               "&:hover": { backgroundColor: "#1565c0" },
//               textTransform: "none",
//             }}
//             onClick={() => {
//               setOpenIndustryDialog(true);
//               setEditIndustry(null);
//               setNewIndustry("");
//             }}
//           >
//             Add Industry
//           </Button>
//           {/* <Box sx={{ fontWeight: "bold" }}>
//             Total: {filteredIndustries.length}
//           </Box> */}
//           <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
//             <Chip
//               label={`Total  : ${filteredIndustries.length}`}
//               sx={{
//                 border: "1px solid #1976D2",
//                 backgroundColor: "transparent",
//                 fontWeight: "bold",
//                 color: "#1976D2",
//                 ml: 2,
//               }}
//               variant="outlined"
//             />
//           </Box>
//         </Box>
//       </Box>

//       <Table
//         className="table-root"
//         columns={columns}
//         dataSource={filteredIndustries}
//         rowKey="id"
//         bordered
//         pagination={{ pageSize: 5 }}
//         locale={{ emptyText: "No industries found" }}
//       />

//       <Dialog
//         open={openIndustryDialog}
//         onClose={() => setOpenIndustryDialog(false)}
//       >
//         <DialogTitle>
//           {editIndustry ? "Edit Industry" : "Add Industry"}
//         </DialogTitle>
//         <DialogContent className="textField-root">
//           <TextField
//             label="Industry Name"
//             fullWidth
//             value={newIndustry}
//             onChange={(e) => setNewIndustry(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenIndustryDialog(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#1976d2",
//               "&:hover": { backgroundColor: "#1565c0" },
//               textTransform: "none",
//             }}
//             onClick={handleSaveIndustry}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Industry;
import React, { useEffect, useState } from "react";
import { getCategoriesByIndustry } from "../Common/jobSettingsService";
import { createIndustry, getAllIndustries, updateIndustry } from "./Industry";
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

  // ✅ Handle Add / Update Industry
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
            label={`Total Industries: ${filteredIndustries.length}`}
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
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
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
