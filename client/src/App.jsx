import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx'; // <-- IMPORT HEADER
import LoginUser from './components/LoginUser.jsx';
import RegisterUser from './components/RegisterUser.jsx';
import LoginAdmin from './components/LoginAdmin.jsx';
import RegisterAdmin from './components/RegisterAdmin.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { getToken, getRole } from './utils/auth';

// ... (ProtectedRoute component remains the same)
const ProtectedRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getRole();

  if (!token) {
    return <Navigate to="/login/user" replace />;
  }
  if (role && role !== userRole) {
    const homeDashboard = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    return <Navigate to={homeDashboard} replace />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <Header /> {/* <-- RENDER HEADER HERE */}
      <div className="main-content"> {/* Added a wrapper for content */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login/user" replace />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/register/admin" element={<RegisterAdmin />} />

          {/* ... (Protected Routes remain the same) ... */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;