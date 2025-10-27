import React, { useEffect, useState } from "react";
import CompanyLogo from "../components/CompanyLogo.jsx";
import LoginImg from "../assets/Login_img.jpg";
import { Link } from "react-router-dom";

// Simple countdown target: 5 days from now
const targetTime = () => Date.now() + 5 * 24 * 60 * 60 * 1000;

export default function ComingSoon() {
  const [deadline] = useState(targetTime());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((diff % (60 * 1000)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="min-h-screen flex items-center bg-orange-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="py-10">
          <CompanyLogo className="mb-8 md:mb-12 md:text-left" />
          <p className="text-gray-600 mb-6">Please check back later, We are working hard to get everything just right.</p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe to get notified</label>
            <div className="flex gap-2">
              <input type="email" className="flex-1 p-3 border border-gray-300 rounded-lg" placeholder="Enter your Email" />
              <button className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600">Subscribe</button>
            </div>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-col items-center">
          <img src={LoginImg} alt="Coming Soon" className="w-full h-[22rem] object-cover rounded-xl shadow-sm mb-6" />
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((t) => (
              <div key={t.label} className="bg-white rounded-lg shadow p-4 min-w-[5rem]">
                <div className="text-2xl font-bold text-orange-500">{String(t.value).padStart(2, "0")}</div>
                <div className="text-xs text-gray-500 mt-1">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
