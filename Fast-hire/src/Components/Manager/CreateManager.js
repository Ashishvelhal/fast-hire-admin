import axiosInstance from "../Common/axiosConfig";

export const createManager = (managerFormData, token) => {
  return axiosInstance.post("/createManager", managerFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllManagers = (token) => {
  return axiosInstance.get("/getAllManagers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
