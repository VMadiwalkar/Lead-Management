import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import HrDashboard from "./pages/HrDashboard.jsx";
import DealsDashboard from "./pages/DealsDashboard.jsx";
import LeadsDashboard from "./pages/LeadsDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetSuccess from "./pages/ResetSuccess.jsx";
import UnderMaintenance from "./pages/UnderMaintenance.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import NotFound404 from "./pages/NotFound404.jsx";
import ServerError500 from "./pages/ServerError500.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/verify-otp" element={<OtpVerification />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/admin-dashboard" 
          element={<Dashboard><AdminDashboard /></Dashboard>} 
        />
        <Route 
          path="/employee-dashboard" 
          element={<Dashboard><EmployeeDashboard /></Dashboard>} 
        />
        <Route 
          path="/hr-dashboard" 
          element={<Dashboard><HrDashboard /></Dashboard>} 
        />
        <Route 
          path="/deals-dashboard" 
          element={<Dashboard><DealsDashboard /></Dashboard>} 
        />
        <Route 
          path="/leads-dashboard" 
          element={<Dashboard><LeadsDashboard /></Dashboard>} 
        />
        {/* Informational/utility pages */}
        <Route path="/maintenance" element={<UnderMaintenance />} />
        <Route path="/construction" element={<UnderConstruction />} />
        <Route path="/server-error" element={<ServerError500 />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound404 />} />
        {/* 
        Protected routes can be enabled by wrapping components:
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
