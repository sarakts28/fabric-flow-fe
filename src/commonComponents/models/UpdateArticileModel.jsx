import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "../DropdownInput";
import ImageUploader from "../ImageUploader";
import { ARTICLE_ENUM_VALUES } from "../../constants/enum_constant";
import InputField from "../InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateArticleThunk } from "../../redux/thunk/articleThunk";
import ButtonLoader from "../loader/ButtonLoader";
import Switch from "../Switch";
const UpdateArticileModel = ({ formData, setFormData, onClose, onUpdate }) => {
  const { loading } = useSelector((state) => state.article);
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const dispatch = useDispatch();
  const [images, setImages] = useState(formData.article_images || []);

  const onSave = () => {
    const fd = new FormData();

    fd.append("status", formData.status);
    fd.append("active_status", formData.active_status);
    fd.append("total_stores_assigned", formData.total_stores_assigned);
    fd.append("total_quantity_dispatched", formData.total_quantity_dispatched);

    images.forEach((imgObj) => {
      if (imgObj.file === undefined) return;
      fd.append("article_images", imgObj.file);
    });

    onUpdate(formData._id, fd);
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
        <div className="w-full flex justify-center items-center my-5!">
          <ImageUploader images={images} setImages={setImages} />
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-5 sm:gap-10 w-full mt-6!">
          <Dropdown
            label="Status"
            options={ARTICLE_ENUM_VALUES.STATUS_TYPES}
            value={formData.status}
            onChange={(v) => updateField("status", v)}
          />
          <Switch
            label="Active Status"
            value={formData.active_status}
            onChange={(v) => updateField("active_status", v)}
          />

          <InputField
            label="Store Assigned"
            name="total_stores_assigned"
            placeholder="--"
            value={formData.total_stores_assigned}
            onChange={updateField}
            type="text"
          />

          <InputField
            label="Quantity Dispatched"
            name="total_quantity_dispatched"
            placeholder="--"
            value={formData.total_quantity_dispatched}
            onChange={updateField}
            type="text"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => onSave()}
            className=" mt-6! text-center max-w-[132px] w-full bg-base-background text-white text-[16px] leading-[100%] py-3.5! px-[18px]! cursor-pointer rounded-[43px] "
          >
            {loading.update ? <ButtonLoader /> : "Update"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticileModel;
