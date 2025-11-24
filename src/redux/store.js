import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import routeReducer from "../redux/slice/routeSlice";
import categorySlice from "../redux/slice/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    route: routeReducer,
    categories: categorySlice,
  },
});

export default store;
