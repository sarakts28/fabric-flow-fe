import React, { useState } from "react";
import Container from "../components/Container";
import SearchField from "../../../commonComponents/SearchField";
import { VscSettings } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import Table from "../../../commonComponents/table/Table";
import InventoryTableRow from "../components/InventoryTableRow";
import CreateArticileModel from "../../../commonComponents/models/CreateArticileModel";
import UpdateArticileModel from "../../../commonComponents/models/UpdateArticileModel";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import Toast from "../../../commonComponents/Toast";
import FilterModel from "../../../commonComponents/models/FilterModel";
const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addNewArticleModalOpen, setAddNewArticleModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    article: "",
    orderType: "Own",
    client: "",
    route: "",
    fabric: "",
    cost: "",
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

  const headers = [
    { label: "Article No.", index: "articleNo" },
    { label: "Route ID", index: "routeId" },
    { label: "Processing Days", index: "processingDays" },
    { label: "Status", index: "status" },
    { label: "Due Date", index: "dueDate" },
    { label: "Create Date", index: "createDate" },
    { label: "Issue Payment Slip", index: "issuePaymentSlip" },
    { label: "Client ID", index: "clientId" },
    { label: "Total", index: "total" },
    { label: "Packing Type", index: "packingType" },
    { label: "Quantity", index: "quantity" },
    { label: "Action", index: "action" },
  ];

  const rows = [
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
    {
      articleNo: 1,
      routeId: 2200,
      processingDays: 5,
      status: "In Process",
      dueDate: "02-Nov-2025",
      createDate: "25-Oct-2025",
      issuePaymentSlip: "+",
      clientId: "#1122",
      total: "45,000",
      packingType: "2 Pieces",
      quantity: 15,
      action: { delete: true, edit: true },
    },
  ];

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
              Articles
            </h4>
          </div>
          {/* -------------------------------------- */}
          <div className=" flex justify-end">
            <div className=" flex justify-center items-center bg-base-background text-white text-[12px] leading-[100%] py-2! px-4! cursor-pointer rounded-[45px] ">
              Print
            </div>
          </div>
          {/* --------------- Table ---------------- */}
          <div className=" mt-5! w-full overflow-hidden">
            <Table
              tableClassName={"min-w-[1328px]"}
              tableHeader={headers}
              tableData={
                <InventoryTableRow
                  rows={rows}
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    console.log("Edit row:", row);
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
        <CreateArticileModel
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setAddNewArticleModalOpen(false);
            setFormData({
              article: "",
              orderType: "Own",
              client: "",
              route: "",
              fabric: "",
              cost: "",
            });
          }}
          onSave={handleArticileSave}
        />
      )}
      {editModalOpen && (
        <UpdateArticileModel
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setEditModalOpen(false);
            setFormData({
              article: "",
              orderType: "Own",
              client: "",
              route: "",
              fabric: "",
              cost: "",
            });
          }}
          onUpdate={handleArticileUpdate}
        />
      )}
      {deleteModalOpen && (
        <DeleteModel
          cancel={() => {
            setDeleteModalOpen(false);
            rowToDelete(null);
          }}
          OnDelete={handleDelete}
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

export default Inventory;
