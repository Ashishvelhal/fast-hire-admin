import axiosInstance from "../Common/axiosConfig"; 


export const createLocation = async (location, token) => {
  return axiosInstance.post("/createLocation", location, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getAllLocations = async (token) => {
  return axiosInstance.get("/getAllLocations", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const updateLocation = async (id, location, token) => {
  return axiosInstance.put(`/updateLocation/${id}`, location, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteLocation = async (id, token) => {
  return axiosInstance.delete(`/deleteLocation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getLocationById = async (id, token) => {
  return axiosInstance.get(`/getLocationById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
