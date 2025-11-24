export const handleApiError = (err) => {
  if (err.response)
    return err.response?.data?.message || "Server error occured";
  else if (err.request) return "Network error. Please check your connection";
  else return err.message;
};
