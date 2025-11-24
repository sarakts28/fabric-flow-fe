import { createSlice } from "@reduxjs/toolkit";
import {
  allCategoriesThunk,
  createCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk,
} from "../thunk/categoryThunk";

const initialState = {
  list: [],
  allCategories: [],
  count: 0,
  search: "",
  pagination: {
    current_page: 1,
    page_limit: 10,
    total_pages: 0,
    total_items: 0,
    isNext: false,
    isPrev: false,
  },
  loading: {
    list: false,
    allCategories: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  successMessage: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setPage: (state, action) => {
      state.pagination.current_page = action.payload;
    },
    setPageLimit: (state, action) => {
      state.pagination.page_limit = action.payload;
      state.pagination.current_page = 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.pagination.current_page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------- FETCH ALL --------------
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload.result;
        state.count = action.payload.count;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      // ---------------- CREATE -----------------
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.successMessage = "Planning route created";
        state.list.unshift(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ---------------- getAllCategories  -----------------
      .addCase(allCategoriesThunk.pending, (state) => {
        state.loading.allCategories = true;
      })
      .addCase(allCategoriesThunk.fulfilled, (state, action) => {
        state.loading.allCategories = false;
        state.allCategories = action.payload;
      })
      .addCase(allCategoriesThunk.rejected, (state, action) => {
        state.loading.allCategories = false;
        state.error = action.payload;
      })

      // ---------------- DELETE -----------------
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.successMessage = "Planning route deleted";

        state.list = state.list.filter((i) => i._id !== action.payload.id);
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, setPage, setPageLimit, setSearch } =
  categorySlice.actions;

export default categorySlice.reducer;
