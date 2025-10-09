import React from 'react';
import { Search, Bell, MessageSquare, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <button className="text-gray-500 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search in HRMS"
            className="pl-10 pr-4 py-2 border rounded-md w-80"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs border p-1 rounded-sm">
            CTRL + /
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500">
          <MessageSquare size={24} />
        </button>
        <button className="text-gray-500">
          <Bell size={24} />
        </button>
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
