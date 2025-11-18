import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
const SearchField = ({ className, value, setValue, onSearch }) => {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <div
      className={`${className} min-w-[150px] w-full bg-white rounded-[38px] px-5!`}
    >
      <div className=" flex items-center justify-start">
        <CiSearch className="text-[20px]  text-black mr-2!" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="w-full  py-3! outline-none border-none text-[15px] placeholder:text-[15px] text-black placeholder:text-black"
        />
      </div>
    </div>
  );
};

export default SearchField;
