import React from "react";
import { IoMdClose } from "react-icons/io";

const DeleteModel = ({ cancel, OnDelete }) => {
  return (
    <div className="px-2! sm:px-0 absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className="p-2! bg-white max-w-[640px] w-full rounded-2xl">
        <div className=" flex justify-end">
          <span
            onClick={() => cancel()}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-6 h-6 bg-danger "
          >
            <IoMdClose size={20} color="white" className=" text-white" />
          </span>
        </div>
        <div className="w-full px-2! pb-3.5! text-center">
          <span className=" font-inter!  font-semibold text-[24px] leading-[100%] ">
            Are you sure you want to delete?
          </span>
          <div className="mt-4! w-full flex justify-between gap-3 items-center ">
            <button
              onClick={() => cancel()}
              className=" cursor-pointer w-full py-3.5! px-5! bg-white  rounded-lg text-black font-medium text-[16px] border border-black "
            >
              No
            </button>
            <button
              onClick={() => OnDelete()}
              className="cursor-pointer w-full py-3.5! px-5! bg-base-background rounded-lg text-white font-medium text-[16px] border border-base-background "
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
