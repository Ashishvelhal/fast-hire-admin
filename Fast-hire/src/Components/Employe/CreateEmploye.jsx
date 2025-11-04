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
import { getAllSkills } from "../Settings/Skills";
import { getAllSubCategories } from "../Settings/SubCategory";
import { getAllCategories } from "../Settings/Category";
import { getAllPlans } from "../Plans/CreatePlans";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import "../Common/Design.css";

const CreateEmploye = () => {
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [plans, setPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [shopActFile, setShopActFile] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    planId: "",
    industry: "",
    category: "",
    subCategory: "",
    skill: "",
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
        const [industryRes, companyRes, planRes, catRes, subRes, skillRes] =
          await Promise.all([
            getAllIndustries(authToken),
            getAllCompanies(authToken),
            getAllPlans(),
            getAllCategories(authToken),
            getAllSubCategories(authToken),
            getAllSkills(authToken),
          ]);

        setIndustries(industryRes?.data || []);
        setCompanies(Array.isArray(companyRes?.data) ? companyRes.data : companyRes?.data?.data || []);
        setPlans(planRes?.plans || []);
        setCategories(catRes?.data || []);
        setSubCategories(subRes?.data || []);
        setSkills(skillRes?.data || []);
      } catch (err) {
        console.error(err);
        message.error("Failed to load dropdown data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && formData.planId) {
      const selectedPlan = plans.find((p) => p.id === formData.planId);
      if (selectedPlan?.durationInMonths) {
        const newEndDate = new Date(startDate);
        newEndDate.setMonth(newEndDate.getMonth() + selectedPlan.durationInMonths);
        setEndDate(newEndDate.toISOString().split("T")[0]);
      }
    }
  }, [formData.planId, startDate, plans]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return message.error("Please login first.");
    if (!formData.planId) return message.error("Please select a plan.");
    if (!startDate) return message.error("Please select a start date.");

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
        await createEmployer(formDataObj, formData.planId, startDate, authToken);
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
    <Box>
      <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
        {isEdit ? "Update Employer" : ""}
      </Typography>

      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ backgroundColor: "#f5f5f5", p: 0.5, borderRadius: "2px", mb: 2, textAlign: "center", color: "#333" }}
      >
        Company Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} className="textField-root">
        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="Select Company" name="companyName" fullWidth value={formData.companyName} onChange={handleChange}>
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.companyName}>{company.companyName}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="Company Type" name="companyType" fullWidth value={formData.companyType} onChange={handleChange}>
            {companyTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="Company Size" name="companySize" fullWidth value={formData.companySize} onChange={handleChange}>
            {companySizes.map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="Industry" name="industry" fullWidth value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value, category: "", subCategory: "", skill: "" })}
          >
            {industries.map((ind) => (
              <MenuItem key={ind.id} value={ind.industryname}>{ind.industryname}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {formData.industry && (
          <Grid item xs={12} sm={6} md={3}>
            <TextField select label="Category" name="category" fullWidth value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "", skill: "" })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.categoryname}>{cat.categoryname}</MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {formData.category && (
          <Grid item xs={12} sm={6} md={3}>
            <TextField select label="Sub Category" name="subCategory" fullWidth value={formData.subCategory}
              onChange={(e) => setFormData({ ...formData, subCategory: e.target.value, skill: "" })}
            >
              {subCategories.map((sub) => (
                <MenuItem key={sub.id} value={sub.subcategoryname}>{sub.subcategoryname}</MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {formData.subCategory && (
          <Grid item xs={12} sm={6} md={3}>
            <TextField select label="Skill" name="skill" fullWidth value={formData.skill} onChange={handleChange}>
              {skills.map((sk) => (
                <MenuItem key={sk.id} value={sk.skillname}>{sk.skillname}</MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={3}>
          <TextField label="Reg. No / CIN / Shop Act No." name="registrationNumber" fullWidth value={formData.registrationNumber} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="outlined" component="label">
              Reg. No / CIN / Shop Act No
              <input type="file" hidden onChange={(e) => setShopActFile(e.target.files[0])} />
            </Button>
            <Button variant="outlined" component="label">
              Upload Logo
              <input type="file" hidden onChange={(e) => setCompanyLogo(e.target.files[0])} />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight={600} sx={{ backgroundColor: "#f5f5f5", mt: 3, p: 0.5, borderRadius: "2px", textAlign: "center" }}>
        Contact & Address Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} className="textField-root">
        <Grid item xs={12} sm={6} md={3}><TextField label="Contact Person" name="contactPerson" fullWidth value={formData.contactPerson} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Password" name="password" type="password" fullWidth value={formData.password} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Phone Number" name="phoneNumber" fullWidth value={formData.phoneNumber} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Alternate Phone" name="alternatePhone" fullWidth value={formData.alternatePhone} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Website" name="companyWebsite" fullWidth value={formData.companyWebsite} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Founded Year" name="foundedYear" fullWidth value={formData.foundedYear} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={9}><TextField label="About Company" name="aboutCompany" fullWidth multiline rows={2} value={formData.aboutCompany} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Landmark" name="landmark" fullWidth value={formData.landmark} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="State" name="state" fullWidth value={formData.state} onChange={handleStateChange}>
            {Object.keys(indianStatesAndDistricts).map((state) => (
              <MenuItem key={state} value={state}>{state}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="District" name="district" fullWidth value={formData.district} onChange={handleChange}>
            {(indianStatesAndDistricts[selectedState] || []).map((district) => (
              <MenuItem key={district} value={district}>{district}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Country" name="country" fullWidth value={formData.country} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}><TextField label="Pin Code" name="pinCode" fullWidth value={formData.pinCode} onChange={handleChange} /></Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField select label="Select Plan" name="planId" fullWidth value={formData.planId} onChange={handleChange}>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.name} — ₹{plan.price} ({plan.durationInMonths} Months)
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Plans Available</MenuItem>
            )}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }} fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField type="date" label="End Date" InputLabelProps={{ shrink: true }} fullWidth value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ borderRadius: "8px", px: 5 }}>
          {loading ? (isEdit ? "Updating..." : "Registering...") : isEdit ? "Update" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEmploye;
