import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <LoginForm />
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
        </p>
      </div>
    </div>
  );
}
