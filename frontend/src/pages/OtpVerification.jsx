import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function OtpVerification() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [counter, setCounter] = useState(600);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const maskedEmail = state?.maskedEmail || "******@example.com";
  const resetToken = sessionStorage.getItem("resetToken");

  useEffect(() => {
    const timer = setInterval(() => setCounter((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const onChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 3) inputsRef.current[idx + 1]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const otp = digits.join("");
      const { data } = await axios.post("http://localhost:5000/verify-otp", { resetToken, otp });
      if (data?.verified) {
        navigate("/reset-password");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid code");
    }
  };

  const resend = async () => {
    setError("");
    try {
      await axios.post("http://localhost:5000/resend-otp", { resetToken });
      setCounter(600);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to resend OTP");
    }
  };

  const mm = String(Math.floor(counter / 60)).padStart(2, "0");
  const ss = String(counter % 60).padStart(2, "0");

  return (
    <div className="h-screen flex gap-8">
      <div className="w-1/2 relative overflow-hidden">
        <img src={LoginImg} alt="OTP Illustration" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <CompanyLogo className="mb-3" />
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-1">2 Step Verification</h2>
            <p className="text-sm text-gray-600">
              Please enter the OTP received to confirm your account ownership. A code has been sent to {maskedEmail}
            </p>
          </div>
          <form onSubmit={handleVerify} className="space-y-3">
            <div className="flex gap-3">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={d}
                  onChange={(e) => onChange(i, e.target.value)}
                  className="w-16 h-16 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>
            <div className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="text-red-500">●</span> {mm}:{ss}
              </span>
            </div>
            <div className="text-sm">
              Didn’t get the OTP?{" "}
              <button type="button" onClick={resend} className="text-orange-500 hover:text-orange-600">Resend OTP</button>
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
