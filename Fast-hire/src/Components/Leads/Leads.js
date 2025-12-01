import axiosInstance from "../Common/axiosConfig";

// GET All Custom Plans
export const getAllCustomPlan = async () => {
  try {
    const response = await axiosInstance.get(`/custom-plans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching custom plans:", error);
    throw error.response?.data || "Error fetching custom plans";
  }
};

// GET Custom Plan By ID
export const getCustomPlanById = async (id) => {
  try {
    const response = await axiosInstance.get(`/custom-plans/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan with ID ${id}:`, error);
    throw error.response?.data || "Failed to fetch plan details";
  }
};

// UPDATE Custom Plan
export const updateCustomPlan = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/updateplan/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating plan with ID ${id}:`, error);
    throw error.response?.data || "Failed to update plan";
  }
};

// DELETE Custom Plan
export const deleteCustomPlan = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteplan/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting plan with ID ${id}:`, error);
    throw error.response?.data || "Failed to delete plan";
  }
};
