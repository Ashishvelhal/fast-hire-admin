import axiosInstance from "../Common/axiosConfig";

export const createPlan = (planData, token) => {
  return axiosInstance.post("/createPlan", planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePlan = (id, planData, token) => {
  return axiosInstance.put(`/updatePlan/${id}`, planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePlan = (id, token) => {
  return axiosInstance.delete(`/deletePlan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPlanById = (id, token) => {
  return axiosInstance.get(`/getPlanById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPlans = (token) => {
  return axiosInstance.get("/getAllPlans", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};