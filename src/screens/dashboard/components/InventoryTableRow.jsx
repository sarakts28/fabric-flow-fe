import React from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import { IoMdAdd } from "react-icons/io";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
const InventoryTableRow = ({ rows, className, onDelete, onEdit }) => {
  return rows.map((row, rowIndex) => (
    <TableRow
      key={rowIndex}
      className={`${className} `}
      isEven={rowIndex % 2 === 0}
    >
      <td className="text-center text-[14px]! text-black p-2!">
        {row.articleNo}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.routeId}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.processingDays}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">{row.status}</td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.dueDate}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.createDate}
      </td>

      <td className="text-center text-[14px]! text-black p-2! cursor-pointer">
        <span className=" text-white text-[14px] inline-flex  justify-center items-center w-6 h-6 rounded-full bg-base-background ">
          <IoMdAdd size={14} color="#fff" className="text-white" />
        </span>
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.clientId}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">{row.total}</td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.packingType}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.quantity}
      </td>

      {/* ACTIONS */}
      <td className="text-center text-[14px]! text-black p-2! flex items-center justify-center gap-3">
        {row.action.delete && (
          <span
            className=" text-black cursor-pointer"
            onClick={() => {
              onDelete(row);
            }}
          >
            <DeleteIcon size={18} />{" "}
          </span>
        )}

        {row.action.edit && (
          <span
            className=" text-black cursor-pointer"
            onClick={() => {
              onEdit(row);
            }}
          >
            <EditIcon size={14} />
          </span>
        )}
      </td>
    </TableRow>
  ));
};

export default InventoryTableRow;
