import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createArticle,
  deleteArticle,
  fetchAllArticles,
  getRawArticles,
  getSingleArticle,
  updateArticle,
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
  async (body, { rejectWithValue }) => {
    try {
      const data = await createArticle(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSingleArticleThunk = createAsyncThunk(
  "articles/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getSingleArticle(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRawArticlesThunk = createAsyncThunk(
  "articles/getRaw",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRawArticles();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticleThunk = createAsyncThunk(
  "articles/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const data = await updateArticle(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticalThunk = createAsyncThunk(
  "articles/delete",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteArticle(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
