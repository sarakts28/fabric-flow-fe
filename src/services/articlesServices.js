import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const fetchAllArticles = async ({ page, limit, ...filter }) => {
  try {
    const params = { page, limit, ...filter };
    const res = await API.get("/article", { params });
    return res.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const createArticle = async (articleData) => {
  try {
    const res = await API.post("/article", articleData);
    return res.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};
