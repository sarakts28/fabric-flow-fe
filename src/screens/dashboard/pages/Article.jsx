import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import SearchField from "../../../commonComponents/SearchField";
import { VscSettings } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import Table from "../../../commonComponents/table/Table";
import ArticleTableRow from "../components/ArticleTableRow";
import CreateArticileModel from "../../../commonComponents/models/CreateArticileModel";
import UpdateArticileModel from "../../../commonComponents/models/UpdateArticileModel";
import DeleteModel from "../../../commonComponents/models/DeleteModel";
import FilterModel from "../../../commonComponents/models/FilterModel";
import Toast from "../../../commonComponents/Toast";
import DetailModel from "../../../commonComponents/models/DetailModel";
import ImagesModel from "../../../commonComponents/models/ImagesModel";
import { ARTICLES_TABLE_HEADERS } from "../../../constants/table_headers";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticleThunk,
  getAllArticlesThunk,
} from "../../../redux/thunk/articleThunk";
import { resetStatus } from "../../../redux/slice/articleSlice";
const Article = () => {
  const {
    pagination: { current_page: page, page_limit, total_pages },
    search,
  } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addNewArticleModalOpen, setAddNewArticleModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [imagesModelOpen, setImagesModelOpen] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [detailedRowView, setDetailedRowView] = useState({
    rowName: "",
    rowValue: "",
  });
  const [formData, setFormData] = useState({
    article_no: "",
    article_name: "",
    article_description: "",
    category_id: "",
    fabric_type: "",
    measurement_type: "",
    total_quantity: "",
    designer_name: "",
    price: "",
    status: "",
    article_image: [],
  });
  const [filterData, setFilterData] = useState({
    categoryType: "",
    fabricType: "",
    articileCode: "",
  });

  const resetFormData = () => {
    setFormData({
      article_no: "",
      article_name: "",
      article_description: "",
      category_id: "",
      fabric_type: "",
      measurement_type: "",
      total_quantity: "",
      designer_name: "",
      price: "",
      status: "",
      article_image: [],
    });
    setRowToDelete(null);
    dispatch(resetStatus());
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleArticileSave = () => {
    dispatch(createArticleThunk(formData))
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

  useEffect(() => {
    if (!page) return;
    dispatch(getAllArticlesThunk({ page, page_limit, search }));
  }, [page_limit, page, search]);

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
              Export
            </div>
          </div>
          {/* --------------- Table ---------------- */}
          <div className=" mt-5! w-full overflow-hidden">
            <Table
              tableClassName={"!min-w-[1960px]"}
              tableHeader={ARTICLES_TABLE_HEADERS}
              tableData={
                <ArticleTableRow
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    setFormData(row);
                  }}
                  onDelete={(row) => {
                    setDeleteModalOpen(true);
                    setRowToDelete(row);
                  }}
                  setRowView={setDetailedRowView}
                  setImages={setImagesList}
                  setImagesModelOpen={setImagesModelOpen}
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
            resetFormData();
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
      {detailedRowView.rowName !== "" && detailedRowView.rowValue && (
        <DetailModel data={detailedRowView} setData={setDetailedRowView} />
      )}
      {imagesModelOpen && (
        <ImagesModel
          open={imagesModelOpen}
          images={imagesList}
          onClose={() => {
            setImagesModelOpen(false);
            setImagesList([]);
          }}
        />
      )}
    </>
  );
};

export default Article;
