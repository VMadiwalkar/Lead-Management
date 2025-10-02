import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import signupIllustration from "../assets/Login_img.jpg";
import CompanyLogo from "../components/CompanyLogo";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyHeadCount, setCompanyHeadCount] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Sending minimal payload for now; hook up to backend later.
      await axios.post("http://localhost:5000/signup", {
        username: email,
        password: mobile,
      });
      setMessage("✅ Signup successful! You can now login.");
    } catch (err) {
      setMessage("❌ Signup failed. Try a different email or try again later.");
    }
  };

  return (
    <div className="h-screen flex gap-8">
      {/* Left: Illustration section */}
      <div className="w-1/2 bg-[#fdeee3] relative overflow-hidden flex items-center justify-center p-6">
        <img
          src={signupIllustration}
          alt="Signup Illustration"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Right: Form section */}
      <div className="w-1/2 flex flex-col p-4 sm:p-6 overflow-y-auto">
        {/* Company Logo - Fixed at top */}
        <div className="flex-shrink-0 mb-1/2">
          <CompanyLogo />
        </div>
        
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-4 sm:p-6 mx-auto flex-1 flex flex-col justify-center">
            {/* Sign Up Header */}
            <div className="text-center mb-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sign Up</h2>
              <p className="text-sm text-gray-600 mt-1">Please enter your details to sign up</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-3">
              {/* 2-column layout for Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* 2-column layout for Mobile Number and Head Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Head Count</label>
                  <input
                    type="number"
                    min="1"
                    value={companyHeadCount}
                    onChange={(e) => setCompanyHeadCount(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Number of employees"
                  />
                </div>
              </div>

              {/* 2-column layout for Company Name and Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Website</label>
                  <input
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  Agree to <span className="text-orange-600">Terms & Privacy</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!agree}
                className="w-full bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-md hover:bg-orange-600 transition"
              >
                Sign Up
              </button>

              {message && (
                <p className="text-center mt-2 text-sm font-medium">{message}</p>
              )}
            </form>

            <p className="mt-3 text-center text-sm text-gray-700">
              Already have an account? {" "}
              <Link to="/" className="text-orange-600 hover:underline">Sign In</Link>
            </p>

            <div className="flex items-center gap-4 my-4">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm">Facebook</span>
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition duration-300"
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm">Google</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Copyright ©2025 - Insane Techno Labs
            </p>
        </div>
      </div>
    </div>
  );
}
