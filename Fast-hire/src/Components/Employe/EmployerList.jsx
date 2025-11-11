import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { getAllEmployers, updateEmployer, deleteEmployer } from "../Employe/CreateEmploye";
import Billing from "../Billing/Billing";  
import "../Common/Design.css";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);  
  const fetchEmployers = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      message.error("Please login first");
      return;
    }

    try {
      setLoading(true);
      const res = await getAllEmployers(authToken);
      let data = Array.isArray(res) ? res : Array.isArray(res.data) ? res.data : [];

      const normalized = data.map((item) => ({
        ...item,
        companyName: item.companyName || item.company || "-",
        email: item.email || "-",
        phoneNumber: item.phoneNumber || "-",
        industry: item.industry || "-",
        createdBy:
          item.employerPlans?.[0]?.plan?.superAdmin?.email || "",
      }));``

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

  const handleOpenDialog = (record) => {
    setSelectedEmployer({ ...record });
    setOpenDialog(true);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployer(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployer((prev) => ({
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
      setSaving(true);
      await updateEmployer(selectedEmployer.id, selectedEmployer, authToken);
      message.success("Employer updated successfully!");
      fetchEmployers();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      message.error("Failed to update employer");
    } finally {
      setSaving(false);
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
      handleCloseDialog();
      fetchEmployers();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete employer");
    } finally {
      setLoading(false);
    }
  };

  const handleBilling = (record) => {
    setSelectedEmployer(record);  
    setOpenBilling(true); 
  };

  const columns = [
    { title: "Sr.No", key: "index", width: 70, render: (_, __, index) => index + 1 },
    {
      title: " Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: 600,
            "&:hover": { color: "primary.dark", textDecoration: "underline" },
          }}
          onClick={() => handleOpenDialog(record)}
        >
          {text || "-"}
        </Typography>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Industry", dataIndex: "industry", key: "industry", width: 150 },
   
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 200,
      render: (text) => <Typography>{text}</Typography>,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (record) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<ReceiptLongIcon />}
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#e3f2fd",
              borderColor: "#1565c0",
            },
          }}
          onClick={() => handleBilling(record)}
        >
          Billing
        </Button>
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
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employers`,
        }}
        locale={{ emptyText: "No employers found" }}
      />

      <Dialog 
        open={openBilling} 
        onClose={() => setOpenBilling(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Billing Details - {selectedEmployer?.companyName}
            </Typography>
            <IconButton onClick={() => setOpenBilling(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedEmployer && (
            <Billing 
              email={selectedEmployer.email}
              onBack={() => setOpenBilling(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {openDialog && selectedEmployer && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ p: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#1976d2",
                color: "#fff",
                px: 3,
                py: 1,
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {editMode ? "Edit Employer" : "Employer Details"}
              </Typography>
              <Box display="flex" alignItems="center">
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleUpdate}
                      disabled={saving}
                      sx={{
                        mr: 1,
                        backgroundColor: "#fff",
                        color: "#1976d2",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      {saving ? "Saving..." : "Update"}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditMode(false)}
                      sx={{
                        mr: 1,
                        color: "#fff",
                        borderColor: "#fff",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <IconButton sx={{ color: "#fff" }} onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  sx={{ color: "#fff" }}
                  onClick={() =>
                    window.confirm("Are you sure you want to delete this employer?")
                      ? handleDelete(selectedEmployer.id)
                      : null
                  }
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton onClick={handleCloseDialog} sx={{ color: "#fff" }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={2}>
              {[
                { name: "companyName", label: "Company Name" },
                { name: "companyType", label: "Company Type" },
                { name: "contactPerson", label: "Contact Person" },
                { name: "email", label: "Email" },
                { name: "phoneNumber", label: "Phone Number" },
                { name: "alternatePhone", label: "Alternate Phone" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "country", label: "Country" },
                { name: "industry", label: "Industry" },
                { name: "companySize", label: "Company Size" },
                { name: "foundedYear", label: "Founded Year" },
                { name: "address", label: "Address" },
                { name: "createdBy", label: "Created By (Super Admin)" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      name={name}
                      label={label}
                      value={selectedEmployer[name] || ""}
                      onChange={handleChange}
                      disabled={["email", "createdBy"].includes(name)}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedEmployer[name] || "-"}</Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}

      {openBilling && selectedEmployer && (
        <Billing
          email={selectedEmployer.email}
          onBack={() => setOpenBilling(false)} 
        />
      )}
    </Box>
  );
};

export default EmployerList;
