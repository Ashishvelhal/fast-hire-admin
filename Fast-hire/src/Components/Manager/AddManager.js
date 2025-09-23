// src/components/Manager/ManagerService.js
import axiosInstance from "../Common/axiosConfig";

// ✅ Create Manager (with file upload support)
export const createManager = (managerFormData, token) => {
  return axiosInstance.post("/createManager", managerFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Get All Managers
export const getAllManagers = (token) => {
  return axiosInstance.get("/getAllManagers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
