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
const Settings = lazy(() => import('./Components/Settings/Settings'));

// Application form component (if needed)
const ApplicationForm = lazy(() => import('./Components/ApplicationForm/ApplicationForm'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingOverlay loading={true} />}>
        <ErrorBoundary>
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/fasthireadmin" replace />} />

            {/* Public login route */}
            <Route path="/fasthireadmin" element={<SidebarLoginContainer />} />

            {/* Protected admin routes */}
            <Route
              path="/fasthireadmin/admin"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              {/* Main Dashboard */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<MainDashboard />} />

              {/* Job Post Section */}
              <Route path="jobpost" element={<JobPost />} />

              {/* Application Form */}
              <Route path="applicationform" element={<ApplicationForm />} />

              {/* Job Record */}
              <Route path="jobrecord" element={<JobRecord />} />

              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/fasthireadmin" replace />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
