import React from "react";
import useScreenSize from "../../../hooks/useScreenResize";

const Container = ({ children }) => {
  const { width } = useScreenSize();
  return (
    <div
      className={`${
        width < 768 ? "pl-[70px]!" : ""
      } bg-pages-background flex-1 w-full  overflow-auto h-full `}
    >
      {children}
    </div>
  );
};

export default Container;
