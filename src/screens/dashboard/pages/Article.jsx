import React, { useState } from "react";
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
const Article = () => {
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
    { label: "Article Name", index: "articleName" },
    { label: "Article Description", index: "articleDescription" },
    { label: "Images", index: "images" },
    { label: "Category Type", index: "categoryType" },
    { label: "Fabric Type", index: "fabricType" },
    { label: "Measurement Type", index: "measurementType" },
    { label: "Total Quantity", index: "totalQuantity" },
    { label: "Designer Name", index: "designerName" },
    { label: "Price", index: "price" },
    { label: "status", index: "status" },
    { label: "Action", index: "action" },
  ];

  const rows = [
    {
      articleNo: 1,
      articleName: "Classic Linen Shirt",
      articleDescription: "A breathable premium linen shirt ideal for summer.",
      images: [
        "https://picsum.photos/id/101/500/500",
        "https://picsum.photos/id/102/500/500",
        "https://picsum.photos/id/104/500/500",
      ],
      categoryType: "Shirt",
      fabricType: "Linen",
      measurementType: "Medium",
      totalQuantity: 120,
      designerName: "John Doe",
      price: "4,500",
      status: "Available",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 2,
      articleName: "Denim Jacket",
      articleDescription: "Blue-wash denim jacket with modern fit.",
      images: [
        "https://picsum.photos/id/103/500/500",
        "https://picsum.photos/id/104/500/500",
      ],
      categoryType: "Jacket",
      fabricType: "Denim",
      measurementType: "Large",
      totalQuantity: 80,
      designerName: "Sarah Khan",
      price: "8,200",
      status: "In Stock",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 3,
      articleName: "Cotton Kurta",
      articleDescription: "Soft and comfortable traditional cotton kurta.",
      images: [
        "https://picsum.photos/id/105/500/500",
        "https://picsum.photos/id/106/500/500",
      ],
      categoryType: "Kurta",
      fabricType: "Cotton",
      measurementType: "Small",
      totalQuantity: 60,
      designerName: "Imran Ali",
      price: "3,200",
      status: "Available",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 4,
      articleName: "Formal Pant",
      articleDescription: "Slim-fit formal pants suitable for office wear.",
      images: [
        "https://picsum.photos/id/107/500/500",
        "https://picsum.photos/id/108/500/500",
      ],
      categoryType: "Pant",
      fabricType: "Tropical Wool",
      measurementType: "32",
      totalQuantity: 150,
      designerName: "Ayesha Noor",
      price: "5,900",
      status: "In Stock",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 5,
      articleName: "Silk Scarf",
      articleDescription: "Luxurious printed silk scarf.",
      images: [
        "https://picsum.photos/id/109/500/500",
        "https://picsum.photos/id/110/500/500",
      ],
      categoryType: "Accessory",
      fabricType: "Silk",
      measurementType: "Standard",
      totalQuantity: 200,
      designerName: "Hina Rahman",
      price: "2,000",
      status: "Available",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 6,
      articleName: "Wool Coat",
      articleDescription: "Premium long wool coat for winter.",
      images: [
        "https://picsum.photos/id/111/500/500",
        "https://picsum.photos/id/112/500/500",
      ],
      categoryType: "Coat",
      fabricType: "Wool",
      measurementType: "XL",
      totalQuantity: 40,
      designerName: "Adnan Malik",
      price: "15,500",
      status: "Out of Stock",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 7,
      articleName: "Sports T-Shirt",
      articleDescription: "Breathable polyester sports t-shirt.",
      images: [
        "https://picsum.photos/id/113/500/500",
        "https://picsum.photos/id/114/500/500",
      ],
      categoryType: "T-Shirt",
      fabricType: "Polyester",
      measurementType: "Large",
      totalQuantity: 300,
      designerName: "Hamza Ahmed",
      price: "1,800",
      status: "Available",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 8,
      articleName: "Chiffon Maxi",
      articleDescription: "Elegant chiffon maxi dress for events.",
      images: [
        "https://picsum.photos/id/115/500/500",
        "https://picsum.photos/id/116/500/500",
      ],
      categoryType: "Dress",
      fabricType: "Chiffon",
      measurementType: "Medium",
      totalQuantity: 35,
      designerName: "Zara Sheikh",
      price: "12,000",
      status: "Available",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 9,
      articleName: "Casual Hoodie",
      articleDescription: "Comfortable fleece-lined hoodie.",
      images: [
        "https://picsum.photos/id/117/500/500",
        "https://picsum.photos/id/118/500/500",
      ],
      categoryType: "Hoodie",
      fabricType: "Fleece",
      measurementType: "Large",
      totalQuantity: 90,
      designerName: "Faisal Qureshi",
      price: "4,200",
      status: "In Stock",
      action: { delete: true, edit: true },
    },
    {
      articleNo: 10,
      articleName: "Premium Polo Shirt",
      articleDescription: "High-quality cotton polo for casual wear.",
      images: [
        "https://picsum.photos/id/119/500/500",
        "https://picsum.photos/id/120/500/500",
      ],
      categoryType: "Polo",
      fabricType: "Cotton",
      measurementType: "Medium",
      totalQuantity: 180,
      designerName: "Rizwan Malik",
      price: "3,900",
      status: "Available",
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
              Export
            </div>
          </div>
          {/* --------------- Table ---------------- */}
          <div className=" mt-5! w-full overflow-hidden">
            <Table
              tableClassName={"min-w-[1328px]"}
              tableHeader={headers}
              tableData={
                <ArticleTableRow
                  rows={rows}
                  onEdit={(row) => {
                    setEditModalOpen(true);
                    console.log("Edit row:", row);
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
