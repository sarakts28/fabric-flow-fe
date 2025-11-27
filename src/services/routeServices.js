import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const addRoute = async (routeData) => {
  try {
    const res = await API.post("/planning-route", routeData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getAllRoutes = async ({ page, limit, ...filter }) => {
  try {
    const params = { page, limit, ...filter };
    const res = await API.get("/planning-route", { params });
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const updateRoute = async (id, routeData) => {
  try {
    const res = await API.patch(`/planning-route/${id}`, routeData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getAllRoutesWithoutPagination = async () => {
  try {
    const res = await API.get("/planning-route/all");
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const deleteRoute = async (id) => {
  try {
    await API.delete(`/planning-route/${id}`);
    return {
      id,
      success: true,
      message: "Planning route deleted successfully",
    };
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};
