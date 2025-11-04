import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
    Chip,
    Stack,
} from "@mui/material";
import { Table, message } from "antd";
import {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
} from "../Settings/Courses";
import "../Common/Design.css";

const Courses = () => {
    const token = localStorage.getItem("token");
    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ courseName: "" });
    const [search, setSearch] = useState("");

    const fetchCourses = async () => {
        try {
            const response = await getAllCourses(token);
            setCourses(response.data || []);
        } catch (error) {
            message.error("Failed to fetch courses");
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenDialog = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({ courseName: course.courseName });
        } else {
            setEditingCourse(null);
            setFormData({ courseName: "" });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const handleSave = async () => {
        if (!formData.courseName.trim()) {
            message.warning("Please enter course name");
            return;
        }

        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, formData, token);
                message.success("Course updated successfully");
            } else {
                await createCourse(formData, token);
                message.success("Course created successfully");
            }
            fetchCourses();
            handleCloseDialog();
        } catch (error) {
            message.error("Failed to save course");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCourse(id, token);
            message.success("Course deleted successfully");
            fetchCourses();
        } catch (error) {
            message.error("Failed to delete course");
        }
    };

    const filteredCourses = courses.filter((c) =>
        c.courseName?.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: "Sr.No",
            render: (_, __, index) => index + 1,
            width: 80,
            align: "center",
        },
        {
            title: "Course Name",
            dataIndex: "courseName",
            key: "courseName",
            align: "center",
            render: (text) => (
                <Typography sx={{ fontWeight: 500 }}>{text}</Typography>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_, record) => (
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                    }}
                    onClick={() => handleDelete(record.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
                className="textField-root"
            >
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Search Course"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm="auto" sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#1976d2",
                            borderRadius: "8px",
                            fontWeight: 600,
                            px: 3,
                            boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
                            "&:hover": { backgroundColor: "#115293" },
                        }}
                        onClick={() => handleOpenDialog()}
                    >
                        Add Course
                    </Button>
                    <Chip
                        label={`Total: ${filteredCourses.length}`}
                        sx={{
                            border: "1px solid #1976D2",
                            backgroundColor: "transparent",
                            fontWeight: "bold",
                            color: "#1976D2",
                        }}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Table
                className="table-root"
                dataSource={filteredCourses}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{
                    pageSize: 25,
                    showSizeChanger: true,
                    pageSizeOptions: ["25", "50", "100"],
                }}
                style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: { borderRadius: "12px", p: 1.5 },
                }}
            >
                <DialogTitle
                    sx={{ fontWeight: 600, fontSize: "1.25rem", mb: -1, pb: 0 }}
                >
                    {editingCourse ? "Edit Course" : "Add Course"}
                </DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <TextField
                        placeholder="Course Name"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                            },
                        }}
                    />

                    <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
                        <Button
                            onClick={handleCloseDialog}
                            sx={{
                                color: "#1976d2",
                                fontWeight: 600,
                                textTransform: "uppercase",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#1976d2",
                                fontWeight: 600,
                                px: 3,
                                textTransform: "uppercase",
                                boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
                                "&:hover": { backgroundColor: "#115293" },
                            }}
                            onClick={handleSave}
                        >
                            {editingCourse ? "Update" : "Save"}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};
export default Courses;
