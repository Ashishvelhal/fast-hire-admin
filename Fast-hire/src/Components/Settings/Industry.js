import axiosInstance from "../Common/axiosConfig"; 

export const createIndustry = async (industry, token) => {
  return axiosInstance.post("/createIndustry", industry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllIndustries = async (token) => {
  return axiosInstance.get("/getAllIndustries", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateIndustry = async (id, industry, token) => {
  return axiosInstance.put(`/updateIndustry/${id}`, industry, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteIndustry = async (id, token) => {
  return axiosInstance.delete(`/deleteIndustry/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getIndustryById = async (id, token) => {
  return axiosInstance.get(`/getIndustryById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCategory = async (category, token) => {
  return axiosInstance.post("/createCategory", category, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getCategoriesByIndustry = async (industryId, token) => {
  return axiosInstance.get(`/getCategoriesByIndustry/${industryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
