import axiosInstance from "../Common/axiosConfig";

// ✅ Create Education
export const createEducation = async (education, token) => {
  return axiosInstance.post("/createEducation", education, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get All Educations
export const getAllEducations = async (token) => {
  return axiosInstance.get("/getAllEducations", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get Education by ID
export const getEducationById = async (id, token) => {
  return axiosInstance.get(`/getEducationById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Update Education
export const updateEducation = async (id, education, token) => {
  return axiosInstance.put(`/updateEducation/${id}`, education, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Delete Education
export const deleteEducation = async (id, token) => {
  return axiosInstance.delete(`/deleteEducation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
