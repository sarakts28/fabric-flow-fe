import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "../DropdownInput";
import InputField from "../InputField";
import { allCategoriesThunk } from "../../redux/thunk/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { ARTICLE_ENUM_VALUES } from "../../constants/enum_constant";
import ButtonLoader from "../loader/ButtonLoader";
const CreateArticileModel = ({ formData, setFormData, onClose, onSave }) => {
  const { allCategories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.article);

  const dispatch = useDispatch();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    dispatch(allCategoriesThunk());
  }, []);

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
          <InputField
            label="Article No"
            name="article_no"
            placeholder="--"
            value={formData.article_no}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Article Name"
            name="article_name"
            placeholder="--"
            value={formData.article_name}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Article Description"
            name="article_description"
            placeholder="--"
            value={formData.article_description}
            onChange={updateField}
            type="text"
          />

          <Dropdown
            label="Category Id"
            options={allCategories.map((c) => ({
              label: c.category_name,
              value: c._id,
            }))}
            value={formData.category_id}
            onChange={(v) => updateField("category_id", v)}
          />

          <Dropdown
            label="Fabric Type"
            options={ARTICLE_ENUM_VALUES.FABRIC_TYPES}
            value={formData.fabric_type}
            onChange={(v) => updateField("fabric_type", v)}
          />

          <Dropdown
            label="Measurement Type"
            options={ARTICLE_ENUM_VALUES.MEASUREMENT_TYPES}
            value={formData.measurement_type}
            onChange={(v) => updateField("measurement_type", v)}
          />

          <Dropdown
            label="Status"
            options={ARTICLE_ENUM_VALUES.STATUS_TYPES}
            value={formData.status}
            onChange={(v) => updateField("status", v)}
          />

          <InputField
            label="Total Quantity"
            name="total_quantity"
            placeholder="--"
            value={formData.total_quantity}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Designer Name"
            name="designer_name"
            placeholder="--"
            value={formData.designer_name}
            onChange={updateField}
            type="text"
          />

          <div className="relative">
            <label className="block mb-2! text-gray-600 text-sm">Price</label>

            <span className="absolute text-[18px] left-4 top-[66%] -translate-y-1/2 text-black">
              RS
            </span>

            <input
              placeholder="--"
              type="number"
              className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3! pl-12!"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            disabled={loading.create}
            onClick={() => onSave()}
            className=" mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            {loading.create ? <ButtonLoader /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArticileModel;
