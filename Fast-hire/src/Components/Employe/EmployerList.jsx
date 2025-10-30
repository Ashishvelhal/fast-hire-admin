// import React, { useEffect, useState } from "react";
// import { Table, message, Popconfirm } from "antd";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Grid,
//   Chip,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   getAllEmployers,
//   updateEmployer,
//   deleteEmployer,
// } from "../Employe/CreateEmploye";

// const EmployerList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyType: "",
//     contactPerson: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhone: "",
//     address: "",
//     city: "",
//     district: "",
//     state: "",
//     country: "",
//     pinCode: "",
//     companyWebsite: "",
//     industry: "",
//     companySize: "",
//     foundedYear: "",
//     aboutCompany: "",
//   });

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllEmployers();
//       let data = [];

//       if (Array.isArray(res)) data = res;
//       else if (Array.isArray(res.data)) data = res.data;

//       const normalized = data.map((item) => ({
//         ...item,
//         companyName: item.companyName || item.company_name || item.company || "-",
//       }));

//       setEmployees(normalized);
//     } catch (error) {
//       message.error("Failed to load employer data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleEdit = (record) => {
//     setSelectedEmployee(record);
//     setFormData({
//       companyName: record.companyName || "",
//       companyType: record.companyType || "",
//       contactPerson: record.contactPerson || "",
//       email: record.email || "",
//       phoneNumber: record.phoneNumber || "",
//       alternatePhone: record.alternatePhone || "",
//       address: record.address || "",
//       city: record.city || "",
//       district: record.district || "",
//       state: record.state || "",
//       country: record.country || "",
//       pinCode: record.pinCode || "",
//       companyWebsite: record.companyWebsite || "",
//       industry: record.industry || "",
//       companySize: record.companySize || "",
//       foundedYear: record.foundedYear || "",
//       aboutCompany: record.aboutCompany || "",
//     });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEmployee(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async () => {
//     if (!selectedEmployee) return;
//     try {
//       setLoading(true);
//       await updateEmployer(selectedEmployee.id, formData);
//       message.success("Employer updated successfully");
//       handleClose();
//       fetchEmployees();
//     } catch (error) {
//       message.error("Failed to update employer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       await deleteEmployer(id);
//       message.success("Employer deleted successfully");
//       fetchEmployees();
//     } catch (error) {
//       message.error("Failed to delete employer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: "Sr.No",
//       key: "index",
//       width: 80,
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Company Name",
//       dataIndex: "companyName",
//       key: "companyName",
//       width: 220,
//       render: (text, record) => (
//         <Typography
//           sx={{
//             color: "#1976D2",
//             cursor: "pointer",
//             fontWeight: 600,
//             "&:hover": { textDecoration: "underline" },
//           }}
//           onClick={() => handleEdit(record)}
//         >
//           {text || "-"}
//         </Typography>
//       ),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       width: 200,
//     },
//     {
//       title: "Phone",
//       dataIndex: "phoneNumber",
//       key: "phoneNumber",
//       width: 150,
//       render: (text) => text || "-",
//     },
//     {
//       title: "Industry",
//       dataIndex: "industry",
//       key: "industry",
//       width: 150,
//       render: (text) => text || "-",
//     },
//     {
//       title: "Plan Name",
//       key: "plan",
//       width: 200,
//       render: (record) =>
//         record.employerPlans && record.employerPlans.length > 0
//           ? record.employerPlans[0].plan?.name
//           : "-",
//     },
//     {
//       title: "Contact Person",
//       dataIndex: "contactPerson",
//       key: "contactPerson",
//       width: 180,
//     },
//     {
//       title: "State",
//       dataIndex: "state",
//       key: "state",
//       width: 150,
//     },
//     {
//       title: "Country",
//       dataIndex: "country",
//       key: "country",
//       width: 150,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 100,
//       fixed: "right",
//       render: (_, record) => (
//         <Popconfirm
//           title="Are you sure to delete this employer?"
//           onConfirm={() => handleDelete(record.id)}
//           okText="Yes"
//           cancelText="No"
//         >
//           <IconButton size="small" color="error">
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Chip
//           label={`Total: ${employees.length}`}
//           sx={{
//             border: "1px solid #1976D2",
//             backgroundColor: "transparent",
//             fontWeight: "bold",
//             color: "#1976D2",
//           }}
//           variant="outlined"
//         />
//       </Box>

//       <Table
//         className="table-root"
//         columns={columns}
//         dataSource={employees}
//         loading={loading}
//         rowKey="id"
//         pagination={{
//           pageSize: 10,
//           showSizeChanger: true,
//           pageSizeOptions: ["10", "25", "50", "100"],
//           showTotal: (total, range) =>
//             `${range[0]}-${range[1]} of ${total} employers`,
//         }}
//         locale={{ emptyText: "No employers found" }}
//       />

//       {/* Edit Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Edit Employer
//           <IconButton
//             onClick={handleClose}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Company Name"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Company Type"
//                 name="companyType"
//                 value={formData.companyType}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Contact Person"
//                 name="contactPerson"
//                 value={formData.contactPerson}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Alternate Phone"
//                 name="alternatePhone"
//                 value={formData.alternatePhone}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>
//           </Grid>

//           <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//             <Button onClick={handleClose} variant="outlined" disabled={loading}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleUpdate}
//               variant="contained"
//               color="primary"
//               disabled={loading}
//             >
//               Update
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default EmployerList;
import React, { useEffect, useState } from "react";
import { Table, message, Popconfirm } from "antd";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllEmployers,
  updateEmployer,
  deleteEmployer,
} from "../Employe/CreateEmploye";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    aboutCompany: "",
  });

  const fetchEmployers = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      message.error("Please login first");
      return;
    }

    try {
      setLoading(true);
      const res = await getAllEmployers(authToken);
      let data = [];

      // normalize API response
      if (Array.isArray(res)) data = res;
      else if (Array.isArray(res.data)) data = res.data;

      const normalized = data.map((item) => ({
        ...item,
        companyName: item.companyName || item.company || "-",
        email: item.email || "-",
        phoneNumber: item.phoneNumber || "-",
        industry: item.industry || "-",
      }));

      setEmployers(normalized);
    } catch (error) {
      console.error(error);
      message.error("Failed to load employers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleEdit = (record) => {
    setSelectedEmployer(record);
    setFormData({
      companyName: record.companyName || "",
      companyType: record.companyType || "",
      contactPerson: record.contactPerson || "",
      email: record.email || "",
      phoneNumber: record.phoneNumber || "",
      alternatePhone: record.alternatePhone || "",
      address: record.address || "",
      city: record.city || "",
      district: record.district || "",
      state: record.state || "",
      country: record.country || "",
      pinCode: record.pinCode || "",
      companyWebsite: record.companyWebsite || "",
      industry: record.industry || "",
      companySize: record.companySize || "",
      foundedYear: record.foundedYear || "",
      aboutCompany: record.aboutCompany || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      message.error("Please login first");
      return;
    }

    if (!selectedEmployer?.id) {
      message.error("Invalid employer selected");
      return;
    }

    try {
      setLoading(true);
      await updateEmployer(selectedEmployer.id, formData, authToken);
      message.success("Employer updated successfully");
      handleClose();
      fetchEmployers();
    } catch (error) {
      console.error(error);
      message.error("Failed to update employer");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      message.error("Please login first");
      return;
    }

    try {
      setLoading(true);
      await deleteEmployer(id, authToken);
      message.success("Employer deleted successfully");
      fetchEmployers();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete employer");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Sr.No",
      key: "index",
      width: 70,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: 200,
      render: (text, record) => (
        <Typography
          sx={{
            color: "#1976D2",
            cursor: "pointer",
            fontWeight: 600,
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => handleEdit(record)}
        >
          {text || "-"}
        </Typography>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      width: 150,
    },
    {
      title: "Plan Name",
      key: "plan",
      width: 200,
      render: (record) =>
        record.employerPlans && record.employerPlans.length > 0
          ? record.employerPlans[0].plan?.name
          : "-",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      width: 180,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 150,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this employer?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Chip
          label={`Total: ${employers.length}`}
          sx={{
            border: "1px solid #1976D2",
            backgroundColor: "transparent",
            fontWeight: "bold",
            color: "#1976D2",
          }}
          variant="outlined"
        />
      </Box>

      <Table
        className="table-root"
        columns={columns}
        dataSource={employers}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} employers`,
        }}
        locale={{ emptyText: "No employers found" }}
      />

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Employer
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Company Type"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Alternate Phone"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button onClick={handleClose} variant="outlined" disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EmployerList;
