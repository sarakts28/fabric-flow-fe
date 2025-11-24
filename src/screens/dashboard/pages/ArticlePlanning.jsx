import React, { useState } from "react";
import Container from "../components/Container";
import SearchField from "../../../commonComponents/SearchField";
import { VscSettings } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import Table from "../../../commonComponents/table/Table";
import CreateArticileModel from "../../../commonComponents/models/CreateArticileModel";
import UpdateArticileModel from "../../../commonComponents/models/UpdateArticileModel";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import FilterModel from "../../../commonComponents/models/FilterModel";
import Toast from "../../../commonComponents/Toast";
import DetailModel from "../../../commonComponents/models/DetailModel";
import ImagesModel from "../../../commonComponents/models/ImagesModel";
import ArticlePlanningTableRow from "../components/ArticlePlanningTableRow";
import { ARTICLES_PLANNING_TABLE_HEADERS } from "../../../constants/table_headers";
import CreateArticilePlanningModel from "../../../commonComponents/models/CreateArticilePlanningModel";
import UpdateArticilePlanningModel from "../../../commonComponents/models/UpdateArticilePlanningModel";
const ArticlePlanning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addNewArticleModalOpen, setAddNewArticleModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [imagesModelOpen, setImagesModelOpen] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [rows, setRows] = useState([
    {
      id: 1,
      articleName: "Article A",
      routeName: "Route 1",
      totalPayment: 400,
      whenProcessStart: "2025-01-01",
      whenProcessEnd: "2025-01-05",
      action: { edit: true, delete: true },
    },
  ]);

  const [formData, setFormData] = useState({
    articleName: "",
    routeName: "",
    totalPayment: "",
    whenProcessStart: "",
    whenProcessEnd: "",
  });
  const [filterData, setFilterData] = useState({
    categoryType: "",
    fabricType: "",
    articileCode: "",
  });

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleArticileSave = () => {
    logConsole.log("Article saved:", formData);
  };

  const handleArticileUpdate = () => {
    logConsole.log("Article updated:", formData);
  };

  const handleDelete = () => {
    console.log("Deleting row:", rowToDelete);
    setDeleteModalOpen(false);
    setRowToDelete(null);
    setToastMessage({
      message: "Item Deleted Successfully",
      type: "Action Toast",
    });
  };

  const handleUndoDelete = () => {
    console.log("Undo delete action");
    setToastMessage({
      message: "Deleted item recovered successfully",
      type: "",
    });
  };

  const hanldeFilterData = () => {
    console.log("Filtering with:", filterData);
    setFilterModalOpen(false);
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(), // unique id
      ...formData,
      action: { edit: true, delete: true },
    };

    setRows((prev) => [...prev, newRow]);
    resetForm();
    setAddNewArticleModalOpen(false);
  };

  const onDelete = (row) => {
    const updated = rows.filter((item) => item.id !== row.id);
    setRows(updated);
  };

  const onEdit = (row) => {
    setEditRowId(row.id);
    setFormData({
      articleName: row.articleName,
      routeName: row.routeName,
      totalPayment: row.totalPayment,
      whenProcessStart: row.whenProcessStart,
      whenProcessEnd: row.whenProcessEnd,
    });
  };

  const saveUpdatedRow = () => {
    const updatedRows = rows.map((row) =>
      row.id === editRowId ? { ...row, ...formData } : row
    );

    setRows(updatedRows);
    setEditRowId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      articleName: "",
      routeName: "",
      totalPayment: "",
      whenProcessStart: "",
      whenProcessEnd: "",
    });
  };

  return (
    <>
      <Container>
        <div className="w-full h-full p-3! sm:p-7!">
          {/* -------------------------------------- */}
          <div className="w-full flex  flex-wrap sm:flex-nowrap justify-between sm:justify-center gap-3.5 items-center">
            {/* Search Field */}
            <SearchField
              value={searchQuery}
              setValue={setSearchQuery}
              onSearch={handleSearch}
            />
            {/* Filters Icon */}
            <div
              onClick={() => setFilterModalOpen(true)}
              className=" w-[45px] h-[45px] flex justify-center cursor-pointer items-center rounded-sm hover:bg-gray-200"
            >
              <VscSettings size={32} className="cursor-pointer" />
            </div>
            {/* Create Button */}
            <div>
              <div
                onClick={() => setAddNewArticleModalOpen(true)}
                className=" flex justify-center items-center bg-base-background text-white text-[16px] leading-[100%] py-2.5! px-4! cursor-pointer rounded-[67px] "
              >
                <CiCirclePlus
                  size={24}
                  className="cursor-pointer text-white mr-2!"
                />
                Create
              </div>
            </div>
          </div>
          {/* -------------------------------------- */}
          <div className="mt-5!">
            <h4 className=" text-[24px] sm:text-[36px]   leading-[140%] font-medium text-black ">
              Articles Planning
            </h4>
          </div>
          {/* -------------------------------------- */}
          <div className=" flex justify-end">
            <div className=" flex justify-center items-center bg-base-background text-white text-[12px] leading-[100%] py-2! px-4! cursor-pointer rounded-[45px] ">
              Export
            </div>
          </div>
          {/* --------------- Table ---------------- */}
          <div className=" mt-5! w-full overflow-hidden">
            <Table
              tableClassName={"min-w-[1328px]"}
              tableHeader={ARTICLES_PLANNING_TABLE_HEADERS}
              tableData={
                <ArticlePlanningTableRow
                  rows={rows}
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    onEdit(row);
                  }}
                  onDelete={(row) => {
                    setDeleteModalOpen(true);
                    setRowToDelete(row);
                  }}
                />
              }
            />
          </div>
        </div>
      </Container>

      {/* Models */}

      {addNewArticleModalOpen && (
        <CreateArticilePlanningModel
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setAddNewArticleModalOpen(false);
            resetForm();
          }}
          onSave={handleAddRow}
        />
      )}
      {editModalOpen && (
        <UpdateArticilePlanningModel
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setEditModalOpen(false);
            resetForm();
          }}
          onUpdate={saveUpdatedRow}
        />
      )}
      {deleteModalOpen && (
        <DeleteModel
          cancel={() => {
            setDeleteModalOpen(false);
            rowToDelete(null);
          }}
          OnDelete={() => onDelete(rowToDelete)}
        />
      )}

      {filterModalOpen && (
        <FilterModel
          filterData={filterData}
          setFilterData={setFilterData}
          onFilter={hanldeFilterData}
          onClose={() => setFilterModalOpen(false)}
        />
      )}

      {/* Toast Message */}
      {toastMessage.message !== "" && (
        <Toast
          message={toastMessage.message}
          isOpen={toastMessage.message !== ""}
          onClick={handleUndoDelete}
          type={toastMessage.type}
          onClose={() => setToastMessage({ message: "", type: "" })}
        />
      )}
    </>
  );
};

export default ArticlePlanning;
