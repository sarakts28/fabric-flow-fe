import React, { useEffect } from "react";
import IMAGES from "../../constants/Images";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import ReportsIcon from "../../assets/icons/ReportsIcon";
import InventoryIcon from "../../assets/icons/InventoryIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import { IoSettings } from "react-icons/io5";
import SideBarItem from "./SideBarItem";
import useScreenSize from "../../hooks/useScreenResize";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/thunk/authThunk";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { PiArticle } from "react-icons/pi";
import { GrPlan } from "react-icons/gr";
import { CiRoute } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
const SideBar = () => {
  const { width } = useScreenSize();
  const isMobile = width < 768;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSmallSidebar, setIsSmallSidebar] = React.useState(
    width < 768 ? true : false
  );
  const { userDetail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (width < 768) {
      setIsSmallSidebar(true);
    } else {
      setIsSmallSidebar(false);
    }
  }, [width]);

  const logout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  const sideBarTabs = [
    {
      icon: <DashboardIcon size={24} />,
      label: "Dashboard",
      url: "/dashboard",
    },
    {
      icon: <PiArticle size={24} />,
      label: "Aticles",
      url: "/article",
    },
    {
      icon: <GrPlan size={24} />,
      label: "Aticles Planning",
      url: "/article-planning",
    },
    {
      icon: <CiRoute size={24} />,
      label: "Routes",
      url: "/routes",
    },
    {
      icon: <BiCategory size={24} />,
      label: "Categories",
      url: "/categories",
    },
  ];

  const bottomTabs = [
    {
      icon: <IoSettings size={24} />,
      label: "Settings",
      url: "/settings",
    },
    {
      icon: <LogoutIcon size={24} />,
      label: "Logout",
      url: "/logout",
      onClick: logout,
    },
  ];

  return (
    <div
      className={`bg-white shrink-0 ${
        isSmallSidebar ? "w-[70px]" : "w-[266px]"
      }  overflow-hidden border-r border-[#efefef] h-full      ${
        width < 768 ? " absolute top-0 left-0 h-full z-50!" : ""
      } `}
    >
      <div
        className={`w-full ${
          isSmallSidebar ? "px-3! py-7!" : "px-6! py-7!"
        }  overflow-hidden flex flex-col justify-between h-full relative`}
      >
        {/*  Icon That can resize the side bar */}

        <div
          className={` absolute w-full z-20 ${
            isSmallSidebar
              ? "left-0 justify-center"
              : " justify-end   right-0  pr-3!"
          }  top-0    cursor-pointer flex `}
        >
          <div
            onClick={() => setIsSmallSidebar(!isSmallSidebar)}
            className="  "
          >
            {isSmallSidebar ? (
              <IoMdMenu className=" text-black text-[25px]" />
            ) : (
              <IoMdMenu className=" text-black text-[25px]" />
            )}
          </div>
        </div>

        <div className=" w-full   flex-1 overflow-y-auto relative scrollbar-hide">
          {/* Profile section */}

          <div className="  fixed bg-white z-10">
            <div className=" flex items-center justify-between ">
              <div
                className={`w-12 h-12  rounded-2xl overflow-hidden bg-gray-300`}
              >
                <img
                  src={IMAGES.PROFILE_IMAGE}
                  className="w-full h-auto object-cover"
                  alt="Profiles Image"
                />
              </div>
              <div className={`ml-4! flex-1 ${isSmallSidebar ? "hidden" : ""}`}>
                <p className="text-[16px] font-bold text-[#09090A]">
                  {userDetail?.user?.name || userDetail?.user?.username}
                </p>
                <p className="text-[14px]  text-[#1F1F22]">
                  {userDetail?.user?.userType}
                </p>
              </div>
            </div>
          </div>

          {/* First Tabs Section  */}

          <div className="w-full mt-6! pt-[60px]!">
            <div className="gap-1 flex flex-col items-center w-full">
              {sideBarTabs.map((item, index) => (
                <SideBarItem
                  key={index}
                  url={item.url}
                  icon={item.icon}
                  label={item.label}
                  isSmallSidebar={isSmallSidebar}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Second Div */}
        <div className=" w-full">
          <div className=" flex flex-col items-center w-full">
            {bottomTabs.map((item, index) => (
              <SideBarItem
                key={index}
                url={item.url}
                icon={item.icon}
                label={item.label}
                isSmallSidebar={isSmallSidebar}
                onClick={item.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
