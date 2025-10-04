import axios from "axios";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
    // baseURL: "https://fasthire.in:12443",
    
    baseURL: "http://localhost:8080", // your base URL
    // your base URLi
});
// Request Interceptor: attach token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("authToken") || "eyJhbGciOiJIUzI1NiJ9.eyJjYW5VcGRhdGUiOnRydWUsInJvbGUiOiJTVVBFUkFETUlOIiwiY2FuUmVhZCI6dHJ1ZSwiY2FuRGVsZXRlIjp0cnVlLCJjYW5DcmVhdGUiOnRydWUsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU3MzE2MjI1LCJleHAiOjE3NTczMTk4MjV9.61wjuF1ifP4aVKniBDWaUZTRdeCLZX3PkDoHW9PGnYA";
        console.log("Token before request:", token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Response Interceptor: handle expired token
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            Swal.fire({
                    icon: "warning",
                    title: "Session Expired",
                    text: "Please login again.",
                    confirmButtonColor: "#3085D6",
                })
                .then(() => {
                    sessionStorage.clear(); // Clear token and other session data
                    window.location.href = "/fasthire"; // Navigate to login
                });
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;