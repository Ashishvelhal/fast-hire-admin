import axiosInstance from "../Common/axiosConfig";

export const createEmployer = (employerFormData, planId, startDate, token) => {
  return axiosInstance.post(
    "/createEmployer",
    employerFormData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      params: {
        planId: planId,           
        startDate: startDate,     
      },
    }
  );
};


export const getAllEmployers = (token) => {
  return axiosInstance.get("/getAllEmployers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmployerById = (id, token) => {
  return axiosInstance.get(`/getEmployerById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateEmployer = (id, employerFormData, token) => {
  return axiosInstance.put(`/${id}/updateEmployer`, employerFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEmployer = (id, token) => {
  return axiosInstance.delete(`/${id}/deleteEmployer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmployerPlans = (employerId, token) => {
  return axiosInstance.get(`/${employerId}/plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


