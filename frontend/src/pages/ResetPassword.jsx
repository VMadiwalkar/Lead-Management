import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const resetToken = sessionStorage.getItem("resetToken");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Passwords do not match");
    try {
      await axios.post("http://localhost:5000/reset-password", { resetToken, password });
      navigate("/reset-success");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to reset password");
    }
  };

  return (
    <div className="h-screen flex gap-8">
      <div className="w-1/2 relative overflow-hidden">
        <img src={LoginImg} alt="Reset Illustration" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <CompanyLogo className="mb-3" />
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h2>
            <p className="text-sm text-gray-600">Your new password must be different from previous used passwords.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
                <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Use 8 or more characters with a mix of letters, numbers & symbols.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Re-enter new password"
                />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">Submit</button>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Copyright ©2025 - Insane Techno Labs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
