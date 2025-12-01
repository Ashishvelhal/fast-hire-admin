import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Divider,
} from "@mui/material";
import { message } from "antd";
import { createEmployer, updateEmployer } from "./CreateEmploye";
import { getAllIndustries } from "../Settings/Industry";
import { getAllCompanies } from "../Settings/Company";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import "../Common/Design.css";

const CreateEmploye = () => {
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [shopActFile, setShopActFile] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const superadminEmail = sessionStorage.getItem("email") || "";
  const role = "superadmin";

  const companyTypes = [
    "LLP",
    "NGO",
    "Government",
    "Partnership",
    "Proprietorship",
    "Private Limited",
    "Public Limited",
    "Semi-Government",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
  ];

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    companySize: "",
    companyId: "",
    industry: "",
    contactPerson: "",
    email: "",
    password: "",
    companyWebsite: "",
    foundedYear: "",
    aboutCompany: "",
    phoneNumber: "",
    alternatePhone: "",
    city: "",
    state: "",
    district: "",
    country: "",
    pinCode: "",
    address: "",
    landmark: "",
    registrationNumber: "",
    gstNumber: "",
    documentsVerified: false,
    isApproved: false,
    createdByEmail: superadminEmail,
    createdByRole: role,
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return;

    const fetchData = async () => {
      try {
        const [industryRes, companyRes] = await Promise.all([
          getAllIndustries(authToken),
          getAllCompanies(authToken),
        ]);

        setIndustries(industryRes?.data || []);
        setCompanies(
          Array.isArray(companyRes?.data)
            ? companyRes.data
            : companyRes?.data?.data || []
        );
      } catch {
        message.error("Failed to load dropdown data.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");

    try {
      setLoading(true);
      const formDataObj = new FormData();
      formDataObj.append("employer", JSON.stringify(formData));
      if (shopActFile) formDataObj.append("shopActLiaison", shopActFile);
      if (companyLogo) formDataObj.append("companyLogo", companyLogo);

      if (isEdit && editId) {
        await updateEmployer(editId, formDataObj, authToken);
        message.success("Employer updated successfully!");
      } else {
        await createEmployer(formDataObj, null, null, authToken);
        message.success("Employer created successfully!");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to submit employer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ fontSize: "0.85rem" }}>
      <Typography
        variant="h6"
        fontWeight={600}
        color="primary"
        mb={1}
        sx={{ fontSize: "1rem" }}
      >
        {isEdit ? "Update Employer" : ""}
      </Typography>

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{
          backgroundColor: "#f5f5f5",
          p: 0.6,
          borderRadius: "2px",
          mb: 1.5,
          textAlign: "center",
          color: "#333",
          fontSize: "0.9rem",
        }}
      >
        Company Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1.5} className="textField-root">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="Select Company"
            name="companyName"
            fullWidth
            value={formData.companyName}
            onChange={handleChange}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.companyName}>
                {company.companyName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="Company Type"
            name="companyType"
            fullWidth
            value={formData.companyType}
            onChange={handleChange}
          >
            {companyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="Company Size"
            name="companySize"
            fullWidth
            value={formData.companySize}
            onChange={handleChange}
          >
            {companySizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="Industry"
            name="industry"
            fullWidth
            value={formData.industry}
            onChange={handleChange}
          >
            {industries.map((ind) => (
              <MenuItem key={ind.id} value={ind.industryname}>
                {ind.industryname}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Reg. No / CIN / Shop Act No."
            name="registrationNumber"
            fullWidth
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <Button variant="outlined" component="label" size="small">
              Reg. No / CIN / Shop Act No.             
               <input
                type="file"
                hidden
                onChange={(e) => setShopActFile(e.target.files[0])}
              />
            </Button>
            <Button variant="outlined" component="label" size="small">
              Upload Logo
              <input
                type="file"
                hidden
                onChange={(e) => setCompanyLogo(e.target.files[0])}
              />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{
          backgroundColor: "#f5f5f5",
          p: 0.6,
          borderRadius: "2px",
          mb: 1.5,
          mt: 2,
          textAlign: "center",
          color: "#333",
          fontSize: "0.9rem",
        }}
      >
        Contact & Address Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1.5} className="textField-root">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Contact Person"
            name="contactPerson"
            fullWidth
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Password"
            name="password"
            type="password"
            fullWidth
            required={!isEdit}
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Website"
            name="companyWebsite"
            fullWidth
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Founded Year"
            name="foundedYear"
            fullWidth
            value={formData.foundedYear}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={9}>
          <TextField
            size="small"
            label="About Company"
            name="aboutCompany"
            fullWidth
            multiline
            rows={2}
            value={formData.aboutCompany}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Company Contact No."
            name="phoneNumber"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Admin Contact No."
            name="alternatePhone"
            fullWidth
            value={formData.alternatePhone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Landmark"
            name="landmark"
            fullWidth
            value={formData.landmark}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="City"
            name="city"
            fullWidth
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="State"
            name="state"
            fullWidth
            value={formData.state}
            onChange={handleStateChange}
          >
            {Object.keys(indianStatesAndDistricts).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            size="small"
            label="District"
            name="district"
            fullWidth
            value={formData.district}
            onChange={handleChange}
          >
            {(indianStatesAndDistricts[selectedState] || []).map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Country"
            name="country"
            fullWidth
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            size="small"
            label="Pin Code"
            name="pinCode"
            fullWidth
            value={formData.pinCode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            borderRadius: "6px",
            px: 4,
            py: 0.6,
            fontSize: "0.8rem",
            textTransform: "none",
          }}
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Registering..."
            : isEdit
              ? "Update"
              : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEmploye;
