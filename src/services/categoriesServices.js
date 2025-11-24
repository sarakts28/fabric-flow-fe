import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const addCategory = async (categoryData) => {
  try {
    const res = await API.post("/category", categoryData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getAllCategories = async ({ page, limit, ...filter }) => {
  try {
    const params = { page, limit, ...filter };
    const res = await API.get("/category", { params });
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getCategoriesWithoutPagination = async () => {
  try {
    const res = await API.get("/category/all");
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const deleteCategory = async (id) => {
  try {
    await API.delete(`/category/${id}`);
    return {
      id,
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};
