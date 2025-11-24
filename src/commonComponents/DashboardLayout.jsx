import React from "react";
import SideBar from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex  justify-start items-start">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
