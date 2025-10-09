import React from "react";

export default function CompanyLogo({ className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-2xl font-bold leading-none">
        <span className="text-blue-900">INSANE</span>
        <span className="text-orange-500">BIZ</span>
      </h1>
      <p className="text-xs text-blue-900 font-medium leading-tight">TRANSFORMING BUSINESS - RADICALLY</p>
    </div>
  );
}
