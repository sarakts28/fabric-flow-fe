export default function InputField({
  label,
  value,
  name,
  onChange,
  type = "text",
  placeholder = "--",
}) {
  // Function to apply YYYY-MM-DD masking live
  const applyDateMask = (val) => {
    val = val.replace(/\D/g, "");

    if (val.length > 4 && val.length <= 6) {
      val = val.replace(/(\d{4})(\d{1,2})/, "$1-$2");
    } else if (val.length > 6) {
      val = val.replace(/(\d{4})(\d{2})(\d{1,2})/, "$1-$2-$3");
    }

    return val;
  };

  const handleChange = (e) => {
    let val = e.target.value;

    if (type === "date-mask") {
      val = applyDateMask(val);
    }

    onChange(name, val);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2! text-gray-600 text-sm">{label}</label>
      )}

      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3!"
      />
    </div>
  );
}
