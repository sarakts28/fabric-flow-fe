// components/ButtonLoader.jsx
import React from "react";

const ButtonLoader = ({ color, size }) => {
  return (
    <div
      className={`${size ? size : "w-6 h-6"} border-2 ${
        color ? color : "border-white"
      }  border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default ButtonLoader;
