import { createSlice } from "@reduxjs/toolkit";
import {
  createArticlePlanningThunk,
  deleteArticlePlanningThunk,
  getAllArticlePlanningThunk,
  getSingleArticlePlanningThunk,
  updateArticlePlanningThunk,
  updateOrderSlipThunk,
  updateStatusThunk,
} from "../thunk/articlePlanningThunk";

const initialState = {
  list: [],
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
  single: null,
  loading: {
    statusUpdate: false,
    orderSlipUpdate: false,
    list: false,
    single: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  successMessage: null,
};

const articlePlanningSlice = createSlice({
  name: "articlePlanning",
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

      .addCase(getAllArticlePlanningThunk.pending, (state) => {
        state.loading.list = true;
      })

      .addCase(getAllArticlePlanningThunk.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload.result;
        state.count = action.payload.totalCount;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllArticlePlanningThunk.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      // ---------------- CREATE --------------

      .addCase(createArticlePlanningThunk.pending, (state) => {
        state.loading.create = true;
      })

      .addCase(createArticlePlanningThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.successMessage = "Article Planning created successfully";
        state.list.unshift(action.payload);
      })
      .addCase(createArticlePlanningThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE --------------

      .addCase(updateArticlePlanningThunk.pending, (state) => {
        state.loading.update = true;
      })

      .addCase(updateArticlePlanningThunk.fulfilled, (state, action) => {
        state.loading.update = false;
        state.successMessage = "Article Planning updated successfully";
        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateArticlePlanningThunk.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ---------------- DELETE --------------

      .addCase(deleteArticlePlanningThunk.pending, (state) => {
        state.loading.delete = true;
      })

      .addCase(deleteArticlePlanningThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.successMessage = "Article Planning deleted successfully";
        state.list = state.list.filter(
          (item) => item._id !== action.payload.id
        );
      })

      .addCase(deleteArticlePlanningThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      })

      // ---------------- SINGLE --------------

      .addCase(getSingleArticlePlanningThunk.pending, (state) => {
        state.loading.single = true;
      })

      .addCase(getSingleArticlePlanningThunk.fulfilled, (state, action) => {
        state.loading.single = false;
        state.single = action.payload;
      })

      .addCase(getSingleArticlePlanningThunk.rejected, (state, action) => {
        state.loading.single = false;
        state.error = action.payload;
      })

      //   ----------------- STATUS UPDATE --------------

      .addCase(updateStatusThunk.pending, (state) => {
        state.loading.statusUpdate = true;
      })

      .addCase(updateStatusThunk.fulfilled, (state, action) => {
        state.loading.statusUpdate = false;
        state.successMessage = "Status updated successfully";
        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.loading.statusUpdate = false;
        state.error = action.payload;
      })

      //   ----------------- ORDER SLIP UPDATE --------------

      .addCase(updateOrderSlipThunk.pending, (state) => {
        state.loading.orderSlipUpdate = true;
      })

      .addCase(updateOrderSlipThunk.fulfilled, (state, action) => {
        state.loading.orderSlipUpdate = false;
        state.successMessage = "Order slip updated successfully";
        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateOrderSlipThunk.rejected, (state, action) => {
        state.loading.orderSlipUpdate = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, setPage, setPageLimit, setSearch } =
  articlePlanningSlice.actions;

export default articlePlanningSlice.reducer;
