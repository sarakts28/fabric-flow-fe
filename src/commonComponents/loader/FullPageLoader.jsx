// components/FullPageLoader.jsx
import React from "react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default FullPageLoader;
