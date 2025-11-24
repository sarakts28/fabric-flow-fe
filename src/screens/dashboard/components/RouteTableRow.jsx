import React, { useEffect } from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { IoPrintOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { isRoleAllowed } from "../../../lib/isAllowedRoles";
import ButtonLoader from "../../../commonComponents/loader/ButtonLoader";

const RouteTableRow = ({ className, onDelete, onEdit }) => {
  const { loading, list: rows } = useSelector((state) => state.route);

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

  return rows?.length && rows?.length > 0 ? (
    rows.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        className={`${className} `}
        isEven={rowIndex % 2 === 0}
      >
        <td className="text-center text-[14px]! text-black p-2!">
          {row.planning_route_name}
        </td>

        <td className="text-center text-[14px]! text-black p-2!">
          {row.planning_route_type}
        </td>

        <td className="text-center text-[14px]! text-black p-2!">
          {row.cost_per_meter}
        </td>

        <td className="text-center text-[14px]! text-black p-2!">
          {row.lead_time_days}
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

          <span
            className=" text-black cursor-pointer"
            onClick={() => {
              onEdit(row);
            }}
          >
            <EditIcon size={14} />
          </span>

          <span
            className=" text-black cursor-pointer"
            onClick={() => {
              console.log("print article", row);
            }}
          >
            <IoPrintOutline size={20} />
          </span>
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

export default RouteTableRow;
