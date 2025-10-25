import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function ResetSuccess() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex gap-8">
      <div className="w-1/2 relative overflow-hidden">
        <img src={LoginImg} alt="Success Illustration" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md text-center">
          <CompanyLogo className="mb-8" />
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Success</h2>
          <p className="text-sm text-gray-600 mb-4">Your new password has been successfully saved</p>
          <button onClick={() => navigate("/")} className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">Back to Sign In</button>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Copyright ©2025 - Insane Techno Labs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
