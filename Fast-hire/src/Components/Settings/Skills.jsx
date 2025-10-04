import React, { useEffect, useState } from "react";
import {
    createSkill,
    getAllSkills,
    updateSkill,
    deleteSkill,
} from "./Skills";
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

const Skills = ({ onBack, categoryId, categoryName }) => {
    const authToken = sessionStorage.getItem("authToken");
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [editSkill, setEditSkill] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSkills = async () => {
        try {
            const response = categoryId
                ? await getAllSkills(authToken, categoryId)
                : await getAllSkills(authToken);
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            setSkills(data);
        } catch (err) {
            console.error("Error fetching skills:", err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [categoryId]);

    const handleEdit = async (record) => {
        setEditSkill(record);
        setNewSkill(record.skillname);
        setOpen(true);
    };

    const handleSave = async () => {
        if (!newSkill.trim()) return alert("Skill name is required");
        try {
            const payload = { skillname: newSkill };
            if (categoryId) payload.categoryId = categoryId;
            if (editSkill) {
                await updateSkill(editSkill.id, payload, authToken);
            } else {
                await createSkill(payload, authToken);
            }
            setOpen(false);
            setNewSkill("");
            setEditSkill(null);
            fetchSkills();
        } catch (err) {
            console.error("Error saving skill:", err);
            alert("Error saving skill. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;
        try {
            await deleteSkill(id, authToken);
            setSkills((prev) => prev.filter((skill) => skill.id !== id));
        } catch (err) {
            console.error("Error deleting skill:", err);
            alert("Error deleting skill. Please try again.");
        }
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewSkill("");
        setEditSkill(null);
    };

    const filteredSkills = skills.filter(
        (skill) =>
            skill.skillname &&
            skill.skillname.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Skill",
            dataIndex: "skillname",
            key: "skillname",
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
                    {/* <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button> */}
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
            {categoryName && (
                <Box sx={{ mb: 2, fontWeight: "bold" }}>
                    Skills for Category: {categoryName}
                </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TextField
                    placeholder="Search Skill"
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
                        Add Skill
                    </Button>
                    <Box sx={{ fontWeight: "bold" }}>
                        Total: {filteredSkills.length}
                    </Box>
                </Box>
            </Box>

            <Table
                columns={columns}
                dataSource={filteredSkills}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: "No skills found" }}
                loading={loading}
            />

            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>
                    {editSkill ? "Edit Skill" : "Add Skill"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Skill Name"
                        fullWidth
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
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

export default Skills;