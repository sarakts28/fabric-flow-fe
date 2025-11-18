import React from "react";

const TableRow = ({ children, isEven, className }) => {
  return (
    <tr
      className={`${className} table w-full table-fixed [&>td]:h-16 [&>td]:p-2  min-h-16! ${
        isEven ? "bg-table-background" : " "
      }`}
    >
      {children}
    </tr>
  );
};

export default TableRow;
