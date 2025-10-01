import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginManager } from "../AllLogIn/LoginService";
import LoadingOverlay from "../Common/LoadingOverlay";

const ManagerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!email || !password) {
    message.error("Please enter both Email and password");
    return;
  }

  setLoading(true);
  try {
    const response = await loginManager({ email, password });
    console.log("Login response:", response); 

    const { token, email: managerEmail, role } = response;

    message.success("Manager Login Successful");

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("email", managerEmail);
    sessionStorage.setItem("role", role);

    navigate("/admin/fasthireadminlayout/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    message.error("Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="login-form">
        <Typography.Title level={4} className="form-title">
          Manager Portal
        </Typography.Title>
        <p className="form-subtitle">Access your manager account</p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Input
            size="large"
            placeholder="Email"
            prefix={<MailOutlined className="input-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="styled-input"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button type="primary" onClick={handleLogin} className="login-button" size="large">
            Sign In
          </Button>
        </motion.div>
        <div className="login-footer">
          <a href="#forgot" className="forgot-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </>
  );
};
export default ManagerLogin;
