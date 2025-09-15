import axiosInstance from "../Components/Utils/axiosConfig";

export const createSuperAdmin = (adminData, profileImage) => {
    const formData = new FormData();
    formData.append("admin", JSON.stringify(adminData));
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    return axiosInstance.post("/createSuperAdmin", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllSuperAdmins = () => {
    return axiosInstance.get("/getAllSuperAdmins");
};

export const updateSuperAdmin = (id, adminData) => {
    return axiosInstance.put(`/updateSuperAdmin/${id}`, adminData);
};

export const deleteSuperAdmin = (id) => {
    return axiosInstance.delete(`/deleteSuperAdmin/${id}`);
};