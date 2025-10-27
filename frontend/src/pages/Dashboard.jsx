import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DefaultDashboard from './DefaultDashboard.jsx';

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children ? children : <DefaultDashboard />}
        </main>
        <footer className="bg-white p-2 border-t border-gray-200">
          <p className="text-xs text-gray-500" style={{ marginLeft: '1rem' }}>
            2025-2026 © Insane Techno Labs.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
