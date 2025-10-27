import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CompanyLogo from "./CompanyLogo.jsx";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileText,
  Settings,
  Archive,
  File,
  Calendar,
  ClipboardCheck,
  TrendingUp,
  Award,
  ArrowUp,
  LogOut,
  XCircle,
  Briefcase,
  Contact,
  ChevronDown,
  ChevronRight,
  List,
  Sun
} from 'lucide-react';

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    userManagement: false,
    reports: false,
    settings: false,
    assets: false,
    documents: false,
    officeSettings: false,
    employees: false,
    attendance: false,
    performance: false,
    training: false,
    projects: false,
  });
  const location = useLocation();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => {
    // Check for an exact match or if the path is a parent of the current location
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavItem = ({ to, icon, children, hasSubmenu, submenuOpen, onClick }) => {
    const active = isActive(to);
    return (
      <div className="mb-2 relative">
        <Link
          to={to}
          onClick={onClick}
          className={`flex items-center justify-between w-full text-left text-sm font-medium transition-colors duration-200 p-2 rounded-md ${
            active
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center">
            {icon}
            <span className="ml-3">{children}</span>
          </div>
          {hasSubmenu && (
            <>{submenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</>
          )}
        </Link>
        {active && <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>}
      </div>
    );
  };

  const SubMenu = ({ children, isOpen }) => {
    if (!isOpen) return null;
    return <div className="ml-7 mt-1 space-y-1 border-l border-gray-200 pl-3">{children}</div>;
  };

  const SubMenuItem = ({ to, children }) => {
    const active = isActive(to);
    return (
        <div className="relative">
            <Link
                to={to}
                className={`block py-1 px-2 text-sm transition-colors duration-200 rounded ${
                active
                    ? 'text-orange-500 font-medium'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
            >
                {children}
            </Link>
            {active && <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>}
      </div>
    );
  };

  const SectionTitle = ({ children }) => {
    return (
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
        {children}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-2 border-b border-gray-200 flex justify-center items-center" style={{ height: '60px' }}>
          <CompanyLogo className="text-left scale-75 transform-origin-left" />
      </div>
      
      {/* Navigation Menu */}
      <div className="py-4 flex-1 overflow-y-auto">
        
        {/* Main Menu */}
        <SectionTitle>Main Menu</SectionTitle>
        <NavItem 
          to="/admin-dashboard"
          icon={<LayoutDashboard size={20} />}
          hasSubmenu
          submenuOpen={expandedSections.dashboard}
          onClick={(e) => { e.preventDefault(); toggleSection('dashboard')}}
        >
          Dashboard
        </NavItem>
        <SubMenu isOpen={expandedSections.dashboard}>
          <SubMenuItem to="/admin-dashboard">Admin</SubMenuItem>
          <SubMenuItem to="/employee-dashboard">Employee</SubMenuItem>
          <SubMenuItem to="/hr-dashboard">HR</SubMenuItem>
          <SubMenuItem to="/deals-dashboard">Deals</SubMenuItem>
          <SubMenuItem to="/leads-dashboard">Leads</SubMenuItem>
        </SubMenu>

        {/* Administration */}
        <SectionTitle>Administration</SectionTitle>
        <NavItem to="/user-management" icon={<Users size={20} />} hasSubmenu submenuOpen={expandedSections.userManagement} onClick={(e) => {e.preventDefault(); toggleSection('userManagement')}}>User Management</NavItem>
        <SubMenu isOpen={expandedSections.userManagement}>
            <SubMenuItem to="/department-designation">Department & Designation</SubMenuItem>
            <SubMenuItem to="/roles-permissions">Roles & Permissions</SubMenuItem>
        </SubMenu>
        <NavItem to="/approvals" icon={<CheckSquare size={20} />}>Approvals</NavItem>
        <NavItem to="/reports" icon={<FileText size={20} />} hasSubmenu submenuOpen={expandedSections.reports} onClick={(e) => {e.preventDefault(); toggleSection('reports')}}>Reports</NavItem>
         <SubMenu isOpen={expandedSections.reports}>
              <SubMenuItem to="/expense-report">Expense Report</SubMenuItem>
              <SubMenuItem to="/invoice-report">Invoice Report</SubMenuItem>
              <SubMenuItem to="/payment-report">Payment Report</SubMenuItem>
         </SubMenu>
        <NavItem to="/settings" icon={<Settings size={20} />} hasSubmenu submenuOpen={expandedSections.settings} onClick={(e) => {e.preventDefault(); toggleSection('settings')}}>Settings</NavItem>
        <SubMenu isOpen={expandedSections.settings}>
            <SubMenuItem to="/general-security">General Security</SubMenuItem>
        </SubMenu>

        {/* Office Management */}
        <SectionTitle>Office Management</SectionTitle>
        <NavItem to="/assets" icon={<Archive size={20} />} hasSubmenu submenuOpen={expandedSections.assets} onClick={(e) => {e.preventDefault(); toggleSection('assets')}}>Assets</NavItem>
        <NavItem to="/documents" icon={<File size={20} />} hasSubmenu submenuOpen={expandedSections.documents} onClick={(e) => {e.preventDefault(); toggleSection('documents')}}>Documents</NavItem>
        <NavItem to="/office-settings" icon={<Settings size={20} />} hasSubmenu submenuOpen={expandedSections.officeSettings} onClick={(e) => {e.preventDefault(); toggleSection('officeSettings')}}>Settings</NavItem>

        {/* HRM */}
        <SectionTitle>HRM</SectionTitle>
        <NavItem to="/employees" icon={<Users size={20} />} hasSubmenu submenuOpen={expandedSections.employees} onClick={(e) => {e.preventDefault(); toggleSection('employees')}}>Employees</NavItem>
        <NavItem to="/holidays" icon={<Calendar size={20} />}>Holidays</NavItem>
        <NavItem to="/attendance" icon={<ClipboardCheck size={20} />} hasSubmenu submenuOpen={expandedSections.attendance} onClick={(e) => {e.preventDefault(); toggleSection('attendance')}}>Attendance</NavItem>
        <NavItem to="/performance" icon={<TrendingUp size={20} />} hasSubmenu submenuOpen={expandedSections.performance} onClick={(e) => {e.preventDefault(); toggleSection('performance')}}>Performance</NavItem>
        <NavItem to="/training" icon={<Award size={20} />} hasSubmenu submenuOpen={expandedSections.training} onClick={(e) => {e.preventDefault(); toggleSection('training')}}>Training</NavItem>
        <NavItem to="/promotion" icon={<ArrowUp size={20} />}>Promotion</NavItem>
        <NavItem to="/resignation" icon={<LogOut size={20} />}>Resignation</NavItem>
        <NavItem to="/termination" icon={<XCircle size={20} />}>Termination</NavItem>

        {/* PROJECTS */}
        <SectionTitle>Projects</SectionTitle>
        <NavItem to="/clients" icon={<Users size={20} />}>Clients</NavItem>
        <NavItem to="/projects" icon={<Briefcase size={20} />} hasSubmenu submenuOpen={expandedSections.projects} onClick={(e) => {e.preventDefault(); toggleSection('projects')}}>Projects</NavItem>
        
        {/* CRM */}
        <SectionTitle>CRM</SectionTitle>
        <NavItem to="/contacts" icon={<Contact size={20} />}>Contacts</NavItem>
      </div>

      <footer className="p-1 border-t border-gray-200 flex items-center justify-center space-x-2">
        <button className="p-1 hover:bg-gray-100 rounded"><Users size={16} /></button>
        <button className="p-1 hover:bg-gray-100 rounded"><List size={16} /></button>
        <button className="p-1 hover:bg-gray-100 rounded"><Sun size={16} /></button>
      </footer>
    </div>
  );
};

export default Sidebar;
