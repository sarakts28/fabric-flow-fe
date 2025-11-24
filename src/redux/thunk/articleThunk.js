import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createArticle,
  fetchAllArticles,
} from "../../services/articlesServices";

export const getAllArticlesThunk = createAsyncThunk(
  "articles/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchAllArticles(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticleThunk = createAsyncThunk(
  "articles/create",
  async (articleData, { rejectWithValue }) => {
    try {
      const data = await createArticle(articleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
