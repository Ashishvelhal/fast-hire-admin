import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";
import LoadingOverlay from "./Components/Common/LoadingOverlay";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Components/Layouts/Theme.jsx";
import MainDashboard from "./Components/MainDashBoard/MainDashboard";
import MiniSidebar from "./Components/Layouts/MiniSidebar.jsx";
import EmployerSidebar from "./Components/Layouts/EmployerSidebar.jsx";
import ManagerSidebar from "./Components/Layouts/ManagerSidebar.jsx";
import ManagerList from "./Components/Manager/ManagerList.jsx";
import EmployerList from "./Components/Employe/EmployerList.jsx";

const SidebarLoginContainer = lazy(() => import("./Components/AllLogIn/SidebarLoginContainer"));
const Layout = lazy(() => import("./Components/Layouts/Layout.jsx"));
const JobPost = lazy(() => import('./Components/JobPost/JobPost'));
const JobRecord = lazy(() => import('./Components/JobRecord/JobRecord'));
const User = lazy(() => import('./Components/User/CreateUser.jsx'));
const College = lazy(() => import('./Components/College/CreateCollege.jsx'));
const Billing = lazy(() => import('./Components/Billing/Billing.jsx'));
const ContactUs = lazy(() => import('./Components/ContactUs/ContactUs.jsx'));
const Leads = lazy(() => import('./Components/Leads/Leads.jsx'));
const DegreeLeads = lazy(() => import('./Components/DegreeLeads/DegreeLeads.jsx'));
const DegreeSetting = lazy(() => import('./Components/DegreeSetting/DegreeSetting.jsx'));
const CreateManager = lazy(() => import('./Components/Manager/CreateManager.jsx'));
const CreateEmploye = lazy(() => import('./Components/Employe/CreateEmploye.jsx'));
const CreatePlans = lazy(() => import('./Components/Plans/CreatePlans.jsx'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const ApplicationForm = lazy(() => import('./Components/ApplicationForm/ApplicationForm'));
const SuperAdminRoutes = lazy(() => import('./routes/SuperAdminRoutes'));
const ViewPlans = lazy(() => import('./Components/Plans/ViewPlans.jsx'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingOverlay loading={true} />}>
        <ErrorBoundary>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<SidebarLoginContainer />} />
            <Route
              path="/admin/fasthireadminlayout"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }>
              <Route path="dashboard" element={<MainDashboard />} />
              <Route path="jobpost" element={<JobPost />} />
              <Route path="applicationform" element={<ApplicationForm />} />
              <Route path="jobrecord" element={<JobRecord />} />
              <Route path="users" element={<User />} />
              <Route path="college" element={<College />} />
              <Route path="billing" element={<Billing />} />
              <Route path="contactus" element={<ContactUs />} />
              <Route path="leads" element={<Leads />} />
              <Route path="degreeleads" element={<DegreeLeads />} />
              <Route path="degreesetting" element={<DegreeSetting />} />
              <Route element={<MiniSidebar />}>
                <Route path="plans" element={<CreatePlans />} />
                <Route path="viewplans" element={<ViewPlans />} />
              </Route>
              <Route element={<EmployerSidebar />}>
                <Route path="employe" element={<CreateEmploye />} />
                <Route path="employerlist" element={<EmployerList />} />
              </Route>
              <Route element={<ManagerSidebar />}>
                <Route path="manager" element={<CreateManager />} />
                <Route path="managerlist" element={<ManagerList />} />
              </Route>
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};
export default App;

