import React, { useEffect, useState } from "react";
import {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
} from "./Location";
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
const Location = () => {
    const authToken = sessionStorage.getItem("authToken");
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [newLocation, setNewLocation] = useState("");
    const [editLocation, setEditLocation] = useState(null);

    const fetchLocations = async () => {
        try {
            const response = await getAllLocations(authToken);
            console.log("API response:", response.data);
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            setLocations(data);
        } catch (err) {
            console.error("Error fetching locations:", err);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleSave = async () => {
        if (!newLocation.trim()) return alert("Location name is required");

        try {
            const payload = { locationname: newLocation };
            if (editLocation) {
                await updateLocation(editLocation.id, payload, authToken);
            } else {
                await createLocation(payload, authToken);
            }
            setOpen(false);
            setNewLocation("");
            setEditLocation(null);
            fetchLocations();
        } catch (err) {
            console.error("Error saving location:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this location?")) return;
        try {
            await deleteLocation(id, authToken);
            setLocations((prev) => prev.filter((loc) => loc.id !== id));
        } catch (err) {
            console.error("Error deleting location:", err);
        }
    };

    const filteredLocations = locations.filter(
        (loc) =>
            loc.locationname &&
            loc.locationname.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (_, __, index) => index + 1, 
        },
        {
            title: "Location",
            dataIndex: "locationname",
            key: "locationname",
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
                        onClick={() => {
                            setEditLocation(record);
                            setNewLocation(record.locationname);
                            setOpen(true);
                        }}
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TextField
                    placeholder="Search Location"
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
                        Add Location
                    </Button>
                    <Box sx={{ fontWeight: "bold" }}>
                        Total: {filteredLocations.length}
                    </Box>
                </Box>
            </Box>

            <Table
                columns={columns}
                dataSource={filteredLocations}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: "No locations found" }}
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    {editLocation ? "Edit Location" : "Add Location"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Location Name"
                        fullWidth
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
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

export default Location;
