import React from "react";
import useScreenSize from "../../../hooks/useScreenResize";
import Card from "../components/Card";
import CompanyStats from "../components/CompanyStats";

const Home = () => {
  const { width } = useScreenSize();

  return (
    <div
      className={`${
        width < 768 ? "pl-[70px]!" : ""
      } bg-pages-background flex-1 w-full h-full `}
    >
      <div className="w-full h-full p-3! sm:p-7!">
        <div className="w-full flex items-center ">
          <CompanyStats />
        </div>
      </div>
    </div>
  );
};

export default Home;
