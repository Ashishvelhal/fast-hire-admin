import axiosInstance from "../Common/axiosConfig";

export const createEmployer = (employerData, token, email, role) => {
    return axiosInstance.post("registerEmployer", employerData, {
        headers: {
            Authorization: `Bearer ${token}`,
            role: role,
            email: email,
        },
    });
};