import React from "react";
import LowStockIcon from "../../../assets/icons/LowStockIcon";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import SaleTagIcon from "../../../assets/icons/SaleTagIcon";
import Card from "./Card";

const CompanyStats = () => {
  const stats = [
    {
      icon: <LowStockIcon size={24} />,
      label: "Low Stock ",
      data: "150",
    },
    {
      icon: <ArrowDownIcon size={24} />,
      label: "Pending GRN ",
      data: "150",
    },
    {
      icon: <SaleTagIcon size={24} />,
      label: "Today's Sales ",
      data: "150",
    },
  ];

  return (
    <div className="w-full ">
      <h4 className=" text-[24px] sm:text-[36px] mb-3! sm:mb-6! leading-[140%] font-medium text-black ">
        Quick Stats
      </h4>
      {
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 ">
          {stats.map((stat, index) => (
            <Card
              key={index}
              icon={stat.icon}
              heading={stat.label}
              data={stat.data}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default CompanyStats;
