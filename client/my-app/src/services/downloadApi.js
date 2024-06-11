import axiosInstance from '../services/axiosInstance';

export const authorized = async () => {
  try {
    const response = await axiosInstance.post("/download");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Network error" };
    }
  }
};
