// src/components/Auth/Service/LoginService.js
import axios from "axios";
import axiosInstance from "../Utils/axiosConfig";

const API_BASE_URL = "http://localhost:8080";

// const API_BASE_URL = "https://fasthire.in:12443"; // Uncomment for production

// Create axios instance with common settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

// Super Admin Login API
export const loginSuperAdmin = async(loginRequest) => {
    const response = await apiClient.post("/superAdminLogin", loginRequest, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

// Manager Login API
export const loginManager = async(loginRequest) => {
    const response = await apiClient.post("/managerLogin", loginRequest, {
        headers: {
            "Content-Type": "application/json", // <-- Explicitly set JSON header
        },
    });
    return response.data;
};

// Department Login API
export const loginDepartment = async(loginRequest) => {
    const response = await apiClient.post("/departmentlogin", loginRequest, {
        headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
        },
    });
    return response.data;
};

// Employer Login API
export const loginEmployer = async(loginRequest) => {
    const response = await apiClient.post("/loginEmployer", loginRequest, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
// HR Login API
export const loginHR = async(loginRequest) => {
    const response = await apiClient.post("/hrlogin", loginRequest, {
        headers: {
            "Content-Type": "application/json"
        },
    });
    return response.data;
};

// Staff Login API
export const loginStaff = async(loginRequest) => {
    const response = await apiClient.post("/stafflogin", loginRequest, {
        headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
        },
    });
    return response.data;
};


// Super Admin Registration API
export const registerSuperAdmin = async(data) => {
    try {
        const res = await fetch(`${API_BASE_URL}/superAdmin/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.error("Registration Error:", err);
        throw err;
    }
};

// Get Branch Code-Name Mapping

export const getBranchCodeNameMap = async() => {
    try {
        const response = await axiosInstance.get("/getBranchCodeNameMap");
        return response.data;
    } catch (error) {
        console.error("Error fetching branch code-name map:", error);
        throw error;
    }
};