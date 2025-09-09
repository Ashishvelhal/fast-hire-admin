import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Button as MuiButton,
  FormControlLabel,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { createEmployer } from "../Employe/Employe"; 
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import LoadingOverlay from "../Common/LoadingOverlay";

const Employe = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    password: "",
    companyWebsite: "",
    companyLogoUrl: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    aboutCompany: "",
    phoneNumber: "",
    alternatePhone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    registrationNumber: "",
    gstNumber: "",
    documentsVerified: true,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    canRead: true,
    jobPostLimit: 10,
    remainingPosts: 10,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleStateChange = (e) => {
    setRegisterData({ ...registerData, state: e.target.value, district: "" });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRegisterData({ ...registerData, [name]: checked });
  };

  const handleRegister = async () => {
    const { companyName, contactPerson, email, password } = registerData;
    if (!companyName || !contactPerson || !email || !password) {
      message.error("Please fill all mandatory fields");
      return;
    }

    setRegisterLoading(true);
    try {
      const response = await createEmployer(registerData);

      const { token, role, email: registeredEmail } = response.data;

      if (token) sessionStorage.setItem("token", token);
      if (role) sessionStorage.setItem("role", role);
      if (registeredEmail) sessionStorage.setItem("email", registeredEmail);

      message.success("Employer registered successfully");
      setRegisterOpen(false);

      setRegisterData({
        companyName: "",
        contactPerson: "",
        email: "",
        password: "",
        companyWebsite: "",
        companyLogoUrl: "",
        industry: "",
        companySize: "",
        foundedYear: "",
        aboutCompany: "",
        phoneNumber: "",
        alternatePhone: "",
        address: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinCode: "",
        registrationNumber: "",
        gstNumber: "",
        documentsVerified: false,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canRead: true,
        jobPostLimit: 10,
        remainingPosts: 10,
      });
    } catch (err) {
      console.error(err);
      message.error("Failed to register employer");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={registerLoading} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setRegisterOpen(true)}
      >
        Register Employer
      </Button>

      <Dialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Employer Registration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Basic Info */}
            <Grid item xs={12} sm={4}>
              <TextField
                name="companyName"
                required
                label="Company Name"
                value={registerData.companyName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="contactPerson"
                required
                label="Contact Person"
                value={registerData.contactPerson}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="email"
                required
                label="Email"
                type="email"
                value={registerData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="password"
                required
                label="Password"
                type="password"
                value={registerData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            {/* Company Details */}
            <Grid item xs={12} sm={4}>
              <TextField
                name="companyWebsite"
                label="Company Website"
                value={registerData.companyWebsite}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="companyLogoUrl"
                label="Company Logo URL"
                value={registerData.companyLogoUrl}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="industry"
                label="Industry"
                value={registerData.industry}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                name="companySize"
                label="Company Size"
                value={registerData.companySize}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="1-10">1-10 employees</MenuItem>
                <MenuItem value="11-50">11-50 employees</MenuItem>
                <MenuItem value="51-200">51-200 employees</MenuItem>
                <MenuItem value="200+">200+ employees</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="foundedYear"
                label="Founded Year"
                value={registerData.foundedYear}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="aboutCompany"
                label="About Company"
                value={registerData.aboutCompany}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                margin="normal"
              />
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={3}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={registerData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="alternatePhone"
                label="Alternate Phone"
                value={registerData.alternatePhone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="address"
                label="Address"
                value={registerData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                name="city"
                label="City"
                value={registerData.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                select
                name="state"
                label="State"
                value={registerData.state}
                onChange={handleStateChange}
                fullWidth
                margin="normal"
              >
                {Object.keys(indianStatesAndDistricts).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                select
                name="district"
                label="District"
                value={registerData.district}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={!registerData.state}
              >
                {(indianStatesAndDistricts[registerData.state] || []).map(
                  (district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                name="country"
                label="Country"
                value={registerData.country}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                name="pinCode"
                label="Pin Code"
                value={registerData.pinCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            {/* Compliance */}
            <Grid item xs={12} sm={3}>
              <TextField
                name="registrationNumber"
                label="Registration Number"
                value={registerData.registrationNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="gstNumber"
                label="GST Number"
                value={registerData.gstNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="documentsVerified"
                    checked={registerData.documentsVerified}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Documents Verified"
              />
            </Grid>

            {/* Permissions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Permissions
              </Typography>
              <Grid container spacing={2}>
                {["canCreate", "canUpdate", "canDelete", "canRead"].map(
                  (perm) => (
                    <Grid item xs={12} sm={3} key={perm}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={registerData[perm]}
                            onChange={handleCheckboxChange}
                            name={perm}
                          />
                        }
                        label={perm.replace("can", "Can ")}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MuiButton
            onClick={() => setRegisterOpen(false)}
            disabled={registerLoading}
          >
            Cancel
          </MuiButton>
          <MuiButton
            variant="contained"
            color="primary"
            onClick={handleRegister}
            disabled={registerLoading}
          >
            Register
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employe;
