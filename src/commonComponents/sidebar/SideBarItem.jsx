import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItem = ({ icon, url, label, isSmallSidebar, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => (onClick ? onClick() : navigate(url))}
      className={`w-full hover:bg-gray-50   select-none  rounded-lg flex items-center cursor-pointer ${
        isSmallSidebar ? "py-4! px-2! justify-center" : " gap-2.5 p-4!"
      } ${
        location.pathname === url ? "bg-base-background!" : "bg-transparent"
      }`}
    >
      <div className=" shrink-0">{icon}</div>
      <span
        className={`${
          isSmallSidebar ? "hidden" : ""
        } text-[14px] leading-[140%] text-[#09090A]`}
      >
        {label}
      </span>
    </div>
  );
};

export default SideBarItem;
