import axiosInstance from "../Common/axiosConfig"; 

export const createContactUs = async (contactData) => {
  try {
    const response = await axiosInstance.post(`/contact-us`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error saving ContactUs:", error);
    throw error.response?.data || "Error saving contact data";
  }
};

export const getAllContactUs = async () => {
  try {
    const response = await axiosInstance.get(`/getall`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all ContactUs:", error);
    throw error.response?.data || "Error fetching contact data";
  }
};

export const getContactUsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error fetching contact data by ID";
  }
};

export const updateContactUs = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/update-contactus/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error updating contact data";
  }
};

export const deleteContactUs = async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete-contactus/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error deleting contact data";
  }
};
