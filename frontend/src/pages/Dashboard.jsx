import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar.jsx";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage("❌ Unauthorized, please login again."));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="container-padded py-6">
        <div className="px-0">
          <div className="card-elevated">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <p className="text-lg text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
