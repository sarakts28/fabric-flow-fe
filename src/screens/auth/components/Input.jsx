import React from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
const Input = ({
  value,
  onChnage,
  className,
  placeHolderName,
  name,
  isPasswordType,
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div className={`w-full ${className} mb-4!`}>
      <div className="w-full flex justify-between items-center mb-2!">
        <span className="font-normal text-[14px] sm:text-[16px] text-[#666666] leading-[100%]">
          {placeHolderName}
        </span>

        {isPasswordType && (
          <span
            className="font-normal text-[14px] text-[#666666CC] cursor-pointer select-none"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <AiOutlineEye className="inline-block mr-1!" />
            ) : (
              <AiOutlineEyeInvisible className="inline-block mr-1!" />
            )}
            {passwordVisible ? "Hide" : "Show"}
          </span>
        )}
      </div>

      <input
        type={isPasswordType ? (passwordVisible ? "text" : "password") : "text"}
        autoComplete={isPasswordType ? "new-password" : undefined}
        autoCorrect={isPasswordType ? "off" : undefined}
        autoCapitalize={isPasswordType ? "off" : undefined}
        spellCheck={isPasswordType ? "false" : undefined}
        name={name}
        value={value}
        onChange={onChnage}
        className=" w-full h-[45px] sm:h-[50px] border border-[rgba(102,102,102,0.35)] rounded-xl px-4! text-[16px] font-normal text-[#333333] placeholder:text-[#999999] outline-none focus:border-[#666666] transition-all duration-200"
      />
    </div>
  );
};

export default Input;
