// src/components/Auth/SidebarLoginContainer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserOutlined, BranchesOutlined, AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import SuperAdminLogin from "./SuperAdminLogin";
// import employeLogin from "./employeLogin";
import ManagerLogin from "./ManagerLogin";

// import HRLogin from "./HRLogin";
import "./SidebarLogin.css";

const SidebarLoginContainer = () => {
  const [activeType, setActiveType] = useState("superAdmin");
  const loginTypes = [
    {
      key: "superAdmin",
      label: "Super Admin",
      icon: <UserOutlined />,
      component: <SuperAdminLogin />,
      color: "#2E86C1"
    },
            {
      key: "manager",
      label: "Manager",
      icon: <AppstoreOutlined />,
      component: <ManagerLogin />,
      color: "#16A025"
    },
    // {
    //   key: "employe",
    //   label: "employe",
    //   icon: <BranchesOutlined />,
    //   component: <employeLogin />,
    //   color: "#16A085"
    // },

    // {
    //   key: "hr",
    //   label: "HR",
    //   icon: <TeamOutlined />,
    //   component: <HRLogin />,
    //   color: "#8E44AD"
    // },
    // {
    //   key: "department",
    //   label: "Department",
    //   icon: <AppstoreOutlined />,
    //   component: <DepartmentLogin />,
    //   color: "#E67E22"
    // }
  ];

  return (
    <div className="sidebar-login-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>

      {/* Main login card */}
      <div className="sidebar-login-admin">
        {/* Sidebar navigation */}
        <div className="login-sidebar">
          <div className="login-header">
            <img
              src="/FasthireLogo_Transparent.png"
              alt="Fast Hire Logo"
              className="login-logo"
            />

          </div>
          <div className="sidebar-nav">
            {loginTypes.map((type) => (
              <motion.div
                key={type.key}
                className={`sidebar-nav-item ${activeType === type.key ? 'active' : ''}`}
                onClick={() => setActiveType(type.key)}
                whileHover={{ x: 5 }}
                style={{
                  borderLeftColor: activeType === type.key ? type.color : 'transparent'
                }}
              >
                <div className="nav-icon" style={{ color: activeType === type.key ? type.color : '#666' }}>
                  {type.icon}
                </div>
                <span>{type.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="sidebar-footer">
            <p>© 2025 FastHire PVT. LTD.</p>
          </div>
        </div>

        {/* Main content area with login form */}
        <div className="login-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="login-form-wrapper"
            >
              <div
                className="login-header-color"
                style={{ backgroundColor: loginTypes.find(t => t.key === activeType).color }}
              ></div>
              {loginTypes.find(t => t.key === activeType).component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SidebarLoginContainer;