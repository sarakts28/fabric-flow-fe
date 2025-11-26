import React from "react";

export default function Switch({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-gray-600 text-sm">{label}</span>

      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition 
        ${value ? "bg-green-500" : "bg-gray-300"}`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition 
          ${value ? "translate-x-6" : "translate-x-0"}`}
        ></div>
      </div>
    </div>
  );
}
