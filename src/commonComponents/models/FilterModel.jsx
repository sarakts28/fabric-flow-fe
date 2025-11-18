import React from "react";
import { Dropdown } from "../DropdownInput";
import { IoMdClose } from "react-icons/io";

const FilterModel = ({ filterData, setFilterData, onFilter, onClose }) => {
  const updateField = (field, value) => {
    setFilterData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="px-2! sm:px-0! absolute top-0 left-0 right-0 bottom-0 z-9999999999! w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center ">
      <div className="  max-w-[480px] rounded-xl w-full bg-white p-7! ">
        <div className="w-full flex  justify-between">
          <h2 className=" text-black text-[24px]   font-medium leading-[100%]  ">
            Filter
          </h2>
          <span
            onClick={() => onClose()}
            className=" text-white  flex justify-center items-center rounded-full cursor-pointer w-8 h-8 bg-danger "
          >
            <IoMdClose size={24} color="white" className=" text-white" />
          </span>
        </div>
        <div className="grid grid-col-1 gap-10 mt-6!">
          <Dropdown
            label="Category Type"
            options={["Type 1", "Type 2", "Type 3"]}
            value={filterData.categoryType}
            onChange={(v) => updateField("categoryType", v)}
          />
          <Dropdown
            label="Fabric Type"
            options={["stitch", "unstitch"]}
            value={filterData.fabricType}
            onChange={(v) => updateField("fabricType", v)}
          />
          <div>
            <label className="block mb-2! text-gray-600 text-sm">
              Articile Code
            </label>
            <input
              placeholder="--"
              type="text"
              className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3!"
              value={filterData.articileCode}
              onChange={(e) => updateField("articileCode", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => onFilter()}
            className=" mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            Filter
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModel;
