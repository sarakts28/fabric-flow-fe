import React, { useEffect } from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { IoPrintOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { isRoleAllowed } from "../../../lib/isAllowedRoles";
import ButtonLoader from "../../../commonComponents/loader/ButtonLoader";
import { MdCopyAll } from "react-icons/md";
import { copyToClipboard, formatDate } from "../../../lib/utilityFn";
const ArticlePlanningTableRow = ({
  className,
  onDelete,
  onEdit,
  setOrderSlip,
  setStatus,
}) => {
  const { userDetail } = useSelector((state) => state.auth);
  const { list: rows, loading } = useSelector((state) => state.articlePlanning);

  if (loading.list) {
    return (
      <TableRow>
        <td colSpan={5} className="text-center p-2">
          <div className="w-full flex justify-center items-center">
            <ButtonLoader size="w-10 h-10" color="border-black" />
          </div>
        </td>
      </TableRow>
    );
  }

  return rows?.length > 0 ? (
    rows.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        className={`${className} `}
        isEven={rowIndex % 2 === 0}
      >
        <td className="text-center text-[14px]! text-black p-2!">
          {row.planningName}
        </td>

        <td className="text-center text-[14px]! text-black p-2! cursor-pointer text-wrap truncate">
          <span
            onClick={() => copyToClipboard(row.article_id)}
            className="px-2 cursor-pointer py-1 bg-gray-100 rounded text-gray-700 text-xs truncate"
          >
            {row.article_id}
          </span>
        </td>

        <td className="text-center text-[14px]! text-black p-2! cursor-pointer text-wrap truncate  ">
          <span
            onClick={() => copyToClipboard(row.planningRoute_id)}
            className="px-2 cursor-pointer py-1 bg-gray-100 rounded text-gray-700 text-xs truncate"
          >
            {row.planningRoute_id}
          </span>
        </td>

        <td
          onClick={() => {
            setStatus({
              id: row._id,
              status: row.status,
              isModelOpen: true,
            });
          }}
          className="text-center text-[14px]! text-black p-2!"
        >
          <span
            title="Click to update status"
            className="px-2! py-1! rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer"
          >
            {row.status}
          </span>
        </td>

        <td className="text-center text-[14px]! text-black p-2!">
          {row.late ? (
            <span className="px-2! py-1!  text-red-700 rounded">Late</span>
          ) : (
            <span className="px-2! py-1!  text-green-700 rounded">On Time</span>
          )}
        </td>
        <td
          onClick={() => {
            setOrderSlip({
              id: row._id,
              order_slip: row.order_slip,
              isModelOpen: true,
            });
          }}
          className="text-center text-[14px]! text-black p-2!"
        >
          <span
            className="px-2! py-1! rounded-full bg-green-100 text-green-700 
             hover:bg-green-200 transition cursor-pointer"
            onClick={() => openOrderSlipPopup(row)}
            title="Click to update order slip"
          >
            {row.order_slip}
          </span>
        </td>
        <td className="text-center text-[14px]! text-black p-2!">
          {row.process_days}
        </td>
        <td className="text-center text-[14px]! text-black p-2!">
          {row.total_payment}
        </td>
        <td className="text-center text-[14px]! text-black p-2!">
          {formatDate(row.when_process_start)}
        </td>
        <td className="text-center text-[14px]! text-black p-2!">
          {formatDate(row.when_process_end)}
        </td>
        {/* ACTIONS */}
        <td className="text-center text-[14px]! text-black p-2! flex items-center justify-center gap-3">
          <span
            className=" text-black cursor-pointer"
            onClick={() => {
              onDelete(row);
            }}
          >
            <DeleteIcon size={18} />{" "}
          </span>

          {isRoleAllowed(["admin"], userDetail.user.userType) && (
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
    ))
  ) : (
    <TableRow>
      <td colSpan={5} className="text-center text-[14px]! text-black p-2!">
        No Data Found
      </td>
    </TableRow>
  );
};

export default ArticlePlanningTableRow;
