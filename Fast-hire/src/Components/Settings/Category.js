import axiosInstance from "../Common/axiosConfig"; 

export const createCategory = async (category, token) => {
  return axiosInstance.post("/createCategory", category, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllCategories = async (token) => {
  return axiosInstance.get("/getAllCategories", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCategoryById = async (id, token) => {
  return axiosInstance.get(`/getCategoryById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCategory = async (id, category, token) => {
  return axiosInstance.put(`/updateCategory/${id}`, category, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCategory = async (id, token) => {
  return axiosInstance.delete(`/deleteCategory/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSkillsByCategory = async (categoryId, token) => {
  return axiosInstance.get(`/getSkillsByCategory/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
