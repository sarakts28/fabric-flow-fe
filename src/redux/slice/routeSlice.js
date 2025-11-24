import { createSlice } from "@reduxjs/toolkit";
import {
  createPlanningRoute,
  deletePlanningRoute,
  fetchPlanningRoutes,
  updatePlanningRoute,
} from "../thunk/routeThunk";

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
    list: false,
    single: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  successMessage: null,
};

const routeSlice = createSlice({
  name: "route",
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
      .addCase(fetchPlanningRoutes.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(fetchPlanningRoutes.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload.result;
        state.count = action.payload.count;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPlanningRoutes.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      // ---------------- CREATE -----------------
      .addCase(createPlanningRoute.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createPlanningRoute.fulfilled, (state, action) => {
        state.loading.create = false;
        state.successMessage = "Planning route created";
        state.list.unshift(action.payload);
      })
      .addCase(createPlanningRoute.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE -----------------
      .addCase(updatePlanningRoute.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updatePlanningRoute.fulfilled, (state, action) => {
        state.loading.update = false;
        state.successMessage = "Planning route updated";

        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updatePlanningRoute.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ---------------- DELETE -----------------
      .addCase(deletePlanningRoute.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deletePlanningRoute.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.successMessage = "Planning route deleted";

        state.list = state.list.filter((i) => i._id !== action.payload.id);
      })
      .addCase(deletePlanningRoute.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, setPage, setSearch, setPageLimit } =
  routeSlice.actions;

export default routeSlice.reducer;
