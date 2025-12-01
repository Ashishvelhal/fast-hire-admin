import axiosInstance from "../Common/axiosConfig";

export const createEducation = async (education, token) => {
  return axiosInstance.post("/createEducation", education, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllEducations = async (token) => {
  return axiosInstance.get("/getAllEducations", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEducationById = async (id, token) => {
  return axiosInstance.get(`/getEducationById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEducation = async (id, education, token) => {
  return axiosInstance.put(`/updateEducation/${id}`, education, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteEducation = async (id, token) => {
  return axiosInstance.delete(`/deleteEducation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
