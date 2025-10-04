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
export const updateManager = (id, managerFormData, token) => { 
  return axiosInstance.put(`/${id}/updateManager`, managerFormData,
     { headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
     }, 
    });
     };
export const deleteManager = (id, token) => { 
  return axiosInstance.delete(`/${id}/deleteManager`, 
    { headers: { Authorization: `Bearer ${token}`,
   },
   });
   };