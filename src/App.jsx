import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MotionAnimation from './components/MotionAnimation';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Hospitals from './pages/hospitals/Hospitals';
import Datasets from './pages/datasets/Datasets';
import Computation from './pages/computation/Computation';
import Analytics from './pages/analytics/Analytics';
import AuditLogs from './pages/audit-logs/AuditLogs';
import Notifications from './pages/notifications/Notifications';
import Profile from './pages/settings/Profile';
import Settings from './pages/settings/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <MotionAnimation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/computation" element={<Computation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
