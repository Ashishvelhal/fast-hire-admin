import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axiosInstance from "../Common/axiosConfig";
import AlertService from "../Common/AlertService";
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import "../Common/Design.css";

const Skills = ({ onBack, subCategoryId, subCategoryName }) => {
    const authToken = sessionStorage.getItem("authToken");
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [editSkill, setEditSkill] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/getSkillsBySubCategory/${subCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            setSkills(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching skills:", err);
            AlertService.error("Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subCategoryId) fetchSkills();
    }, [subCategoryId]);

    const handleSave = async () => {
        if (!newSkill.trim()) {
            AlertService.warning("Please enter skill name");
            return;
        }
        try {
            const payload = { skillname: newSkill.trim() };
            if (editSkill) {
                await axiosInstance.put(`/updateSkill/${editSkill.id}`, payload, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                AlertService.success("Skill updated successfully");
            } else {
                await axiosInstance.post(`/createSkill/${subCategoryId}`, payload, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                AlertService.success("Skill created successfully");
            }
            setOpen(false);
            setNewSkill("");
            setEditSkill(null);
            await fetchSkills();
        } catch (err) {
            console.error("Error saving skill:", err);
            const errorMessage = err.response?.data?.message || "Failed to save skill. Please try again.";
            AlertService.error(errorMessage);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await AlertService.confirm("Are you sure you want to delete this skill?");
        if (!confirmed) return;
        try {
            await axiosInstance.delete(`/deleteSkill/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            AlertService.success("Skill deleted successfully");
            await fetchSkills();
        } catch (err) {
            console.error("Error deleting skill:", err);
            const errorMessage = err.response?.data?.message || "Failed to delete skill. Please try again.";
            AlertService.error(errorMessage);
        }
    };

    const columns = [
        {
            title: "ID",
            key: "index",
            width: 60,
            render: (_, __, index) => index + 1,
        },
        {
            title: "Skill Name",
            dataIndex: "skillname",
            key: "skillname",
        },
        {
            title: "Actions",
            key: "actions",
            width: 200,
            render: (_, record) => (
                <Box >
                    {/* <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            setEditSkill(record);
                            setNewSkill(record.skillname);
                            setOpen(true);
                        }}
                    >
                        Edit
                    </Button> */}
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const filteredSkills = skills.filter(skill =>
        skill.skillname?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    gap: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {subCategoryName ? `${subCategoryName} - Skills` : "Skills"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        placeholder="Search skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        sx={{ width: 250 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            setEditSkill(null);
                            setNewSkill("");
                            setOpen(true);
                        }}
                        sx={{
                            backgroundColor: "#1976d2",
                            "&:hover": { backgroundColor: "#1565c0" },
                            textTransform: "none",
                        }}
                    >
                        Add Skill
                    </Button>
                </Box>
            </Box>

            <Table
                className="table-root"
                columns={columns}
                dataSource={filteredSkills}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} skills`,
                }}
                locale={{ emptyText: 'No skills found' }}
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Skill Name"
                        fullWidth
                        variant="outlined"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        sx={{ mt: 2, minWidth: 400 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" disabled={!newSkill.trim()}>
                        {editSkill ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Skills;
