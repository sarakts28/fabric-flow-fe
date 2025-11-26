import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";

function ImageUploader({ images, setImages }) {
  const [dragActive, setDragActive] = useState(false);

  // Handle input select
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previewFiles]);
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previewFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-5! cursor-pointer transition-all 
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
      >
        <label className="w-full h-full flex flex-col justify-center items-center text-center cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />

          <LuImagePlus size={36} className="text-gray-500 mb-2" />
          <p className="text-gray-600 text-sm">
            Click or drag images here to upload
          </p>
        </label>
      </div>

      {/* Preview Area */}
      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4!">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl border border-gray-200"
            >
              <img
                src={img.preview || img.url}
                alt="preview"
                className="w-full h-28 object-cover transition-all group-hover:scale-105"
              />

              {/* Remove Btn */}
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5! text-xs opacity-0 group-hover:opacity-100 transition"
              >
                <IoMdClose size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-2!">No images uploaded yet.</p>
      )}
    </div>
  );
}

export default ImageUploader;
