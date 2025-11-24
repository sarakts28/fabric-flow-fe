import React, { useEffect } from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { IoPrintOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { isRoleAllowed } from "../../../lib/isAllowedRoles";

const ArticlePlanningTableRow = ({ rows, className, onDelete, onEdit }) => {
  const { userDetail } = useSelector((state) => state.auth);

  return rows.map((row, rowIndex) => (
    <TableRow
      key={rowIndex}
      className={`${className} `}
      isEven={rowIndex % 2 === 0}
    >
      <td className="text-center text-[14px]! text-black p-2!">
        {row.articleName}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.routeName}
      </td>

      <td className="text-center text-[14px]! text-black p-2! cursor-pointer  truncate">
        {row.totalPayment}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.whenProcessEnd}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.whenProcessStart}
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

        {row.action.edit &&
          isRoleAllowed(["admin"], userDetail.user.userType) && (
            <span
              className=" text-black cursor-pointer"
              onClick={() => {
                onEdit(row);
              }}
            >
              <EditIcon size={14} />
            </span>
          )}
        {/* <span
          className=" text-black cursor-pointer"
          onClick={() => {
            console.log("print article", row);
          }}
        >
          <IoPrintOutline size={20} />
        </span> */}
      </td>
    </TableRow>
  ));
};

export default ArticlePlanningTableRow;
