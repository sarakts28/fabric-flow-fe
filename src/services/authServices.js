import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/login", credentials);
    return res.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const currentUser = async () => {
  try {
    const res = await API.get("/me");
    return res.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const logoutUser = async () => {
  try {
    const res = await API.post("/logout");
    return res.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};
