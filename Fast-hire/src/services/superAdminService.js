import axiosInstance from "../Components/Utils/axiosConfig";

export const createSuperAdmin = (adminData) => {
    return axiosInstance.post("/superadmin/createSuperAdmin", adminData);
};

export const getAllSuperAdmins = () => {
    return axiosInstance.get("/superadmin/getAllSuperAdmins");
};

export const updateSuperAdmin = (id, adminData) => {
    return axiosInstance.put(`/superadmin/updateSuperAdmin/${id}`, adminData);
};

export const deleteSuperAdmin = (id) => {
    return axiosInstance.delete(`/superadmin/deleteSuperAdmin/${id}`);
};