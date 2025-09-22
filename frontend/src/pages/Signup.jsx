import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { username, password });
      setMessage("✅ Signup successful! You can now login.");
    } catch (err) {
      setMessage("❌ Username already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account ✨
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Signup
          </button>

          {message && (
            <p className="text-center mt-4 text-sm font-semibold">{message}</p>
          )}
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
