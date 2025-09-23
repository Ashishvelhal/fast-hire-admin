// src/components/Auth/EmployerLogin.jsx
import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginEmployer } from "../AllLogIn/LoginService";
import LoadingOverlay from "../Common/LoadingOverlay";

const EmployerLogin = () => {
  // const [employerId, setEmployerId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if ( !email || !password) {
      message.error("Please enter both Employer ID and password");
      return;
    }

    setLoading(true);
    try {
      const response = await loginEmployer({ email, password });
      const successMessage = response.massage || response.message || "Employer Login Successful";
      const { token, data } = response;

      message.success(successMessage);

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("employerName", data.employerName);
      sessionStorage.setItem("employerId", data.employerId);
      sessionStorage.setItem("eid", data.eid);
      sessionStorage.setItem("email", data.employerEmail);
      sessionStorage.setItem("role", "EMPLOYER");

      navigate("/admin/fasthireadminlayout/dashboard");
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
          Employer Portal
        </Typography.Title>
        <p className="form-subtitle">Access your employer account</p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* <Input
            size="large"
            placeholder="Employer ID"
            prefix={<UserOutlined className="input-icon" />}
            value={employerId}
            onChange={(e) => setEmployerId(e.target.value)}
            className="styled-input"
          /> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            size="large"
            placeholder="Company Email"
            prefix={<MailOutlined className="input-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default EmployerLogin;