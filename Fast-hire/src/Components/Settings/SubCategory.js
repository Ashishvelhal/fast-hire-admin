import axiosInstance from "../Common/axiosConfig";

export const createSubCategory = async (categoryId, subCategory, token) => {
  return axiosInstance.post(`/createSubCategory?categoryId=${categoryId}`, subCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateSubCategory = async (id, subCategory, token) => {
  return axiosInstance.put(`/updateSubCategory/${id}`, subCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteSubCategory = async (id, token) => {
  return axiosInstance.delete(`/deleteSubCategory/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllSubCategories = async (token) => {
  return axiosInstance.get(`/getAllSubCategories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSubCategoryById = async (id, token) => {
  return axiosInstance.get(`/getSubCategoryById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSubcategoriesByCategory = async (categoryId, token) => {
  return axiosInstance.get(`/getSubCategoriesByCategory/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
