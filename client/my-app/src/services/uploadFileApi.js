import axiosInstance from '../services/axiosInstance';

export const uploadFile = async (data) => {
    try {
      const response = await axiosInstance.post("/uploadfile",data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return { success: false, message: "Network error" };
      }
    }
  };