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
  Button,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { createemploye } from "./CreateEmploye"; 
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import LoadingOverlay from "../Common/LoadingOverlay";
import "../Common/Design.css";

const CreateEmploye = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [registerData, setRegisterData] = useState({
    companyName: "",
    companyType: "",
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
    profilePhotoUrl: "",
    registrationNumber: "",
    gstNumber: "",
    documentsVerified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleStateChange = (e) => {
    setRegisterData({ ...registerData, state: e.target.value, district: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const fileUrl = URL.createObjectURL(file);
      setRegisterData({ ...registerData, profilePhotoUrl: fileUrl });
    }
  };

  const handleRegister = async () => {
    const { companyName, contactPerson, email, password } = registerData;
    if (!companyName || !contactPerson || !email || !password) {
      message.error("Please fill all mandatory fields");
      return;
    }

    setRegisterLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
      const createdByEmail = sessionStorage.getItem("email");

      const response = await createemploye(
        registerData,
        profilePhoto,
        token,
        createdByEmail,
        role
      );

      const { token: newToken, role: newRole, email: registeredEmail } =
        response.data;

      if (newToken) sessionStorage.setItem("token", newToken);
      if (newRole) sessionStorage.setItem("role", newRole);
      if (registeredEmail) sessionStorage.setItem("email", registeredEmail);

      message.success("Employee registered successfully");
      setRegisterOpen(false);

      // reset
      setRegisterData({
        companyName: "",
        companyType: "",
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
        profilePhotoUrl: "",
        registrationNumber: "",
        gstNumber: "",
        documentsVerified: false,
      });
      setProfilePhoto(null);
    } catch (err) {
      console.error(err);
      message.error("Failed to register employee");
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
        Register Employee
      </Button>
      <Dialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Employee Registration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className="textField-root">
            <Grid item xs={12} sm={3}>
              <TextField
                name="companyName"
                required
                label="Company Name"
                value={registerData.companyName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="contactPerson"
                required
                label="Contact Person"
                value={registerData.contactPerson}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="email"
                required
                label="Email"
                type="email"
                value={registerData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="password"
                required
                label="Password"
                type="password"
                value={registerData.password}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="companyWebsite"
                label="Company Website"
                value={registerData.companyWebsite}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="companyLogoUrl"
                label="Company Logo URL"
                value={registerData.companyLogoUrl}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="industry"
                required
                label="Industry"
                value={registerData.industry}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                name="companySize"
                required
                label="Company Size"
                value={registerData.companySize}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="1-10">1-10 employees</MenuItem>
                <MenuItem value="11-50">11-50 employees</MenuItem>
                <MenuItem value="51-200">51-200 employees</MenuItem>
                <MenuItem value="200+">200+ employees</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="foundedYear"
                required
                label="Founded Year"
                value={registerData.foundedYear}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                name="aboutCompany"
                label="About Company"
                value={registerData.aboutCompany}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="phoneNumber"
                required
                label="Phone Number"
                value={registerData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="alternatePhone"
                label="Alternate Phone"
                value={registerData.alternatePhone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="address"
                label="Address"
                value={registerData.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="city"
                label="City"
                value={registerData.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                name="state"
                label="State"
                value={registerData.state}
                onChange={handleStateChange}
                fullWidth
              >
                {Object.keys(indianStatesAndDistricts).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                name="district"
                label="District"
                value={registerData.district}
                onChange={handleChange}
                fullWidth
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
            <Grid item xs={12} sm={3}>
              <TextField
                name="country"
                label="Country"
                value={registerData.country}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="pinCode"
                label="Pin Code"
                value={registerData.pinCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                name="companyType"
                required
                label="Company Type"
                value={registerData.companyType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Private Ltd">Private Ltd</MenuItem>
                <MenuItem value="Proprietorship">Proprietorship</MenuItem>
                <MenuItem value="LLP">LLP</MenuItem>
                <MenuItem value="Government">Government</MenuItem>
                <MenuItem value="Semi-Government">Semi-Government</MenuItem>
                <MenuItem value="Partnership">Partnership</MenuItem>
                <MenuItem value="Public Ltd">Public Ltd</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="registrationNumber"
                required
                label="Reg.No/CIN/Shop No"
                value={registerData.registrationNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="gstNumber"
                required
                label="GST Number"
                value={registerData.gstNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Profile Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {profilePhoto && (
                <Typography variant="caption" display="block">
                  {profilePhoto.name}
                </Typography>
              )}
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

export default CreateEmploye;
