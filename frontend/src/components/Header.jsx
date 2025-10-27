import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="relative flex items-center">
        {/* Left: removed hamburger icon */}

        {/* Center: search bar (absolutely centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="relative w-72 sm:w-80 md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search in HRMS"
              className="w-full pl-10 pr-20 py-2 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs border border-gray-200 px-2 py-1 rounded-md hidden sm:block bg-white/70">
              CTRL + /
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center space-x-4">
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
      </div>
    </header>
  );
};

export default Header;
