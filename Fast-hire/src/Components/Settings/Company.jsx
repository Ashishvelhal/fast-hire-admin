import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { Table } from "antd";
import AlertService from "../Common/AlertService";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "./Company";

import "../Common/Design.css";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const authToken = sessionStorage.getItem("authToken");

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await getAllCompanies();
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCompanies(data);
    } catch (err) {
      AlertService.error("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = () => {
    setSelectedCompany({
      companyName: "",
      industry: "",
      location: "",
      description: "",
      employeeSize: "",
      foundedYear: "",
      rating: "",
      reviewCount: "",
      availableJobs: "",
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleOpenDialog = (company) => {
    setSelectedCompany({ ...company });
    setOpenDialog(true);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setSelectedCompany((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateCompany = async () => {
    try {
      setSaving(true);
      await updateCompany(selectedCompany.id, selectedCompany, authToken);
      AlertService.success("Company updated successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch {
      AlertService.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNew = async () => {
    if (!selectedCompany.companyName.trim())
      return AlertService.warning("Company name is required.");

    try {
      setSaving(true);
      await createCompany(selectedCompany, authToken);
      AlertService.success("Company added successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch {
      AlertService.error("Failed to add company.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await AlertService.confirm("This action will permanently delete the company.");
    if (!confirmed) return;

    try {
      await deleteCompany(id, authToken);
      AlertService.success("Company deleted successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch {
      AlertService.error("Delete failed.");
    }
  };

  const filteredCompanies = companies.filter((c) =>
    c.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Sr.No", key: "index", render: (_, __, index) => index + 1 },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: 600,
            "&:hover": { color: "primary.dark" },
          }}
          onClick={() => handleOpenDialog(record)}
        >
          {text}
        </Typography>
      ),
    },
    { title: "Industry", dataIndex: "industry", key: "industry" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Founded Year", dataIndex: "foundedYear", key: "foundedYear" },
    { title: "Employee Size", dataIndex: "employeeSize", key: "employeeSize" },
    { title: "Available Jobs", dataIndex: "availableJobs", key: "availableJobs" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(record.id)}
          aria-label={`Delete ${record.companyName || "company"}`}
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>
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
          placeholder="Search Company"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button variant="contained"  onClick={handleAddCompany}>
            Add Company
          </Button>
          <Chip
            label={`Total: ${filteredCompanies.length}`}
            variant="outlined"
            sx={{
              border: "1px solid #1976D2",
              backgroundColor: "transparent",
              fontWeight: "bold",
              color: "#1976D2",
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Table
        className="table-root"
        columns={columns}
        dataSource={filteredCompanies}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} companies`,
        }}
        locale={{ emptyText: "No companies found" }}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      />

      {/* Dialog */}
      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>
            {editMode ? "Add / Edit Company" : "Company Details"}
          </DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={2}   className="textField-root">
              {[
                { name: "companyName", label: "Company Name" },
                { name: "industry", label: "Industry" },
                { name: "location", label: "Location" },
                { name: "foundedYear", label: "Founded Year" },
                { name: "employeeSize", label: "Employee Size" },
                { name: "availableJobs", label: "Available Jobs" },
                { name: "rating", label: "Rating" },
                { name: "reviewCount", label: "Review Count" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={label}
                    name={name}
                    value={selectedCompany?.[name] || ""}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={selectedCompany?.id ? handleUpdateCompany : handleSaveNew}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Company;
