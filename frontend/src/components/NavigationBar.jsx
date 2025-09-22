import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                Lead Management
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <button
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => alert('Leads page coming soon!')}
            >
              Leads
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => alert('Analytics page coming soon!')}
            >
              Analytics
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => alert('Settings page coming soon!')}
            >
              Settings
            </button>
            <div className="ml-4">
              <LogoutButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/dashboard') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <button
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={() => {
              alert('Leads page coming soon!');
              setIsMenuOpen(false);
            }}
          >
            Leads
          </button>
          <button
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={() => {
              alert('Analytics page coming soon!');
              setIsMenuOpen(false);
            }}
          >
            Analytics
          </button>
          <button
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={() => {
              alert('Settings page coming soon!');
              setIsMenuOpen(false);
            }}
          >
            Settings
          </button>
          <div className="px-3 py-2">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;