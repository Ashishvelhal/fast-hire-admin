import axiosInstance from "../Common/axiosConfig";

export const createemploye = (employeData, token, email, role) => {
  return axiosInstance.post("createEmployer", employeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      role: role,
      email: email,
    },
  });
};
