import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import SearchField from "../../../commonComponents/SearchField";
import { VscSettings } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import Table from "../../../commonComponents/table/Table";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import Toast from "../../../commonComponents/Toast";
import ArticlePlanningTableRow from "../components/ArticlePlanningTableRow";
import { ARTICLES_PLANNING_TABLE_HEADERS } from "../../../constants/table_headers";
import CreateArticilePlanningModel from "../../../commonComponents/models/CreateArticilePlanningModel";
import UpdateArticilePlanningModel from "../../../commonComponents/models/UpdateArticilePlanningModel";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticlePlanningThunk,
  deleteArticlePlanningThunk,
  getAllArticlePlanningThunk,
  updateArticlePlanningThunk,
  updateOrderSlipThunk,
  updateStatusThunk,
} from "../../../redux/thunk/articlePlanningThunk";
import {
  resetStatus,
  setPage,
  setPageLimit,
  setSearch,
} from "../../../redux/slice/articlePlanningSlice";
import { formatDate } from "../../../lib/utilityFn";
import Pagination from "../../../commonComponents/Pagination";
import ArticalPlanningFilterModel from "../../../commonComponents/models/ArticalPlanningFilterModel";
import StatusUpdateModel from "../../../commonComponents/models/StatusUpdateModel";
import OrderSlipUpdate from "../../../commonComponents/models/OrderSlipUpdate";
const ArticlePlanning = () => {
  const {
    pagination: { current_page: page, page_limit: limit, total_pages },
    search,
  } = useSelector((state) => state.articlePlanning);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addNewArticleModalOpen, setAddNewArticleModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [status, setStatus] = useState({
    id: "",
    status: "",
    isModelOpen: false,
  });
  const [orderSlip, setOrderSlip] = useState({
    id: "",
    order_slip: "",
    isModelOpen: false,
  });
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    article_id: "",
    planningRoute_id: "",
    total_payment: "",
    when_process_end: "",
    when_process_start: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    order_slip: "",
    status: "",
    total_payment: "",
    when_process_end: "",
    when_process_start: "",
    planningName: "",
  });

  const [filterData, setFilterData] = useState({
    article_id: "",
    planningRoute_id: "",
    status: "",
    order_slip: "",
  });

  const resetFormData = () => {
    setFormData({
      article_id: "",
      planningRoute_id: "",
      total_payment: "",
      when_process_end: "",
      when_process_start: "",
    });
    setEditFormData({
      id: "",
      order_slip: "",
      status: "",
      total_payment: "",
      when_process_end: "",
      when_process_start: "",
      planningName: "",
    });

    setFilterData({
      article_id: "",
      planningRoute_id: "",
      status: "",
      order_slip: "",
    });
    dispatch(resetStatus());
  };

  const handleDelete = () => {
    dispatch(deleteArticlePlanningThunk(rowToDelete._id))
      .unwrap()
      .then((res) => {
        setDeleteModalOpen(false);
        setToastMessage({ message: "Item Deleted Successfully", type: "" });
        resetFormData();
      })
      .catch((error) => {
        setDeleteModalOpen(false);
        setToastMessage({
          message: "Failed to Delete Article Planning.",
          type: "",
        });
        resetFormData();
      });
  };

  const handleSave = () => {
    dispatch(createArticlePlanningThunk(formData))
      .unwrap()
      .then((res) => {
        setAddNewArticleModalOpen(false);
        setToastMessage({
          message: "Articles created successfully!",
          type: "",
        });
        resetFormData();
      })
      .catch((error) => {
        setAddNewArticleModalOpen(false);

        setToastMessage({
          message: error || "Failed to create route.",
          type: "",
        });
        resetFormData();
      });
  };

  const handleUpdate = () => {
    dispatch(
      updateArticlePlanningThunk({
        id: editFormData.id,
        body: {
          order_slip: editFormData.order_slip,
          status: editFormData.status,
          total_payment: editFormData.total_payment,
          when_process_end: editFormData.when_process_end,
          when_process_start: editFormData.when_process_start,
          planningName: editFormData.planningName,
        },
      })
    )
      .unwrap()
      .then((res) => {
        setEditModalOpen(false);
        setToastMessage({
          message: "Article Planning Updated successfully!",
          type: "",
        });
        resetFormData();
      })
      .catch((error) => {
        setEditModalOpen(false);
        setToastMessage({
          message: error || "Failed to update route.",
          type: "",
        });
        resetFormData();
      });
  };

  const hanldeFilterData = () => {
    dispatch(
      getAllArticlePlanningThunk({ page, limit, search, ...filterData })
    );
    setFilterModalOpen(false);
  };

  const handleStatusUpdate = () => {
    dispatch(
      updateStatusThunk({
        id: status.id,
        body: {
          status: status.status,
        },
      })
    )
      .unwrap()
      .then((res) => {
        setStatus({ id: "", status: "", isModelOpen: false });
        setToastMessage({
          message: "Status Updated successfully!",
          type: "",
        });
      })
      .catch((error) => {
        setStatus({ id: "", status: "", isModelOpen: false });
        setToastMessage({
          message: error || "Failed to update Status",
          type: "",
        });
      });
  };

  const handleOrderSlipUpdate = () => {
    dispatch(
      updateOrderSlipThunk({
        id: orderSlip.id,
        body: {
          order_slip: orderSlip.order_slip,
        },
      })
    )
      .unwrap()
      .then((res) => {
        setOrderSlip({ id: "", order_slip: "", isModelOpen: false });
        setToastMessage({
          message: "Order Updated successfully!",
          type: "",
        });
      })
      .catch((error) => {
        setOrderSlip({ id: "", order_slip: "", isModelOpen: false });
        setToastMessage({
          message: error || "Failed to update Status",
          type: "",
        });
      });
  };

  const handleSearch = () => {
    dispatch(setSearch(searchQuery));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handlePageLimitChange = (limit) => {
    dispatch(setPageLimit(limit));
  };

  useEffect(() => {
    dispatch(getAllArticlePlanningThunk({ page, limit, search }));
  }, [limit, page, search]);

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
              tableClassName={"min-w-[1444px]"}
              tableHeader={ARTICLES_PLANNING_TABLE_HEADERS}
              tableData={
                <ArticlePlanningTableRow
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    setEditFormData({
                      id: row._id,
                      order_slip: row.order_slip,
                      status: row.status,
                      total_payment: row.total_payment,
                      when_process_end: formatDate(row.when_process_end),
                      when_process_start: formatDate(row.when_process_start),
                      planningName: row.planningName,
                    });
                  }}
                  setStatus={setStatus}
                  setOrderSlip={setOrderSlip}
                  onDelete={(row) => {
                    setDeleteModalOpen(true);
                    setRowToDelete(row);
                  }}
                />
              }
            />
            <div className="">
              <Pagination
                page={page}
                totalPages={total_pages}
                pageLimit={limit}
                onPageChange={handlePageChange}
                onLimitChange={handlePageLimitChange}
              />
            </div>
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
            resetFormData();
          }}
          onSave={handleSave}
        />
      )}
      {editModalOpen && (
        <UpdateArticilePlanningModel
          formData={editFormData}
          setFormData={setEditFormData}
          onClose={() => {
            setEditModalOpen(false);
            resetFormData();
          }}
          onUpdate={handleUpdate}
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
        <ArticalPlanningFilterModel
          filterData={filterData}
          setFilterData={setFilterData}
          onFilter={hanldeFilterData}
          onClose={() => setFilterModalOpen(false)}
        />
      )}

      {status.isModelOpen && (
        <StatusUpdateModel
          status={status}
          setStatus={setStatus}
          onClose={() => {
            setStatus({ id: "", status: "", isModelOpen: false });
          }}
          onUpdate={handleStatusUpdate}
        />
      )}

      {orderSlip.isModelOpen && (
        <OrderSlipUpdate
          orderSlip={orderSlip}
          setOrderSlip={setOrderSlip}
          onClose={() => {
            setOrderSlip({ id: "", order_slip: "", isModelOpen: false });
          }}
          onUpdate={handleOrderSlipUpdate}
        />
      )}

      {/* Toast Message */}
      {toastMessage.message !== "" && (
        <Toast
          message={toastMessage.message}
          isOpen={toastMessage.message !== ""}
          onClose={() => setToastMessage({ message: "", type: "" })}
        />
      )}
    </>
  );
};

export default ArticlePlanning;
