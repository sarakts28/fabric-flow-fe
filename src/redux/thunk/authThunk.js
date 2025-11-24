import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  currentUser,
  logoutUser,
} from "../../services/authServices";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUserThunk = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await currentUser();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
