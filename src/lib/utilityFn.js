export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true; // success
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false; // failed
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
