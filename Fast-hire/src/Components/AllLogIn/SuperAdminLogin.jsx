// src/components/Auth/SuperAdminLogin.jsx
import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginSuperAdmin, registerSuperAdmin } from "./LoginService";
import LoadingOverlay from "../Common/LoadingOverlay";
import { TextField, Button as MuiButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await loginSuperAdmin({ email, password });
      // Use new response structure
      const { data, message: successMessage } = response;

      if (data && data.token && data.email) {
        message.success(successMessage || "Super Admin Login Successful");
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("role", "superAdmin");
        navigate("/wayabroadadmin/admin/dashboard");
      } else {
        message.error("Login failed. Invalid response from server.");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, phone, password } = registerData;
    if (!name || !email || !phone || !password) {
      message.error("Please fill all registration fields");
      return;
    }
    setRegisterLoading(true);
    try {
      const res = await registerSuperAdmin(registerData);
      if (res.success) {
        message.success(res.message || "Registration successful");
        setRegisterOpen(false);
        setRegisterData({ name: "", email: "", phone: "", password: "" });
      } else {
        message.error(res.message || "Registration failed");
      }
    } catch (err) {
      message.error("Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading || registerLoading} />
      <div className="login-form">
        <Typography.Title level={4} className="form-title">
          Super Admin Access
        </Typography.Title>
        <p className="form-subtitle">Access the institute management portal</p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            size="large"
            placeholder="Email"
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
          <Button
            type="primary"
            onClick={handleLogin}
            className="login-button"
            size="large"
          >
            Sign In
          </Button>
        </motion.div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <a href="#forgot" className="forgot-link">
            Forgot Password?
          </a>

          <span
            className="forgot-link"
            style={{ cursor: "pointer" }}
            onClick={() => setRegisterOpen(true)}
          >
            register
          </span>
        </div>
      </div>

      {/* Registration Dialog with Material UI */}
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <DialogTitle>Super Admin Registration</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={registerData.name}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
            disabled={registerLoading}
          />
          <TextField
            name="email"
            label="Email"
            value={registerData.email}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
            disabled={registerLoading}
          />
          <TextField
            name="phone"
            label="Phone"
            value={registerData.phone}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
            disabled={registerLoading}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            fullWidth
            margin="normal"
            disabled={registerLoading}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setRegisterOpen(false)} disabled={registerLoading}>
            Cancel
          </MuiButton>
          <MuiButton
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={registerLoading}
            startIcon={registerLoading ? <CircularProgress size={18} /> : null}
          >
            Register
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuperAdminLogin;
