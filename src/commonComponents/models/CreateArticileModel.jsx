import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "../DropdownInput";
const CreateArticileModel = ({ formData, setFormData, onClose, onSave }) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className=" h-full sm:h-auto sm:max-w-[930px] sm:rounded-xl w-full bg-white sm:p-7! p-3! ">
        <div className="w-full flex  justify-between">
          <h2 className=" text-black text-[24px] sm:text-[32px]  font-medium leading-[100%]  ">
            Add New Article
          </h2>
          <span
            onClick={() => onClose()}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-8 h-8 bg-danger "
          >
            <IoMdClose size={24} color="white" className=" text-white" />
          </span>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-5 sm:gap-10 w-full mt-6!">
          <Dropdown
            label="Article Selection"
            options={[
              "Unique Identifier for Article",
              "Article A",
              "Article B",
            ]}
            value={formData.article}
            onChange={(v) => updateField("article", v)}
          />

          <Dropdown
            label="Order Type"
            options={["Own", "Client"]}
            value={formData.orderType}
            onChange={(v) => updateField("orderType", v)}
          />

          <Dropdown
            label="Client"
            options={["Client 1", "Client 2", "Client 3"]}
            value={formData.client}
            onChange={(v) => updateField("client", v)}
          />

          <Dropdown
            label="Route"
            options={["Route A", "Route B", "Route C"]}
            value={formData.route}
            onChange={(v) => updateField("route", v)}
          />

          <div>
            <label className="block mb-2! text-gray-600 text-sm">
              Total Fabric
            </label>
            <input
              placeholder="--"
              type="text"
              className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3!"
              value={formData.fabric}
              onChange={(e) => updateField("fabric", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2! text-gray-600 text-sm">
              Cost of Task
            </label>
            <input
              placeholder="--"
              type="text"
              className="border border-[#D0D5DD]  outline-none  w-full rounded-xl px-4! py-3!"
              value={formData.cost}
              onChange={(e) => updateField("cost", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => onSave()}
            className=" mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticileModel;
