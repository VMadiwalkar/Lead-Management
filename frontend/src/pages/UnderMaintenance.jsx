import React from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function UnderMaintenance() {
  return (
    <div className="min-h-screen flex items-center bg-orange-50 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100 rounded-full opacity-60" />
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="py-10">
          <CompanyLogo className="mb-8 md:mb-12 md:text-left" />

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
          <p className="text-gray-600 mb-6">
            The server is in a maintenance mode, please come back later or
            <a href="#" className="text-orange-500 hover:underline"> click here </a>
            to create a ticket if it’s urgent
          </p>

          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <img src={LoginImg} alt="Maintenance" className="w-full h-[28rem] object-cover rounded-xl shadow-sm" />
        </div>
      </div>
    </div>
  );
}
