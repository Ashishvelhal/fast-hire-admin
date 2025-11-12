import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { Table, message } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
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
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setCompanies(data);
    } catch (err) {
      message.error("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
    const { name, value } = e.target;
    setSelectedCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCompany = async () => {
    try {
      setSaving(true);
      await updateCompany(selectedCompany.id, selectedCompany, authToken);
      message.success("Company updated successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch (err) {
      message.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCompany = () => {
    setSelectedCompany({
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
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSaveNew = async () => {
    if (!selectedCompany.companyName.trim())
      return message.warning("Company name is required.");
    try {
      setSaving(true);
      await createCompany(selectedCompany, authToken);
      message.success("Company added successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch (err) {
      message.error("Failed to add company.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the company.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;
    try {
      await deleteCompany(id, authToken);
      message.success("Company deleted successfully!");
      fetchCompanies();
      handleCloseDialog();
    } catch (err) {
      message.error("Delete failed.");
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      c.companyName &&
      c.companyName.toLowerCase().includes(search.toLowerCase())
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
  ];

  return (
    <Box p={3}>
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
            onClick={handleAddCompany}
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
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} companies`,
        }}
        locale={{ emptyText: "No companies found" }}
      />
      {openDialog && selectedCompany && (
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
                {editMode
                  ? selectedCompany.id
                    ? "Edit Company"
                    : "Add Company"
                  : "Company Details"}
              </Typography>

              <Box display="flex" alignItems="center">
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={
                        selectedCompany.id ? handleUpdateCompany : handleSaveNew
                      }
                      disabled={saving}
                      sx={{
                        mr: 1,
                        backgroundColor: "#fff",
                        color: "#1976d2",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      {saving ? "Saving..." : "Save"}
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
                  <>
                    <IconButton sx={{ color: "#fff" }} onClick={() => setEditMode(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#fff" }}
                      onClick={() => handleDelete(selectedCompany.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
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
                { name: "industry", label: "Industry" },
                { name: "location", label: "Location" },
                { name: "foundedYear", label: "Founded Year" },
                { name: "employeeSize", label: "Employee Size" },
                { name: "availableJobs", label: "Available Jobs" },
                { name: "rating", label: "Rating" },
                { name: "reviewCount", label: "Review Count" },
                { name: "description", label: "Description" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      name={name}
                      label={label}
                      value={selectedCompany[name] || ""}
                      onChange={handleChange}
                      multiline={name === "description"}
                      rows={name === "description" ? 3 : 1}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedCompany[name] || "-"}</Typography>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Company;
