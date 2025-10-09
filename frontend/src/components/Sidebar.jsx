import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";
import CompanyLogo from "./CompanyLogo.jsx";

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    userManagement: true,
    reports: false,
    settings: false,
    organizationHierarchy: true
  });
  const location = useLocation();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center">
          <CompanyLogo className="text-left scale-50 transform-origin-left" />
          {/* <span className="text-xl font-bold text-blue-600">INSANEBIZ</span> */}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          MAIN MENU
        </div>

        {/* Dashboard Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('dashboard')}
            className={`flex items-center justify-between w-full text-left text-sm font-medium transition-colors duration-200 p-2 rounded-md ${
              location.pathname.includes('dashboard') 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.dashboard ? 'transform rotate-90' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {expandedSections.dashboard && (
            <div className="ml-6 mt-2 space-y-1">
              <Link
                to="/admin-dashboard"
                className={`block py-1 px-2 text-sm transition-colors duration-200 rounded ${
                  isActive('/admin-dashboard') 
                    ? 'text-orange-500 font-medium border-l-2 border-orange-500 pl-2 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Admin Dashboard
              </Link>
              <Link
                to="/employee-dashboard"
                className={`block py-1 px-2 text-sm transition-colors duration-200 rounded ${
                  isActive('/employee-dashboard') 
                    ? 'text-orange-500 font-medium border-l-2 border-orange-500 pl-2 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Employee Dashboard
              </Link>
              <Link
                to="/hr-dashboard"
                className={`block py-1 px-2 text-sm transition-colors duration-200 rounded ${
                  isActive('/hr-dashboard') 
                    ? 'text-orange-500 font-medium border-l-2 border-orange-500 pl-2 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                HR Dashboard
              </Link>
              <Link
                to="/deals-dashboard"
                className={`block py-1 px-2 text-sm transition-colors duration-200 rounded ${
                  isActive('/deals-dashboard') 
                    ? 'text-orange-500 font-medium border-l-2 border-orange-500 pl-2 bg-orange-50' 
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Deals Dashboard
              </Link>
              <Link
                to="/leads-dashboard"
                className={`block py-1 text-sm transition-colors duration-200 ${
                  isActive('/leads-dashboard') 
                    ? 'text-blue-600 font-medium border-l-2 border-blue-600 pl-2' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Leads Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Administration Section */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            ADMINISTRATION
          </div>
          
          <button
            onClick={() => toggleSection('userManagement')}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 mb-2"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              User Management
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.userManagement ? 'transform rotate-90' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {expandedSections.userManagement && (
            <div className="ml-6 mb-4 space-y-1">
              <button
                onClick={() => toggleSection('organizationHierarchy')}
                className="flex items-center justify-between w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <span>Organization Hierarchy</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    expandedSections.organizationHierarchy ? 'transform rotate-90' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {expandedSections.organizationHierarchy && (
                <div className="ml-4 mt-1 space-y-1">
                  <Link
                    to="/department-designation"
                    className={`block py-1 text-sm transition-colors duration-200 ${
                      isActive('/department-designation') 
                        ? 'text-blue-600 font-medium' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Department & Designation
                  </Link>
                  <Link
                    to="/roles-permissions"
                    className={`block py-1 text-sm transition-colors duration-200 ${
                      isActive('/roles-permissions') 
                        ? 'text-blue-600 font-medium' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Roles & Permissions
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link
            to="/approvals"
            className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Approvals
          </Link>
        </div>

        {/* Reports Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('reports')}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Reports
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.reports ? 'transform rotate-90' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {expandedSections.reports && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/expense-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Expense Report</Link>
              <Link to="/invoice-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Invoice Report</Link>
              <Link to="/payment-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Payment Report</Link>
              <Link to="/project-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Project Report</Link>
              <Link to="/task-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Task Report</Link>
              <Link to="/user-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">User Report</Link>
              <Link to="/employee-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Employee Report</Link>
              <Link to="/payslip-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Payslip Report</Link>
              <Link to="/attendance-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Attendance Report</Link>
              <Link to="/leave-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Leave Report</Link>
              <Link to="/daily-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Daily Report</Link>
              <Link to="/approval-report" className="block py-1 text-sm text-gray-600 hover:text-blue-600">Approval Report</Link>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('settings')}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Settings
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedSections.settings ? 'transform rotate-90' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {expandedSections.settings && (
            <div className="ml-6 mt-2 space-y-1">
              <Link to="/general-security" className="block py-1 text-sm text-gray-600 hover:text-blue-600">General Security</Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer with copyright */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        2025-2026 © Insane Techno Labs.
      </div>
    </div>
  );
};

export default Sidebar;