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
      </div>
    </div>
  );
};

export default Dashboard;
