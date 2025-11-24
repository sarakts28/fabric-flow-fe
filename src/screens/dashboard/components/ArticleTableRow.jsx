import React, { useEffect } from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { IoPrintOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { isRoleAllowed } from "../../../lib/isAllowedRoles";

const ArticleTableRow = ({
  rows,
  className,
  onDelete,
  onEdit,
  setRowView,
  setImages,
  setImagesModelOpen,
}) => {
  const { userDetail } = useSelector((state) => state.auth);

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
        {row.articleName}
      </td>

      <td
        onClick={() => {
          setRowView({
            rowName: "Article Description",
            rowValue: row.articleDescription,
          });
        }}
        className="text-center text-[14px]! text-black p-2! cursor-pointer  truncate"
      >
        {row.articleDescription}
      </td>

      <td
        onClick={() => {
          setImages(row.images);
          setImagesModelOpen(true);
        }}
        className="text-center text-[14px]! text-black p-2! cursor-pointer"
      >
        <div className="relative w-14 h-14 mx-auto! flex items-center justify-center">
          {row.images?.slice(0, 3).map((imgSrc, index) => {
            const positions = [
              "z-30 rotate-0", // middle (main)
              "z-20 rotate-6", // right tilt
              "z-10 -rotate-6", // left tilt
            ];

            const offsets = [
              "left-1/2 -translate-x-1/2", // center
              "left-3/4 -translate-x-1/2", // slight right
              "left-1/4 -translate-x-1/2", // slight left
            ];

            return (
              <img
                key={index}
                src={imgSrc}
                alt={`Article ${row.articleNo} - Image`}
                className={`
          absolute w-10 h-10 object-cover rounded-md shadow 
          ${positions[index]} 
          ${offsets[index]}
        `}
              />
            );
          })}
        </div>
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.categoryType}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.fabricType}
      </td>

      <td className="text-center text-[14px]! text-black p-2! cursor-pointer">
        {row.measurementType}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.totalQuantity}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">
        {row.designerName}
      </td>

      <td className="text-center text-[14px]! text-black p-2!">{row.price}</td>

      <td className="text-center text-[14px]! text-black p-2!">{row.status}</td>

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
  ));
};

export default ArticleTableRow;
