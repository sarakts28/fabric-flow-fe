import React from "react";

const Card = ({ icon, heading, data }) => {
  return (
    <div
      className={`bg-card-background flex flex-col min-h-[194px] shadow-card relative rounded-xl p-3! `}
    >
      <div className=" bg-card-background-linear absolute top-0 left-0 right-0 bottom-0 w-full h-full "></div>
      <div className=" flex gap-2.5 items-center justify-start">
        {icon}
        <span className=" text-[16px] leading-[100%] text-[#fff] font-medium">
          {heading}
        </span>
      </div>
      <div className="w-full flex-1 flex justify-center items-center">
        <span className=" text-[20px] leading-[100%] text-[#fff] font-medium">
          {data}
        </span>
      </div>
    </div>
  );
};

export default Card;
