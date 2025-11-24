import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
const Toast = ({ message, isOpen, onClose, onClick, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className=" absolute flex overflow-hidden  justify-end top-0 left-0 ring-0 bottom-0 z-99999999999 w-full h-full  pt-4! pr-4! ">
      <div
        className={` ${
          isOpen ? "animate-toast-in" : "animate-toast-out"
        }    shrink-0 h-fit  flex gap-2.5   rounded-2xl bg-white items-center justify-end    shadow-toast  s py-3! px-4!`}
      >
        <span className=" font-inter! text-[16px] leading-[140%] text-black ">
          {message}
        </span>
        {type === "Action Toast" ? (
          <button
            onClick={() => onClick()}
            className="bg-[#f2f2f2] cursor-pointer font-inter! leading-6 font-medium text-[16px] rounded-xl px-6! py-2! text-black "
          >
            Undo
          </button>
        ) : (
          <div className=" w-6 h-6 flex cursor-pointer justify-center items-center bg-[#e5e5e5] rounded-full">
            <IoCloseOutline
              onClick={onClose}
              className=" text-black text-[20px] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;
