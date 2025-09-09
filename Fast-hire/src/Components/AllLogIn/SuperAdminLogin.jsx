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
  FormControlLabel,
  Checkbox,
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
    Phone: "",
    password: "",
    address: "",
    city: "",
    state: "",
    district: "",
    country: "",
    aadharNo: "",
    pancardNo: "",
    gstNumber:"",
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    canRead: true,
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const loginRequest = { email, password };
      const res = await loginSuperAdmin(loginRequest);
      
      if (res && res.token) {
        sessionStorage.setItem("email", res.email || email);
        sessionStorage.setItem("role", "SUPERADMIN");
        sessionStorage.setItem("authToken", res.token);
        message.success("Super Admin Login Successful");
        navigate("/admin/fasthireadminlayout/dashboard");
      } else {
        message.error(res.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
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
          Phone: "",
          password: "",
          address: "",
          city: "",
          state: "",
          district: "",
          country: "",
          aadharNo: "",
          pancardNo: "",
          gstNumber:"",
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canRead: true,
        });
      } else {
        message.error(result.message || "Registration failed");
      }
    } catch (err) {
      message.error("Registration failed");
      console.error(err);
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

      {/* Registration Dialog */}
      <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Super Admin Registration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField name="adminName" required label="Name" value={registerData.adminName} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="email" required label="Email" value={registerData.email} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="mobileNumber" required label="Mobile Number" value={registerData.mobileNumber} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="Phone" label=" Phone" value={registerData.Phone} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="password" required label="Password" type="password" value={registerData.password} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="address" required label="Address" value={registerData.address} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="city" required label="City" value={registerData.city} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select name="state" required label="State" value={registerData.state} onChange={handleStateChange} fullWidth margin="normal">
                {Object.keys(indianStatesAndDistricts).map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select name="district" required label="District" value={registerData.district} onChange={handleRegisterChange} fullWidth margin="normal" disabled={!registerData.state}>
                {(indianStatesAndDistricts[registerData.state] || []).map((district) => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="country" required label="Country" value={registerData.country} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="aadharNo" required label="Aadhar No" value={registerData.aadharNo} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="pancardNo" required label="PanNo" value={registerData.pancardNo} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="gstNumber" required label="gstNumber" value={registerData.gstNumber} onChange={handleRegisterChange} fullWidth margin="normal" />
            </Grid>

            {/* Permissions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Permissions</Typography>
              <Grid container spacing={2}>
                {["canCreate", "canUpdate", "canDelete", "canRead"].map((perm) => (
                  <Grid item xs={12} sm={3} key={perm}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={registerData[perm]}
                          onChange={(e) => setRegisterData({ ...registerData, [perm]: e.target.checked })}
                        />
                      }
                      label={perm.replace("can", "Can ")}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setRegisterOpen(false)} disabled={registerLoading}>Cancel</MuiButton>
          <MuiButton variant="contained" color="primary" onClick={handleRegister} disabled={registerLoading}>
            Register
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuperAdminLogin;
