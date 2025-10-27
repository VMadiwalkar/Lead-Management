import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/forgot-password", { email });
      // Save resetToken to sessionStorage (short-lived) so that refresh won't leak it long-term
      if (data.resetToken) sessionStorage.setItem("resetToken", data.resetToken);
      // also persist the masked email so the OTP page can show it after refresh
      const masked = data.maskedEmail || email;
      sessionStorage.setItem("maskedEmail", masked);
      navigate("/verify-otp", { state: { maskedEmail: masked } });
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex gap-8">
      {/* Left illustration */}
      <div className="w-1/2 relative overflow-hidden">
        <img src={LoginImg} alt="Reset Illustration" className="w-full h-full object-cover" />
      </div>

      {/* Right form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <CompanyLogo className="mb-6" />
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-sm text-gray-600">If you forgot your password, well, then we'll email you instructions to reset your password.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="jane@company.com"
              />
            </div>
            <button disabled={loading} className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-60">
              {loading ? "Sending..." : "Submit"}
            </button>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600">Return to <span className="text-orange-500">Sign in</span></Link>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">Copyright ©2025 - Insane Techno Labs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
