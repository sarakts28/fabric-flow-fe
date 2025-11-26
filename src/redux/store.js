import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import routeReducer from "../redux/slice/routeSlice";
import categorySlice from "../redux/slice/categorySlice";
import articleReducer from "../redux/slice/articleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    route: routeReducer,
    categories: categorySlice,
  },
});

export default store;
