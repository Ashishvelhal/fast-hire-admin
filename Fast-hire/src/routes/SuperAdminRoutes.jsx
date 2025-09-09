import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminClient from '../Components/SuperAdmin/SuperAdminClient';
import SuperAdminLogin from '../Components/AllLogIn/SuperAdminLogin';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoadingOverlay from '../Components/Common/LoadingOverlay';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('../pages/super-admin/Dashboard'));
const Users = React.lazy(() => import('../pages/super-admin/Users'));
const Admins = React.lazy(() => import('../pages/super-admin/Admins'));
const Reports = React.lazy(() => import('../pages/super-admin/Reports'));
const Settings = React.lazy(() => import('../pages/super-admin/Settings'));
const Profile = React.lazy(() => import('../pages/super-admin/Profile'));

// Wrapper component to handle lazy loading with consistent fallback
const LazyComponent = ({ component: Component }) => (
  <Suspense fallback={<LoadingOverlay loading={true} />}>
    <Component />
  </Suspense>
);

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SuperAdminLogin />} />
      
      <Route element={
        <ProtectedRoute requiredRole="SUPERADMIN">
          <SuperAdminClient />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<LazyComponent component={Dashboard} />} />
        <Route path="users" element={<LazyComponent component={Users} />} />
        <Route path="admins" element={<LazyComponent component={Admins} />} />
        <Route path="reports" element={<LazyComponent component={Reports} />} />
        <Route path="settings" element={<LazyComponent component={Settings} />} />
        <Route path="profile" element={<LazyComponent component={Profile} />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
      
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
