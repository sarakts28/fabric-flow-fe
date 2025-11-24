import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    article_no: "",
    fabric_type: "",
    category_type: "",
  },
  pagination: {
    current_page: 1,
    total_pages: 1,
    page_limit: 10,
    total_items: 0,
    isNext: false,
    isPrev: false,
  },
  actionStatus: {
    create: { loading: false, error: null, success: false },
    update: { loading: false, error: null, success: false },
    delete: { loading: false, error: null, success: false },
  },
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
});
