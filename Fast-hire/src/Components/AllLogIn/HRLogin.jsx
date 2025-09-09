// src/components/Auth/HRLogin.jsx
import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginHR } from "./LoginService";
import LoadingOverlay from "../Common/LoadingOverlay";

const HRLogin = () => {
  const [email, setHREmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter both HR Email and password");
      return;
    }
  
    setLoading(true);
    try {
      const response = await loginHR({ email, password });
      const { message: successMessage, token, data } = response;
  
      message.success(successMessage || "HR Login Successful");
  
      // Store data in sessionStorage
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("email", data.hrEmail);
      sessionStorage.setItem("role", "hr");
      sessionStorage.setItem("hrName", data.hrName);
      sessionStorage.setItem("branchCode", data.branchCode);

      // Save dashboard/settings permissions for HR login
      if (data.canssetting !== undefined) {
        sessionStorage.setItem("canssetting", data.canssetting);
      }
      if (data.cansdashBoard !== undefined) {
        sessionStorage.setItem("cansdashBoard", data.cansdashBoard);
      }
  
      // Determine first enabled system and navigate
      let systemPath = null;

      // Mapping of normalized system names to sidebar paths
      const systemNameToPath = {
        "lead management software": "/admin/fasthireadminlayout/inquiry",
        "inquiry management system": "/admin/fasthireadminlayout/inquiry",
        "admission management software": "/admin/fasthireadminlayout/admission",
        "admission": "/admin/fasthireadminlayout/admission",
        "income/expense management software": "/admin/fasthireadminlayout/incomeexpense",
        "income & expense": "/admin/fasthireadminlayout/incomeexpense",
        "income": "/admin/fasthireadminlayout/incomeexpense",
        "student management software": "/admin/fasthireadminlayout/layringstudent",
        "student": "/admin/fasthireadminlayout/layringstudent",
        "employee management software": "/admin/fasthireadminlayout/layringemployee",
        "study-point management software": "/admin/fasthireadminlayout/layringstudypoint",
        "hostel management software": "/admin/fasthireadminlayout/layringhosteladmin",
        "shipment management software": "/admin/fasthireadminlayout/ShipmentSystem",
        "payroll management software": "/admin/fasthireadminlayout/PayrollSystem",
        "ebook management software": "/admin/fasthireadminlayout/E-BookSystem",
        "e-book management software": "/admin/fasthireadminlayout/E-BookSystem",
        "website management software": "/admin/fasthireadminlayout/websiteadmin",
        "project management software": "/admin/fasthireadminlayout/projectmanagementadmin", // Add this if you have classroom route
      };

      // Check for empty or null systems array
      if (!Array.isArray(data.systems) || data.systems.length === 0) {
        message.error("No enabled system found for your account.");
        setLoading(false);
        return;
      }

      const firstEnabledSystem = data.systems.find(sys => sys.enabled);

      if (firstEnabledSystem) {
        const systemName = firstEnabledSystem.name?.trim().toLowerCase();
        systemPath = systemNameToPath[systemName] || null;
      }

      // Fallback to inquiry if nothing matched
      if (!systemPath) {
        systemPath = "/admin/fasthireadminlayout/inquiry";
      }

      navigate(systemPath);
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="login-form">
        <Typography.Title level={4} className="form-title">
          HR Portal
        </Typography.Title>
        <p className="form-subtitle">Enter your HR credentials</p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            size="large"
            placeholder="HR Email"
            prefix={<IdcardOutlined className="input-icon" />}
            value={email}
            onChange={(e) => setHREmail(e.target.value)}
            className="styled-input"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined className="input-icon" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="styled-input"
            onPressEnter={handleLogin}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button type="primary" onClick={handleLogin} className="login-button" size="large">
            Sign In
          </Button>
        </motion.div>
        
        <div className="login-footer">
          <a href="#forgot" className="forgot-link">Forgot Password?</a>
        </div>
      </div>
    </>
  );
};

export default HRLogin;