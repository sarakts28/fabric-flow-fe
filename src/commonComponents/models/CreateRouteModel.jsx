import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "../DropdownInput";
import { planningRouteEnumValues } from "../../constants/enum_constant";
import { useSelector } from "react-redux";
import ButtonLoader from "../loader/ButtonLoader";
const CreateRouteModel = ({ formData, setFormData, onClose, onSave }) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { loading } = useSelector((state) => state.route);

  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className=" h-full sm:h-auto sm:max-w-[930px] sm:rounded-xl w-full bg-white sm:p-7! p-3! ">
        <div className="w-full flex  justify-between">
          <h2 className=" text-black text-[24px] sm:text-[32px]  font-medium leading-[100%]  ">
            Add New Route
          </h2>
          <span
            onClick={() => onClose()}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-8 h-8 bg-danger "
          >
            <IoMdClose size={24} color="white" className=" text-white" />
          </span>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-5 sm:gap-10 w-full mt-6!">
          <div>
            <label className="block mb-2! text-gray-600 text-sm">
              Route Name
            </label>
            <input
              placeholder="--"
              type="text"
              className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3!"
              value={formData.planning_route_name}
              onChange={(e) =>
                updateField("planning_route_name", e.target.value)
              }
            />
          </div>

          <Dropdown
            label="Route Type"
            options={planningRouteEnumValues.PLANNING_ROUTE_TYPES}
            value={formData.planning_route_type}
            onChange={(v) => updateField("planning_route_type", v)}
          />

          <div className="relative">
            <label className="block mb-2! text-gray-600 text-sm">
              Cost per Meter
            </label>

            <span className="absolute text-[18px] left-4 top-[66%] -translate-y-1/2 text-black">
              RS
            </span>

            <input
              placeholder="--"
              type="number"
              className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3! pl-12!"
              value={formData.cost_per_meter}
              onChange={(e) => updateField("cost_per_meter", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2! text-gray-600 text-sm">
              Lead Time (Days)
            </label>
            <input
              placeholder="--"
              type="text"
              className="border border-[#D0D5DD]  outline-none  w-full rounded-xl px-4! py-3!"
              value={formData.lead_time_days}
              onChange={(e) => updateField("lead_time_days", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            disabled={loading.create}
            onClick={() => onSave()}
            className=" flex justify-center items-center mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            {loading.create ? <ButtonLoader /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRouteModel;
