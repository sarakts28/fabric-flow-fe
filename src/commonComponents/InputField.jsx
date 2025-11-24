export default function InputField({
  label,
  value,
  name,
  onChange,
  type = "text",
  placeholder = "--",
}) {
  // Function to apply DD/MM/YYYY masking live
  const applyDateMask = (val) => {
    // Remove everything except numbers
    val = val.replace(/\D/g, "");

    // Insert "/" dynamically
    if (val.length > 2 && val.length <= 4) {
      val = val.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    } else if (val.length > 4) {
      val = val.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    }

    return val;
  };

  const handleChange = (e) => {
    let val = e.target.value;

    // Only mask when type is "date-mask"
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
        type="text" // Do NOT change — masked input needs text type
        value={value}
        onChange={handleChange}
        className="border border-[#D0D5DD] w-full outline-none rounded-xl px-4! py-3!"
      />
    </div>
  );
}
