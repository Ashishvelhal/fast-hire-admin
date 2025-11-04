import React, { useEffect, useState } from "react";
import {
    createEducation,
    getAllEducations,
    updateEducation,
    deleteEducation,
} from "./Education";
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip
} from "@mui/material";
import { Table } from "antd";
import "../Common/Design.css";

const Education = () => {
    const authToken = sessionStorage.getItem("authToken");
    const [educations, setEducations] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [newEducation, setNewEducation] = useState("");
    const [editEducation, setEditEducation] = useState(null);

    const fetchEducations = async () => {
        try {
            const response = await getAllEducations(authToken);
            console.log('API Response:', response);

            let data = [];
            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                data = response.data.data;
            } else if (response.data) {
                data = [response.data];
            }

            console.log('Processed Data:', data);

            setEducations(data); 
        } catch (err) {
            console.error("Error fetching educations:", err);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    const handleSave = async () => {
        if (!newEducation.trim()) return alert("Education name is required");

        try {
            const payload = { education: newEducation };
            if (editEducation) {
                await updateEducation(editEducation.id, payload, authToken);
            } else {
                await createEducation(payload, authToken);
            }
            setOpen(false);
            setNewEducation("");
            setEditEducation(null);
            fetchEducations();
        } catch (err) {
            console.error("Error saving education:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("No ID provided for deletion");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this education?")) {
            return;
        }

        try {
            await deleteEducation(id, authToken);
            setEducations(prev => prev.filter(edu => edu.id !== id));
            alert("Education deleted successfully!");
        } catch (err) {
            console.error("Error deleting education:", err);
            const errorMessage = err.response?.data?.message || "Failed to delete education";
            alert(`Error: ${errorMessage}`);
            await fetchEducations();
        }
    };

    const filteredEducations = educations.filter(
        (edu) =>
            edu.education &&
            edu.education.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Education",
            dataIndex: "education",
            key: "education",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Box >
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

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <TextField
                    placeholder="Search Education"
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
                        Add Education
                    </Button>
                    <Chip
                        label={`Total  : ${filteredEducations.length}`}
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

            <Table
                className="table-root"
                columns={columns}
                dataSource={filteredEducations}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: "No educations found" }}
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    {editEducation ? "Edit Education" : "Add Education"}
                </DialogTitle>
                <DialogContent className="textField-root">
                    <TextField
                        label="Education Name"
                        fullWidth
                        value={newEducation}
                        onChange={(e) => setNewEducation(e.target.value)}
                        sx={{ mt: 2 }}
                    />
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

export default Education;
