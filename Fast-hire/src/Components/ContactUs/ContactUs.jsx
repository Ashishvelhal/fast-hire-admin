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
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} from "./ContactUs";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getAllContactUs();
      setContacts(data || []);
    } catch (error) {
      message.error("Failed to load contact records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const openPopup = async (id) => {
    try {
      const res = await getContactUsById(id);
      setSelectedContact({ ...res });
      setOpenDialog(true);
      setEditMode(false);
    } catch (err) {
      message.error("Failed to fetch contact details");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteContactUs(id);
      message.success("Record deleted successfully!");
      loadContacts();
      handleCloseDialog();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await updateContactUs(selectedContact.id, selectedContact);
      message.success("Record updated successfully!");
      loadContacts();
      handleCloseDialog();
    } catch (err) {
      message.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", align: "center", width: "6%" },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      width: "15%",
      render: (text, record) => (
        <Typography
          sx={{
            color: "primary.main",
            cursor: "pointer",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline", color: "primary.dark" },
          }}
          onClick={() => openPopup(record.id)}
        >
          {text}
        </Typography>
      ),
    },
    { title: "Last Name", dataIndex: "lastname", key: "lastname", width: "15%" },
    { title: "Email", dataIndex: "email", key: "email", width: "25%" },
    { title: "Contact", dataIndex: "contact", key: "contact", width: "15%" },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "25%",
      render: (msg) => (
        <Typography
          sx={{
            maxWidth: 240,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
          title={msg}
        >
          {msg || "No remark"}
        </Typography>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Chip
          label={`Total : ${contacts.length}`}
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
        dataSource={contacts}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{
          pageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: ["25", "50", "100", "200"],
        }}
      />

      {/* === Dialog Box === */}
      {openDialog && selectedContact && (
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
                {editMode ? "Edit Contact Details" : "Contact Details"}
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
                      sx={{ mr: 1, color: "#fff", borderColor: "#fff" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton sx={{ color: "#fff" }} onClick={() => setEditMode(true)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#fff" }} onClick={() => handleDelete(selectedContact.id)}>
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
                { name: "firstname", label: "First Name" },
                { name: "lastname", label: "Last Name" },
                { name: "email", label: "Email" },
                { name: "contact", label: "Contact" },
                { name: "message", label: "Message" },
              ].map(({ name, label }) => (
                <Grid item xs={12} sm={6} key={name}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      size="small"
                      multiline={name === "message"}
                      rows={name === "message" ? 3 : 1}
                      label={label}
                      name={name}
                      value={selectedContact[name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <Box display="flex" gap={1}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{selectedContact[name] || "-"}</Typography>
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

export default ContactUs;
