import React from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center bg-orange-50 relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="py-10">
          <CompanyLogo className="mb-8 md:mb-12 md:text-left" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Under Construction</h1>
          <p className="text-gray-600 mb-6">
            We're currently upgrading our platform to serve you better. Stay tuned for exciting updates!
          </p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <img src={LoginImg} alt="Under Construction" className="w-full h-[28rem] object-cover rounded-xl shadow-sm" />
        </div>
      </div>
    </div>
  );
}
