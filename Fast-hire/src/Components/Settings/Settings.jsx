import React, { useState, lazy, Suspense } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  AutoStories as CourseIcon,
  Source as SourceIcon,
  School as AddLocationIcon,
  MenuBook as CategoryIcon,
} from "@mui/icons-material";
import LoadingOverlay from "../Common/LoadingOverlay";
import Industry from "./Industry.jsx";

const Location = lazy(() => import("./Location.jsx"));
const menuItems = [
  { id: "Location", label: " Location", icon: <SourceIcon /> },
  { id: "Industry", label: "Industry", icon: <CourseIcon /> },

];
const Sidebar = ({ selectedComponent, onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Paper
      elevation={3}
      sx={{
        width: isCollapsed ? 45 : 230,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#2980B9",
        transition: "width 0.3s ease",
        height: "30%",
        overflowY: "hidden",
        border: "1px solid black"
      }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {menuItems.map((item) => (
        <Box
          key={item.id}
          title={isCollapsed ? item.label : ""}
        >
          <Typography
            onClick={() => onSelect(item.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: "10px",
              cursor: "pointer",
              fontSize: 13,
              color: selectedComponent === item.id ? "black" : "white",
              border: selectedComponent === item.id ? "1px solid black" : "white",
              fontWeight: selectedComponent === item.id ? 600 : 400,
              borderRadius: 16,
              backgroundColor:
                selectedComponent === item.id ? "white" : "transparent",
              boxShadow:
                selectedComponent === item.id
                  ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {item.icon}
            {!isCollapsed && item.label}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

const Setting = () => {
  const [selectedComponent, setSelectedComponent] = useState("Location");

  const renderSelectedComponent = () => {
    const components = {
      Location: <Location />,
      Industry: <Industry />,
    };
    return components[selectedComponent] || null;
  };

  return (
    <Box sx={{ display: "flex", padding: 2, height: "80%" }}>
      <Sidebar
        selectedComponent={selectedComponent}
        onSelect={setSelectedComponent}
      />
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          marginLeft: 2,
          border: "1px solid black",
          borderRadius: 2,
          // backgroundColor: "#f9f9f9",
          position: "relative",
        }}
      >
        <Suspense fallback={<LoadingOverlay loading={true} />}>
          {renderSelectedComponent()}
        </Suspense>
      </Box>
    </Box>
  );
};

export default Setting;
