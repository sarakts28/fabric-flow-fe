import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createArticlePlanning,
  deleteArticlePlanning,
  fetchAllArticles,
  getSingleArticlePlanning,
  updateArticlePlanning,
} from "../../services/articlePlanningServices";

export const getAllArticlePlanningThunk = createAsyncThunk(
  "articlePlanning/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchAllArticles(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticlePlanningThunk = createAsyncThunk(
  "aticlePlanning/create",
  async (body, { rejectWithValue }) => {
    try {
      const data = await createArticlePlanning(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticlePlanningThunk = createAsyncThunk(
  "articlePlanning/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const data = await updateArticlePlanning(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticlePlanningThunk = createAsyncThunk(
  "articlePlanning/delete",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteArticlePlanning(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSingleArticlePlanningThunk = createAsyncThunk(
  "articlePlanning/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getSingleArticlePlanning(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStatusThunk = createAsyncThunk(
  "articlePlanning/updateStatus",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const data = await updateArticlePlanning(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderSlipThunk = createAsyncThunk(
  "articlePlanning/updateOrderSlip",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const data = await updateArticlePlanning(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
