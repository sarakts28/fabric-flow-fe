import React from "react";

const Table = ({ tableClassName, tableHeader, tableData }) => {
  return (
    <div className={`w-full `}>
      <div className=" overflow-hidden  overflow-x-auto   w-full">
        <table className={` bg-white w-full h-full  ${tableClassName}`}>
          <thead className=" block">
            <tr className=" table-fixed table w-full">
              {tableHeader &&
                tableHeader.map((header, index) => (
                  <th
                    key={index}
                    className="text-center  h-[50px] text-[13px]! text-black font-bold!"
                  >
                    {header.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="max-h-[500px] overflow-y-auto block">
            {tableData}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
