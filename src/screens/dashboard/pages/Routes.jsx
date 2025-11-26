import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { CiCirclePlus } from "react-icons/ci";
import SearchField from "../../../commonComponents/SearchField";
import CreateRouteModel from "../../../commonComponents/models/CreateRouteModel";
import Toast from "../../../commonComponents/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlanningRoute,
  deletePlanningRoute,
  fetchPlanningRoutes,
  updatePlanningRoute,
} from "../../../redux/thunk/routeThunk";
import {
  resetStatus,
  setPage,
  setPageLimit,
  setSearch,
} from "../../../redux/slice/routeSlice";
import { planningRouteEnumValues } from "../../../constants/enum_constant";
import { ROUTES_TABLE_HEADERS } from "../../../constants/table_headers";
import Table from "../../../commonComponents/table/Table";
import RouteTableRow from "../components/RouteTableRow";
import UpdateRouteModel from "../../../commonComponents/models/UpdateRouteModel";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import Pagination from "../../../commonComponents/Pagination";

const Routes = () => {
  const {
    pagination: { current_page: page, page_limit, total_pages },
    search,
  } = useSelector((state) => state.route);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddRouteModelOpen, setIsAddRouteModelOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    planning_route_name: "",
    planning_route_type: planningRouteEnumValues.PLANNING_ROUTE_TYPES[2],
    cost_per_meter: "",
    lead_time_days: "",
  });
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const handleSearch = () => {
    dispatch(setSearch(searchQuery));
  };

  const resetFormData = () => {
    setFormData({
      planning_route_name: "",
      planning_route_type: planningRouteEnumValues.PLANNING_ROUTE_TYPES[2],
      cost_per_meter: "",
      lead_time_days: "",
    });
    setRow(null);
    dispatch(resetStatus());
  };

  const handleSave = () => {
    dispatch(createPlanningRoute(formData))
      .unwrap()
      .then((res) => {
        setIsAddRouteModelOpen(false);
        setToastMessage({ message: "Route created successfully!", type: "" });
        resetFormData();
      })
      .catch((error) => {
        setIsAddRouteModelOpen(false);
        setToastMessage({
          message: error || "Failed to create route.",
          type: "",
        });
        resetFormData();
      });
  };

  const handleUpdate = () => {
    dispatch(
      updatePlanningRoute({
        id: row._id,
        body: {
          cost_per_meter: row.cost_per_meter,
          lead_time_days: row.lead_time_days,
        },
      })
    )
      .unwrap()
      .then((res) => {
        setEditModalOpen(false);
        setToastMessage({ message: "Route Updated successfully!", type: "" });
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

  const handleDelete = () => {
    dispatch(deletePlanningRoute(row._id))
      .unwrap()
      .then((res) => {
        setDeleteModalOpen(false);
        setToastMessage({ message: "Item Deleted Successfully", type: "" });
        resetFormData();
      })
      .catch((error) => {
        setDeleteModalOpen(false);
        setToastMessage({
          message: error || "Failed to Delete route.",
          type: "",
        });
        resetFormData();
      });
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handlePageLimitChange = (limit) => {
    dispatch(setPageLimit(limit));
  };

  useEffect(() => {
    if (!page) return;
    dispatch(fetchPlanningRoutes({ page, page_limit, search }));
  }, [page_limit, page, search]);

  return (
    <>
      <Container>
        <div className="w-full h-full p-3! sm:p-7!">
          {/* ---------------------------------- */}
          <div className="w-full flex  flex-wrap sm:flex-nowrap justify-between sm:justify-center gap-3.5 items-center">
            {/* Search Field */}
            <SearchField
              value={searchQuery}
              setValue={setSearchQuery}
              onSearch={handleSearch}
            />
            {/* Create Button */}
            <div>
              <div
                onClick={() => setIsAddRouteModelOpen(true)}
                className=" select-none flex justify-center items-center bg-base-background text-white text-[16px] leading-[100%] py-2.5! px-4! cursor-pointer rounded-[67px] "
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
              Routes
            </h4>
          </div>
          {/* --------------- Table ---------------- */}
          <div className=" mt-5! w-full overflow-hidden">
            <Table
              tableClassName={"min-w-[600px]"}
              tableHeader={ROUTES_TABLE_HEADERS}
              tableData={
                <RouteTableRow
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    setRow(row);
                  }}
                  onDelete={(row) => {
                    setDeleteModalOpen(true);
                    setRow(row);
                  }}
                />
              }
            />
            <div className="">
              <Pagination
                page={page}
                totalPages={total_pages}
                pageLimit={page_limit}
                onPageChange={handlePageChange}
                onLimitChange={handlePageLimitChange}
              />
            </div>
          </div>
        </div>
      </Container>
      {isAddRouteModelOpen && (
        <CreateRouteModel
          onClose={() => {
            setIsAddRouteModelOpen(false);
            resetFormData();
          }}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
        />
      )}
      {editModalOpen && (
        <UpdateRouteModel
          formData={row}
          setFormData={setRow}
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
            resetFormData();
          }}
          OnDelete={handleDelete}
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

export default Routes;
