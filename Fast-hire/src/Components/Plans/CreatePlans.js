import axiosInstance from "../Common/axiosConfig";

// Create a new plan
export const createPlan = (planData, token) => {
  return axiosInstance.post("/createPlan", planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllPlans = async () => {
  try {
    const response = await axiosInstance.get("/getAllPlans");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updatePlan = (id, planData, token) => {
  return axiosInstance.put(`/updatePlan/${id}`, planData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a plan
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


export const assignPlanToEmployer = (employerId, planId, startDate, token) => {
  return axiosInstance.post(
    `/assignPlan/${employerId}`,
    null,
    {
      params: { planId, startDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
