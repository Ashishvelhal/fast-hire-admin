// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Grid,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import { message } from "antd";
// import { createEmployer, updateEmployer } from "./CreateEmploye";
// import { getAllIndustries } from "../Settings/Industry";
// import { getAllCompanies } from "../Settings/Company";
// import { getAllPlans } from "../Plans/CreatePlans";
// import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
// import "../Common/Design.css";

// const CreateEmploye = () => {
//   const [industries, setIndustries] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const superadminEmail = sessionStorage.getItem("email") || "";
//   const role = "superadmin";

//   const companyTypes = [
//     "LLP",
//     "NGO",
//     "Government",
//     "Partnership",
//     "Pro-prietorship",
//     "Private Limited",
//     "Public Limited",
//     "Semi-Government",
//   ];

//   const companySizes = [
//     "1-10 employees",
//     "11-50 employees",
//     "51-200 employees",
//     "201-500 employees",
//     "501-1000 employees",
//   ];

//   const [formData, setFormData] = useState({
//     company: "",
//     companyType: "",
//     companySize: "",
//     companyId: "",
//     planId: "",
//     industry: "",
//     contactPerson: "",
//     email: "",
//     password: "",
//     companyWebsite: "",
//     foundedYear: "",
//     aboutCompany: "",
//     phoneNumber: "",
//     alternatePhone: "",
//     city: "",
//     state: "",
//     district: "",
//     country: "",
//     pinCode: "",
//     address: "",
//     registrationNumber: "",
//     gstNumber: "",
//     documentsVerified: false,
//     isApproved: false,
//     createdByEmail: superadminEmail,
//     createdByRole: role,
//   });

//   useEffect(() => {
//     const authToken = sessionStorage.getItem("authToken");
//     if (!authToken) return;

//     const fetchIndustries = async () => {
//       try {
//         const res = await getAllIndustries(authToken);
//         setIndustries(res.data || []);
//       } catch {
//         message.error("Failed to load industries.");
//       }
//     };

//     const fetchCompanies = async () => {
//       try {
//         const res = await getAllCompanies(authToken);
//         setCompanies(res.data || []);
//       } catch {
//         message.error("Failed to load companies.");
//       }
//     };

//     const fetchPlans = async () => {
//       try {
//         const res = await getAllPlans();
//         const planData = res?.plans || [];
//         setPlans(Array.isArray(planData) ? planData : []);
//       } catch {
//         message.error("Failed to load plans.");
//       }
//     };

//     fetchIndustries();
//     fetchCompanies();
//     fetchPlans();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setFormData({ ...formData, state, district: "" });
//   };

//   const handlePhotoChange = (e) =>
//     e.target.files[0] && setProfilePhoto(e.target.files[0]);

//   const handleSubmit = async () => {
//     const authToken = sessionStorage.getItem("authToken");
//     if (!authToken) return message.error("Please login first.");

//     if (!formData.planId) return message.error("Please select a plan.");
//     if (!startDate) return message.error("Please select a start date.");

//     try {
//       setLoading(true);
//       const formDataObj = new FormData();
//       formDataObj.append("employer", JSON.stringify(formData));
//       if (profilePhoto) formDataObj.append("profilePhoto", profilePhoto);

//       if (isEdit && editId) {
//         await updateEmployer(editId, formDataObj, authToken);
//         message.success("Employer updated successfully!");
//       } else {
//         await createEmployer(formDataObj, formData.planId, startDate, authToken);
//         message.success("Employer created successfully!");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to submit employer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h5" fontWeight={600} color="primary" mb={2}>
//         {isEdit ? "Update Employer" : ""}
//       </Typography>

//       <Typography
//         variant="h6"
//         fontWeight={600}
//         sx={{
//           backgroundColor: '#f5f5f5',
//           p: 0.5,
//           borderRadius: '2px',
//           mb: 2,
//           textAlign: 'center',
//           pl: 2,
//           color: '#333',
//           fontSize: '1rem',
//           textTransform: 'none',
//           letterSpacing: 'normal',
//         }}
//       >
//         Company Details
//       </Typography>
//       <Divider sx={{ mb: 3 }} />
//       <Grid container spacing={2} className="textField-root">
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="Select Company"
//             name="company"
//             fullWidth
//             value={formData.company}
//             onChange={handleChange}
//           >
//             {companies.map((company) => (
//               <MenuItem key={company.id} value={company.company}>
//                 {company.company}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="Company Type"
//             name="companyType"
//             fullWidth
//             value={formData.companyType}
//             onChange={handleChange}
//           >
//             {companyTypes.map((type) => (
//               <MenuItem key={type} value={type}>
//                 {type}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="Company Size"
//             name="companySize"
//             fullWidth
//             value={formData.companySize}
//             onChange={handleChange}
//           >
//             {companySizes.map((size) => (
//               <MenuItem key={size} value={size}>
//                 {size}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="Industry"
//             name="industry"
//             fullWidth
//             value={formData.industry}
//             onChange={handleChange}
//           >
//             {industries.map((ind) => (
//               <MenuItem key={ind.id} value={ind.industryname}>
//                 {ind.industryname}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>
//       </Grid>

//       <Typography
//         variant="h6"
//         fontWeight={600}
//         sx={{
//           backgroundColor: '#f5f5f5',
//           p: 0.5,
//           borderRadius: '2px',
//           mb: 2,
//           textAlign: 'center',
//           pl: 2,
//           mt:2,
//           color: '#333',
//           fontSize: '1rem',
//           textTransform: 'none',
//           letterSpacing: 'normal',
//         }}
//       >
//         Contact & Address Details
//       </Typography>
//       <Divider sx={{ mb: 3 }} />
//       <Grid container spacing={2} className="textField-root">
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Contact Person"
//             name="contactPerson"
//             fullWidth
//             value={formData.contactPerson}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             fullWidth
//             required
//             value={formData.email}
//             onChange={handleChange}
//             disabled={isEdit}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             fullWidth
//             required={!isEdit}
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Website"
//             name="companyWebsite"
//             fullWidth
//             value={formData.companyWebsite}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Founded Year"
//             name="foundedYear"
//             fullWidth
//             value={formData.foundedYear}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={9}>
//           <TextField
//             label="About Company"
//             name="aboutCompany"
//             fullWidth
//             multiline
//             rows={2}
//             value={formData.aboutCompany}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Company Contact No."
//             name="phoneNumber"
//             fullWidth
//             value={formData.phoneNumber}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Admin Contact No."
//             name="alternatePhone"
//             fullWidth
//             value={formData.alternatePhone}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Address"
//             name="address"
//             fullWidth
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="City"
//             name="city"
//             fullWidth
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="State"
//             name="state"
//             fullWidth
//             value={formData.state}
//             onChange={handleStateChange}
//           >
//             {Object.keys(indianStatesAndDistricts).map((state) => (
//               <MenuItem key={state} value={state}>
//                 {state}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="District"
//             name="district"
//             fullWidth
//             value={formData.district}
//             onChange={handleChange}
//           >
//             {(indianStatesAndDistricts[selectedState] || []).map((district) => (
//               <MenuItem key={district} value={district}>
//                 {district}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Country"
//             name="country"
//             fullWidth
//             value={formData.country}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Pin Code"
//             name="pinCode"
//             fullWidth
//             value={formData.pinCode}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Reg.No/CIN/Shop Act Liaison No"
//             name="registrationNumber"
//             fullWidth
//             value={formData.registrationNumber}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             select
//             label="Select Plan"
//             name="planId"
//             fullWidth
//             value={formData.planId}
//             onChange={handleChange}
//           >
//             {plans.length > 0 ? (
//               plans.map((plan) => (
//                 <MenuItem key={plan.id} value={plan.id}>
//                   {plan.name} — ₹{plan.price} ({plan.durationInMonths} Months)
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem disabled>No Plans Available</MenuItem>
//             )}
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             type="date"
//             label="Start Date"
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             type="date"
//             label="End Date"
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </Grid>
//       </Grid>
//       <Box display="flex" alignItems="center" gap={2} mt={3}>
//         <Button variant="outlined" component="label" sx={{ color: "#1976d2", fontWeight: 600 }}>
//           Upload Shop Act Liaison
//           <input type="file" hidden onChange={handlePhotoChange} />
//         </Button>
//         <Button variant="outlined" component="label" sx={{ color: "#1976d2", fontWeight: 600 }}>
//           Upload Company Logo
//           <input type="file" hidden onChange={handlePhotoChange} />
//         </Button>
//       </Box>
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           disabled={loading}
//           sx={{ borderRadius: "8px", px: 5 }}
//         >
//           {loading
//             ? isEdit
//               ? "Updating..."
//               : "Registering..."
//             : isEdit
//               ? "Update"
//               : "Submit"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CreateEmploye;
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
import { getAllPlans } from "../Plans/CreatePlans";
import indianStatesAndDistricts from "../Common/indianStatesAndDistricts";
import "../Common/Design.css";

const CreateEmploye = () => {
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [plans, setPlans] = useState([]);
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
    registrationNumber: "",
    gstNumber: "",
    documentsVerified: false,
    isApproved: false,
    createdByEmail: superadminEmail,
    createdByRole: role,
  });

  // Fetch dropdown data
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) return;

    const fetchIndustries = async () => {
      try {
        const res = await getAllIndustries(authToken);
        setIndustries(res.data || []);
      } catch {
        message.error("Failed to load industries.");
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies(authToken);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setCompanies(data);
      } catch {
        message.error("Failed to load companies.");
      }
    };

    const fetchPlans = async () => {
      try {
        const res = await getAllPlans();
        const planData = res?.plans || [];
        setPlans(Array.isArray(planData) ? planData : []);
      } catch {
        message.error("Failed to load plans.");
      }
    };

    fetchIndustries();
    fetchCompanies();
    fetchPlans();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state, district: "" });
  };

  // Auto-calculate end date when plan selected
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

      {/* Company Section */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          backgroundColor: "#f5f5f5",
          p: 0.5,
          borderRadius: "2px",
          mb: 2,
          textAlign: "center",
          color: "#333",
          fontSize: "1rem",
        }}
      >
        Company Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} className="textField-root">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
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
      </Grid>

      {/* Contact & Address */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          backgroundColor: "#f5f5f5",
          p: 0.5,
          borderRadius: "2px",
          mb: 2,
          textAlign: "center",
          mt: 2,
          color: "#333",
          fontSize: "1rem",
        }}
      >
        Contact & Address Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} className="textField-root">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Contact Person"
            name="contactPerson"
            fullWidth
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
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
            label="Website"
            name="companyWebsite"
            fullWidth
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Founded Year"
            name="foundedYear"
            fullWidth
            value={formData.foundedYear}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={9}>
          <TextField
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
            label="Company Contact No."
            name="phoneNumber"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Admin Contact No."
            name="alternatePhone"
            fullWidth
            value={formData.alternatePhone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
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
            label="Country"
            name="country"
            fullWidth
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Pin Code"
            name="pinCode"
            fullWidth
            value={formData.pinCode}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Reg.No / CIN / Shop Act No."
            name="registrationNumber"
            fullWidth
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Select Plan"
            name="planId"
            fullWidth
            value={formData.planId}
            onChange={handleChange}
          >
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
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* File Uploads */}
      <Box display="flex" alignItems="center" gap={2} mt={3}>
        <Button variant="outlined" component="label" sx={{ color: "#1976d2", fontWeight: 600 }}>
          Upload Shop Act Liaison
          <input type="file" hidden onChange={(e) => setShopActFile(e.target.files[0])} />
        </Button>
        <Button variant="outlined" component="label" sx={{ color: "#1976d2", fontWeight: 600 }}>
          Upload Company Logo
          <input type="file" hidden onChange={(e) => setCompanyLogo(e.target.files[0])} />
        </Button>
      </Box>

      {/* Submit */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ borderRadius: "8px", px: 5 }}
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
