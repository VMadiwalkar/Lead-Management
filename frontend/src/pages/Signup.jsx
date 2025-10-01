import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import signupIllustration from "../assets/Login_img.jpg";

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
      <div className="w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6 sm:p-10">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Sign Up</h1>
              <p className="text-sm text-gray-500 mt-1">Please enter your details to sign up</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
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

            <p className="mt-4 text-center text-sm text-gray-700">
              Already have an account? {" "}
              <Link to="/" className="text-orange-600 hover:underline">Sign In</Link>
            </p>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="rounded-md bg-[#1877F2] text-white py-2 font-medium">Facebook</button>
              <button type="button" className="rounded-md bg-white border border-gray-300 text-gray-800 py-2 font-medium">Google</button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-8">
              Copyright ©2025 - Insane Techno Labs
            </p>
        </div>
      </div>
    </div>
  );
}
