import API from "../lib/api";
import { handleApiError } from "../lib/handleApiError";

export const fetchAllArticles = async ({ page, limit, ...filter }) => {
  try {
    const params = { page, limit, ...filter };
    const res = await API.get("/article", { params });
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const createArticle = async (articleData) => {
  try {
    const res = await API.post("/article", articleData);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getSingleArticle = async (id) => {
  try {
    const res = await API.get(`/article/${id}`);
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const getRawArticles = async () => {
  try {
    const res = await API.get("/article/raw");
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const res = await API.patch(`/article/${id}`, articleData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  } catch (error) {
    throw { message: handleApiError(error) };
  }
};

export const deleteArticle = async (id) => {
  try {
    await API.delete(`/article/${id}`);

    return {
      id,
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.log(error);

    throw { message: handleApiError(error) };
  }
};
