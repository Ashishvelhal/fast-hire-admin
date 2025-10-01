import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingOverlay from "../Common/LoadingOverlay";
import {
  TextField,
  Button as MuiButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
} from "@mui/material";
import { createSuperAdmin } from "../../services/superAdminService";
import { loginSuperAdmin } from "../AllLogIn/LoginService";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [registerData, setRegisterData] = useState({
    adminName: "",
    email: "",
    mobileNumber: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    aadharNo: "",
    pancardNo: "",
    gstNumber: "",
    profileImageUrl: "",
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    canRead: true,
    role: "SUPERADMIN",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await loginSuperAdmin({ email, password });
      if (res && res.token) {
        sessionStorage.setItem("email", res.email || email);
        sessionStorage.setItem("role", "SUPERADMIN");
        sessionStorage.setItem("authToken", res.token);
        message.success("Super Admin Login Successful");
        navigate("/admin/fasthireadminlayout/dashboard");
      } else {
        message.error(res.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setRegisterData({ ...registerData, state: e.target.value, district: "" });
  };

  const handleRegister = async () => {
    const { adminName, email, mobileNumber, password } = registerData;
    if (!adminName || !email || !mobileNumber || !password) {
      message.error("Please fill all mandatory fields");
      return;
    }
    setRegisterLoading(true);
    try {
      const res = await createSuperAdmin(registerData);
      const result = res.data;
      if (result.success || result.id) {
        message.success(result.message || "Registration successful");
        setRegisterOpen(false);
        setRegisterData({
          adminName: "",
          email: "",
          mobileNumber: "",
          phone: "",
          password: "",
          address: "",
          city: "",
          district: "",
          state: "",
          country: "",
          pinCode: "",
          aadharNo: "",
          pancardNo: "",
          gstNumber: "",
          profileImageUrl: "",
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canRead: true,
          role: "SUPERADMIN",
        });
      } else {
        message.error(result.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
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

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <a href="#forgot" className="forgot-link">Forgot Password?</a>
          <span className="forgot-link" style={{ cursor: "pointer" }} onClick={() => setRegisterOpen(true)}>
            Register
          </span>
        </div>
      </div>
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Super Admin Registration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className="textField-root">
            <Grid item xs={12} sm={3}>
              <TextField name="adminName" label="Name" required value={registerData.adminName} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="email" label="Email" required value={registerData.email} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="mobileNumber" label="Mobile Number" required value={registerData.mobileNumber} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="phone" label="Phone" value={registerData.phone} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="password" label="Password" type="password" required value={registerData.password} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="address" label="Address" required value={registerData.address} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="city" label="City" required value={registerData.city} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select name="state" label="State" required value={registerData.state} onChange={handleStateChange} fullWidth>
                {Object.keys(indianStatesAndDistricts).map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select name="district" label="District" required value={registerData.district} onChange={handleRegisterChange} fullWidth disabled={!registerData.state}>
                {(indianStatesAndDistricts[registerData.state] || []).map((district) => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="country" label="Country" required value={registerData.country} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="pinCode" label="Pin Code" required value={registerData.pinCode} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="aadharNo" label="Aadhar No" required value={registerData.aadharNo} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="pancardNo" label="PAN No" required value={registerData.pancardNo} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="gstNumber" label="GST Number" value={registerData.gstNumber} onChange={handleRegisterChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="profileImageUrl" label="Profile Image URL" value={registerData.profileImageUrl} onChange={handleRegisterChange} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setRegisterOpen(false)}>Cancel</MuiButton>
          <MuiButton variant="contained" color="primary" onClick={handleRegister} disabled={registerLoading}>
            Register
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuperAdminLogin;
