import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesWithoutPagination,
} from "../../services/categoriesServices";

export const fetchCategoriesThunk = createAsyncThunk(
  "category/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAllCategories(params);
      return res;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addCategory(body);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Create failed");
    }
  }
);

export const allCategoriesThunk = createAsyncThunk(
  "category/fetchAllWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesWithoutPagination();
      return res;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteCategory(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Delete failed");
    }
  }
);
