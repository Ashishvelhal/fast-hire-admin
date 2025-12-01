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
import Swal from "sweetalert2";

import {
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiry,
  updateEnquiry,
} from "../DegreeLeads/DegreeLeads";

const DegreeLeads = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await getAllEnquiries();
      setEnquiries(res || []);
    } catch (error) {
      message.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const openPopup = async (id) => {
    try {
      const res = await getEnquiryById(id);
      setSelectedEnquiry({ ...res });
      setOpenDialog(true);
      setEditMode(false);
    } catch (err) {
      message.error("Failed to fetch enquiry data");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEnquiry(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEnquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the enquiry.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteEnquiry(id);
      message.success("Enquiry deleted successfully!");
      loadEnquiries();
      handleCloseDialog();
    } catch (err) {
      message.error("delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await updateEnquiry(selectedEnquiry.eid, selectedEnquiry);
      message.success("Enquiry updated successfully!");
      loadEnquiries();
      handleCloseDialog();
    } catch (err) {
      message.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "eid", key: "eid", width: "10%", align: "center" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline", color: "primary.dark" },
          }}
          onClick={() => openPopup(record.eid)}
        >
          {text}
        </Typography>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile No", dataIndex: "mobileNO", key: "mobileNO" },
    { title: "Interested Course", dataIndex: "interestedCourse", key: "interestedCourse" },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Chip
          label={`Total : ${enquiries.length}`}
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
        dataSource={enquiries}
        rowKey="eid"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
          showTotal: (total, range) =>
            `${range[0]} - ${range[1]} of ${total} records`,
        }}
        locale={{ emptyText: "No enquiries found" }}
      />

      {/* === Dialog Box === */}
      {openDialog && selectedEnquiry && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ p: 0 }}>
            <Box
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 1.2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {editMode ? "Edit Enquiry" : "Enquiry Details"}
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
                    <IconButton sx={{ color: "#fff" }} onClick={() => handleDelete(selectedEnquiry.eid)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}

                <IconButton sx={{ color: "#fff" }} onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "mobileNO", label: "Mobile No" },
                { name: "interestedCourse", label: "Interested Course" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      label={label}
                      name={name}
                      value={selectedEnquiry[name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedEnquiry[name] || "-"}</Typography>
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

export default DegreeLeads;
