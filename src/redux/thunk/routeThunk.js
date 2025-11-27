import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRoute,
  deleteRoute,
  getAllRoutes,
  getAllRoutesWithoutPagination,
  updateRoute,
} from "../../services/routeServices";

// Get all planning routes
export const fetchPlanningRoutes = createAsyncThunk(
  "planning/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAllRoutes(params);
      return res;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

// Create
export const createPlanningRoute = createAsyncThunk(
  "planning/create",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addRoute(body);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Create failed");
    }
  }
);

// Update
export const updatePlanningRoute = createAsyncThunk(
  "planning/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await updateRoute(id, body);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Update failed");
    }
  }
);

// Delete
export const deletePlanningRoute = createAsyncThunk(
  "planning/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteRoute(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.message || "Delete failed");
    }
  }
);

// all without pagination

export const getAllPlanningRoutesWithoutPagination = createAsyncThunk(
  "planning/fetchAllWithoutPagination",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllRoutesWithoutPagination();
      return res;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
