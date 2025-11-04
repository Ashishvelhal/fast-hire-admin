import React, { useEffect, useState } from "react";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "./Company";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
} from "@mui/material";
import { Table, message, Popconfirm } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "../Common/Design.css";

const Company = () => {
  const authToken = sessionStorage.getItem("authToken");
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    industry: "",
    location: "",
    description: "",
    perks: "",
    employeeSize: "",
    foundedYear: "",
    rating: "",
    reviewCount: "",
    availableJobs: "",
    logoUrl: "",
  });

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies(); // removed authToken
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCompanies(data);
    } catch (err) {
      console.error("Error fetching companies:", err);
      message.error("Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Reset form
  const resetForm = () => {
    setNewCompany({
      companyName: "",
      industry: "",
      location: "",
      description: "",
      perks: "",
      employeeSize: "",
      foundedYear: "",
      rating: "",
      reviewCount: "",
      availableJobs: "",
      logoUrl: "",
    });
    setEditCompany(null);
  };

  const handleSave = async () => {
    if (!newCompany.companyName.trim())
      return message.warning("Company name is required");

    try {
      if (editCompany) {
        await updateCompany(editCompany.id, newCompany, authToken);
        message.success("Company updated successfully");
      } else {
        await createCompany(newCompany, authToken);
        message.success("Company added successfully");
      }
      setOpen(false);
      resetForm();
      fetchCompanies();
    } catch (err) {
      console.error("Error saving company:", err);
      message.error("Failed to save company");
    }
  };

  const handleEdit = (record) => {
    setEditCompany(record);
    setNewCompany({ ...record });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id, authToken);
      message.success("Company deleted successfully");
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting company:", err);
      message.error("Failed to delete company");
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      c.companyName &&
      c.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Sr No.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Founded Year",
      dataIndex: "foundedYear",
      key: "foundedYear",
    },
    {
      title: "Employee Size",
      dataIndex: "employeeSize",
      key: "employeeSize",
    },
    {
      title: "Available Jobs",
      dataIndex: "availableJobs",
      key: "availableJobs",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Box sx={{ display: "flex", gap: 1 }}>
        
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
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          
        }}
      >
        <TextField
          placeholder="Search Company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            sx={{ minWidth: 150 }}
          >
            Add Company
          </Button>
          <Chip
            label={`Total: ${filteredCompanies.length}`}
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

      {/* Company Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredCompanies}
        rowKey="id"
        bordered
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [ "25", "50", "100","200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} companies`,
        }}
        locale={{ emptyText: "No companies found" }}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editCompany ? "Edit Company" : "Add Company"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }} className="textField-root">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                fullWidth
                value={newCompany.companyName}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, companyName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Industry"
                fullWidth
                value={newCompany.industry}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, industry: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                fullWidth
                value={newCompany.location}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, location: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Founded Year"
                type="number"
                fullWidth
                value={newCompany.foundedYear}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, foundedYear: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee Size"
                fullWidth
                value={newCompany.employeeSize}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, employeeSize: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Available Jobs"
                type="number"
                fullWidth
                value={newCompany.availableJobs}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, availableJobs: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rating"
                type="number"
                fullWidth
                value={newCompany.rating}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, rating: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Review Count"
                type="number"
                fullWidth
                value={newCompany.reviewCount}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, reviewCount: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                value={newCompany.description}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Company;
