import React, { useEffect } from "react";
import TableRow from "../../../commonComponents/table/TableRow";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { useSelector } from "react-redux";
import { isRoleAllowed } from "../../../lib/isAllowedRoles";
import ButtonLoader from "../../../commonComponents/loader/ButtonLoader";
import { CiImageOn } from "react-icons/ci";
const ArticleTableRow = ({
  className,
  onDelete,
  onEdit,
  setRowView,
  setImages,
  setImagesModelOpen,
}) => {
  const { userDetail } = useSelector((state) => state.auth);
  const { list: rows, loading } = useSelector((state) => state.article);

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
    rows.map((row, rowIndex) => {
      const info = row.article_info ?? row; // normalize object
      const images = info.article_images ?? [];

      return (
        <TableRow
          key={rowIndex}
          className={className}
          isEven={rowIndex % 2 === 0}
        >
          <td className="text-center text-[14px]! text-black p-2!">
            {info.article_no}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.article_name}
          </td>

          <td
            onClick={() =>
              setRowView({
                rowName: "Article Description",
                rowValue: info.article_description,
              })
            }
            className="text-center  text-[14px]! text-black p-2! cursor-pointer truncate"
          >
            {info.article_description}
          </td>

          <td
            onClick={() => {
              if (!images.length) return;
              setImages(images);
              setImagesModelOpen(true);
            }}
            className="text-center text-[14px]! flex  justify-center text-black p-2! cursor-pointer"
          >
            <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
              {images.length > 0 ? (
                images.slice(0, 3).map((imgSrc, index) => {
                  const positions = [
                    "z-30 rotate-0",
                    "z-20 rotate-6",
                    "z-10 -rotate-6",
                  ];
                  const offsets = [
                    "left-1/2 -translate-x-1/2",
                    "left-3/4 -translate-x-1/2",
                    "left-1/4 -translate-x-1/2",
                  ];

                  return (
                    <img
                      key={index}
                      src={
                        imgSrc.url.includes("http://localhost:5000")
                          ? imgSrc.url
                          : `http://localhost:5000${imgSrc.url}`
                      }
                      alt={`Article ${info.article_no} - Image`}
                      className={`absolute w-10 h-10 object-cover rounded-md shadow ${positions[index]} ${offsets[index]}`}
                    />
                  );
                })
              ) : (
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute w-10 h-10 bg-gray-300 rounded-md shadow -rotate-6 z-10 left-1/4 -translate-x-1/2"></div>
                  <div className="absolute w-10 h-10 flex justify-center items-center bg-gray-400 rounded-md shadow rotate-0 z-30 left-1/2 -translate-x-1/2">
                    <CiImageOn size={24} className="text-white" />
                  </div>
                  <div className="absolute w-10 h-10 bg-gray-200 rounded-md shadow rotate-6 z-20 left-3/4 -translate-x-1/2"></div>
                </div>
              )}
            </div>
          </td>

          <td
            className={`text-center select-none text-[14px] p-2! font-bold cursor-pointer underline ${
              info.active_status ? "text-green-500" : "text-danger"
            }`}
          >
            {info.active_status ? "Active" : "Inactive"}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.fabric_type}
          </td>

          <td className="text-center text-[14px]! text-black p-2! cursor-pointer">
            {info.measurement_type}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.total_quantity}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.designer_name}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.total_stores_assigned}
          </td>
          <td className="text-center text-[14px]! text-black p-2!">
            {info.total_quantity_dispatched}
          </td>
          <td className="text-center text-[14px]! text-black p-2!">
            {info.price}
          </td>

          <td className="text-center text-[14px]! text-black p-2!">
            {info.status}
          </td>

          <td className="text-center text-[14px]! text-black p-2!  gap-3">
            <div className="flex items-center justify-center gap-3">
              <span
                className="text-black cursor-pointer"
                onClick={() => onDelete(info)}
              >
                <DeleteIcon size={18} />
              </span>

              {isRoleAllowed(["admin"], userDetail.user.userType) && (
                <span
                  className="text-black cursor-pointer"
                  onClick={() => onEdit(info)}
                >
                  <EditIcon size={14} />
                </span>
              )}
            </div>
          </td>
        </TableRow>
      );
    })
  ) : (
    <TableRow>
      <td colSpan={5} className="text-center text-[14px]! text-black p-2!">
        No Data Found
      </td>
    </TableRow>
  );
};

export default ArticleTableRow;
