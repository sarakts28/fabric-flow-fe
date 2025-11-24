import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "../DropdownInput";
import InputField from "../InputField";
const UpdateArticilePlanningModel = ({
  formData,
  setFormData,
  onClose,
  onUpdate,
}) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className=" h-full sm:h-auto sm:max-w-[930px] sm:rounded-xl w-full bg-white sm:p-7! p-3! ">
        <div className="w-full flex  justify-between">
          <h2 className=" text-black text-[24px] sm:text-[32px]  font-medium leading-[100%]  ">
            Update Article
          </h2>
          <span
            onClick={() => onClose()}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-8 h-8 bg-danger "
          >
            <IoMdClose size={24} color="white" className=" text-white" />
          </span>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-5 sm:gap-10 w-full mt-6!">
          <InputField
            label="Article Name"
            name="articleName"
            placeholder="--"
            value={formData.articleName}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Route Name"
            name="routeName"
            placeholder="--"
            value={formData.routeName}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Total Payment"
            name="totalPayment"
            placeholder="--"
            value={formData.totalPayment}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Process Start"
            name="whenProcessStart"
            placeholder="DD/MM/YYYY"
            value={formData.whenProcessStart}
            onChange={updateField}
            type="date-mask"
          />

          <InputField
            label="Process End"
            name="whenProcessEnd"
            placeholder="DD/MM/YYYY"
            value={formData.whenProcessEnd}
            onChange={updateField}
            type="date-mask"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => onUpdate()}
            className=" mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticilePlanningModel;
