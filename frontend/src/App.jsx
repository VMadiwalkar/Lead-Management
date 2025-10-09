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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
        {/* 
        Protected routes can be enabled by wrapping components:
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
