import React from "react";

export default function CompanyLogo({ className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-3xl sm:text-4xl font-bold">
        <span className="text-blue-900">INSANE</span>
        <span className="text-orange-500">BIZ</span>
      </h1>
      <p className="text-sm text-blue-900 mt-2 font-medium">TRANSFORMING BUSINESS - RADICALLY</p>
    </div>
  );
}
