import { createSlice } from "@reduxjs/toolkit";
import {
  createArticleThunk,
  deleteArticalThunk,
  getAllArticlesThunk,
  getRawArticlesThunk,
  getSingleArticleThunk,
  updateArticleThunk,
} from "../thunk/articleThunk";

const initialState = {
  list: [],
  rawArticles: [],
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
    rawArticles: false,
  },
  error: null,
  successMessage: null,
};

const articleSlice = createSlice({
  name: "articles",
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
      .addCase(getAllArticlesThunk.pending, (state) => {
        state.loading.list = true;
      })
      .addCase(getAllArticlesThunk.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = action.payload.result;
        state.count = action.payload.count;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllArticlesThunk.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })

      // ---------------- CREATE -----------------

      .addCase(createArticleThunk.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.loading.create = false;
        state.successMessage = "Article created";
        state.list.unshift(action.payload);
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })

      // ---------------- GET SINGLE --------------

      .addCase(getSingleArticleThunk.pending, (state) => {
        state.loading.single = true;
      })
      .addCase(getSingleArticleThunk.fulfilled, (state, action) => {
        state.loading.single = false;
        state.single = action.payload;
      })
      .addCase(getSingleArticleThunk.rejected, (state, action) => {
        state.loading.single = false;
        state.error = action.payload;
      })

      // ---------------- GET RAW ARTICLES --------------

      .addCase(getRawArticlesThunk.pending, (state) => {
        state.loading.rawArticles = true;
      })

      .addCase(getRawArticlesThunk.fulfilled, (state, action) => {
        state.loading.rawArticles = false;
        state.rawArticles = action.payload;
      })

      .addCase(getRawArticlesThunk.rejected, (state, action) => {
        state.loading.rawArticles = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE -----------------

      .addCase(updateArticleThunk.pending, (state) => {
        state.loading.update = true;
      })

      .addCase(updateArticleThunk.fulfilled, (state, action) => {
        state.loading.update = false;
        state.successMessage = "Article updated";

        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(updateArticleThunk.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      // ---------------- DELETE -----------------

      .addCase(deleteArticalThunk.pending, (state) => {
        state.loading.delete = true;
      })

      .addCase(deleteArticalThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.successMessage = "Article deleted";

        state.list = state.list.filter((i) => i._id !== action.payload.id);
      })

      .addCase(deleteArticalThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, setPage, setPageLimit, setSearch } =
  articleSlice.actions;

export default articleSlice.reducer;
