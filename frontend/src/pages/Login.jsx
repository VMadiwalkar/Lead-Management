import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function Login() {
  return (
    <div className="h-screen flex gap-8">
      {/* Left Section - Illustration */}
      <div className="w-1/2 relative overflow-hidden">
        <img 
          src={LoginImg} 
          alt="Login illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
        
        {/* Copyright Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Copyright ©2025 - Insane Techno Labs
          </p>
        </div>
      </div>
    </div>
  );
}
