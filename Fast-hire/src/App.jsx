import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";
import LoadingOverlay from "./Components/Common/LoadingOverlay";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Components/Layouts/Theme.jsx";

// Direct imports
import MainDashboard from "./Components/MainDashBoard/MainDashboard";

// Lazy-loaded components
const SidebarLoginContainer = lazy(() => import("./Components/AllLogIn/SidebarLoginContainer"));
const Layout = lazy(() => import("./Components/Layouts/Layout.jsx"));
const JobPost = lazy(() => import('./Components/JobPost/JobPost'));
const JobRecord = lazy(() => import('./Components/JobRecord/JobRecord'));
const Employe = lazy(() => import('./Components/Employe/Employe.jsx'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const ApplicationForm = lazy(() => import('./Components/ApplicationForm/ApplicationForm'));
const SuperAdminRoutes = lazy(() => import('./routes/SuperAdminRoutes'));

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
              <Route path="employe" element={<Employe />} />
              <Route path="settings" element={<Settings />} />
              {/* <Route path="*" element={<Navigate to="dashboard" replace />} /> */}
            </Route>

    
            {/* <Route path="/super-admin/*" element={<SuperAdminRoutes />} /> */}

            {/* <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/admin" replace />} /> */}
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};
export default App;
