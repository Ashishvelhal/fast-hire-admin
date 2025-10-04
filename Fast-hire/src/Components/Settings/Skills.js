import axiosInstance from "../Common/axiosConfig";

export const createSkill = async (skill, token) => {
  return axiosInstance.post("/createSkill", skill, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllSkills = async (token) => {
  return axiosInstance.get("/getAllSkills", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSkillById = async (id, token) => {
  return axiosInstance.get(`/getSkillById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const updateSkill = async (id, skill, token) => {
  return axiosInstance.put(`/updateSkill/${id}`, skill, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const deleteSkill = async (id, token) => {
  return axiosInstance.delete(`/deleteSkill/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

