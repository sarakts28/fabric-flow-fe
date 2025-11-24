import React from "react";
import { IoMdClose } from "react-icons/io";

const DetailModel = ({ data, setData }) => {
  return (
    <div className="px-2! sm:px-0! absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className="  max-w-[480px] text-center rounded-xl w-full bg-white p-2! ">
        <div className="w-full flex  justify-between ">
          <h2 className=" text-black text-[20px]   font-medium leading-[100%]  ">
            {data.rowName}
          </h2>
          <span
            onClick={() => setData({ rowName: "", rowValue: "" })}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-6 h-6 bg-danger "
          >
            <IoMdClose size={20} color="white" className=" text-white" />
          </span>
        </div>
        <span className=" font-inter! text-center mt-5! mb-2! inline-block text-[16px] leading-[140%] text-black ">
          {data.rowValue}
        </span>
      </div>
    </div>
  );
};

export default DetailModel;
