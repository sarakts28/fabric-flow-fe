import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import SearchField from "../../../commonComponents/SearchField";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  resetStatus,
  setPage,
  setPageLimit,
  setSearch,
} from "../../../redux/slice/categorySlice";
import CreateCategoriesModel from "../../../commonComponents/models/CreateCategoriesModel";
import { CategoryEnumValues } from "../../../constants/enum_constant";
import Pagination from "../../../commonComponents/Pagination";
import Table from "../../../commonComponents/table/Table";
import { CATEGORIES_TABLE_HEADERS } from "../../../constants/table_headers";
import CategoryTableRow from "../components/CategoryTableRow";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import Toast from "../../../commonComponents/Toast";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk,
} from "../../../redux/thunk/categoryThunk";

const Categories = () => {
  const {
    pagination: { current_page: page, page_limit, total_pages },
    search,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesModel, setIsCategoriesModel] = useState(false);
  const [row, setRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });

  const [formData, setFormData] = useState({
    category_name: "",
    category_season: CategoryEnumValues.SEASON_TYPES[0],
  });

  const handleSearch = () => {
    dispatch(setSearch(searchQuery));
  };

  const resetFormData = () => {
    setFormData({
      category_name: "",
      category_season: CategoryEnumValues.SEASON_TYPES[0],
    });
    setRow(null);
    dispatch(resetStatus());
  };

  useEffect(() => {
    if (!page) return;
    dispatch(fetchCategoriesThunk({ page, page_limit, searchQuery }));
  }, [page_limit, page, search]);

  const handleSave = () => {
    dispatch(createCategoryThunk(formData))
      .unwrap()
      .then((res) => {
        setIsCategoriesModel(false);
        setToastMessage({ message: "Route created successfully!", type: "" });
        resetFormData();
      })
      .catch((error) => {
        setIsCategoriesModel(false);
        setToastMessage({
          message: error || "Failed to create route.",
          type: "",
        });
        resetFormData();
      });
  };
  const handleDelete = () => {
    dispatch(deleteCategoryThunk(row._id))
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
  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  const handlePageLimitChange = (newLimit) => {
    dispatch(setPageLimit(newLimit));
  };

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
                onClick={() => setIsCategoriesModel(true)}
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
              Categories
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
              tableClassName={"min-w-[450px]"}
              tableHeader={CATEGORIES_TABLE_HEADERS}
              tableData={
                <CategoryTableRow
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
      {isCategoriesModel && (
        <CreateCategoriesModel
          onClose={() => {
            setIsCategoriesModel(false);
            resetFormData();
          }}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
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

export default Categories;
