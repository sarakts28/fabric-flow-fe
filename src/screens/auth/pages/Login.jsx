import React, { useEffect, useState } from "react";
import IMAGE from "../../../constants/Images";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../../redux/thunk/authThunk";
import Toast from "../../../commonComponents/Toast";
import useAuth from "../../../hooks/useAuth";
import ButtonLoader from "../../../commonComponents/loader/ButtonLoader";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(message);
  }, [message]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    dispatch(loginUserThunk(data))
      .unwrap()
      .then(() => {
        setMessage("Login successfully!");
        setIsModelOpen(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        setMessage(error);
        setIsModelOpen(true);
      });
  };

  return (
    <>
      <div className="w-full h-full  bg-auth-background overflow-hidden">
        <div className="w-full h-full relative ">
          {/* Auth Background Bubble Decoration Image Adjustment */}

          <div className=" absolute top-0 left-0 bottom-0 right-0 w-full pointer-events-none select-none h-full flex justify-end">
            <img
              src={IMAGE.BUBBLES_IMAGE}
              alt="Auth Background Bubble Decoration"
              className=" max-h-[18%]  sm:max-h-[30%] h-full pointer-events-none select-none"
            />
          </div>
          {/* Auth Form Container */}
          <div className="w-full   ">
            <img
              src={IMAGE.LOGO}
              alt="Logo"
              className="w-[150px]  sm:w-auto  mx-auto! pt-30! sm:pt-12!"
            />
          </div>
          <div className="  w-full  mt-2.5!  sm:mt-[45px]! ">
            <div className=" container px-4! py-2! mx-auto! text-center">
              <div className="max-w-[500px] text-left w-full mx-auto! ">
                <h4 className=" font-medium  sm:mb-15! text-[25px] sm:text-[32px] leading-[100%] text-[#333333]">
                  Sign in
                </h4>
                <form className="mt-6! w-full">
                  <Input
                    value={data.identifier}
                    onChnage={handlechange}
                    placeHolderName={"Email address"}
                    name={"email"}
                    isPasswordType={false}
                  />
                  <Input
                    value={data.password}
                    onChnage={handlechange}
                    placeHolderName={"Your password"}
                    name={"password"}
                    isPasswordType={true}
                  />
                  {/* <Link
                    to={"/forget-password"}
                    className=" text-[15px] inline-block text-[#111111] w-full text-right  underline"
                  >
                    Forget your password
                  </Link> */}
                </form>
                <div className=" mt-6! w-full text-center ">
                  <button
                    disabled={loading}
                    onClick={handleSignIn}
                    className=" w-full inline-flex justify-center cursor-pointer bg-base-background  text-center  py-3! rounded-4xl  font-normal max-w-[300px] text-[16px] hover:opacity-90 duration-200 text-black"
                  >
                    {loading ? <ButtonLoader /> : "Sign In"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModelOpen && message !== "" && (
        <Toast
          message={message}
          onClose={() => {
            setIsModelOpen(false);
            setMessage("");
          }}
          isOpen={isModelOpen}
        />
      )}
    </>
  );
};

export default Login;
