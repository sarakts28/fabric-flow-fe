import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block mb-2! text-gray-600 text-sm">{label}</label>
      <div
        className="border border-[#D0D5DD] rounded-xl px-4! py-3! cursor-pointer bg-white flex justify-between items-center  transition"
        onClick={() => setOpen(!open)}
      >
        <span>
          {typeof value === "object" ? value.label : value || "Select"}
        </span>
        <span>
          <IoIosArrowDown />
        </span>
      </div>

      {open && (
        <ul className="absolute mt-2! w-full bg-white border border-[#D0D5DD] rounded-xl shadow-lg z-10 max-h-60 overflow-auto animate-fadeIn">
          {options.map((opt) => (
            <li
              key={opt.value || opt}
              onClick={() => {
                onChange(opt.value || opt);
                setOpen(false);
              }}
              className="px-4! py-3! hover:bg-gray-100 cursor-pointer"
            >
              {opt.label || opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
