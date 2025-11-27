import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const fetchAllArticles = async ({ page, limit, ...filter }) => {
  try {
    const params = { page, limit, ...filter };
    const res = await API.get("/article-planning", { params });
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const createArticlePlanning = async (articlePlanningData) => {
  try {
    const res = await API.post("/article-planning", articlePlanningData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const updateArticlePlanning = async (id, articlePlanningData) => {
  try {
    const res = await API.patch(`/article-planning/${id}`, articlePlanningData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const deleteArticlePlanning = async (id) => {
  try {
    await API.delete(`/article-planning/${id}`);

    return {
      id,
      message: "Article Planning deleted successfully",
      success: true,
    };
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getSingleArticlePlanning = async (id) => {
  try {
    const res = await API.get(`/article-planning/${id}`);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const updateStatus = async (id, statusData) => {
  try {
    const res = await API.patch(`/article-planning/${id}/status`, statusData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const updateOrderSlip = async (id, orderSlipData) => {
  try {
    const res = await API.patch(
      `/article-planning/${id}/order-slip`,
      orderSlipData
    );
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};
