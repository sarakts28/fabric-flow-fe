import React from "react";
import { Dropdown } from "../DropdownInput";
import { IoMdClose } from "react-icons/io";
import InputField from "../InputField";
import { ARTICLE_ENUM_VALUES } from "../../constants/enum_constant";

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
          <InputField
            label="Article No"
            name="article_no"
            placeholder="--"
            value={filterData.article_no}
            onChange={updateField}
            type="text"
          />
          <Dropdown
            label="Fabric Type"
            options={ARTICLE_ENUM_VALUES.FABRIC_TYPES}
            value={filterData.fabric_type}
            onChange={(v) => updateField("fabric_type", v)}
          />
          <Dropdown
            label="Status"
            options={ARTICLE_ENUM_VALUES.STATUS_TYPES}
            value={filterData.status}
            onChange={(v) => updateField("status", v)}
          />
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
