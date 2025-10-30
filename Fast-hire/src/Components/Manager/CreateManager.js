import axiosInstance from "../Common/axiosConfig";

export const createManager = async (managerData, profilePhoto, token) => {
  const formData = new FormData();
  formData.append("manager", JSON.stringify(managerData));

  if (profilePhoto) {
    formData.append("profilePhoto", profilePhoto);
  }

  return axiosInstance.post("/createManager", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getAllManagers = async (token) => {
  return axiosInstance.get("/getAllManagers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getManagerById = async (id, token) => {
  return axiosInstance.get(`/getManagerById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateManager = async (id, managerData, profilePhoto, token) => {
  const formData = new FormData();
  formData.append("manager", JSON.stringify(managerData));

  if (profilePhoto) {
    formData.append("profilePhoto", profilePhoto);
  }

  return axiosInstance.put(`/${id}/updateManager`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const partialUpdateManager = async (id, managerData, profilePhoto, token) => {
  const formData = new FormData();
  formData.append("manager", JSON.stringify(managerData));

  if (profilePhoto) {
    formData.append("profilePhoto", profilePhoto);
  }

  return axiosInstance.patch(`/${id}/partialUpdateManager`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteManager = async (id, token) => {
  return axiosInstance.delete(`/${id}/deleteManager`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
