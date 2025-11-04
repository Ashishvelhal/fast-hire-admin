import axiosInstance from "../Common/axiosConfig";

export const createCourse = async (course, token) => {
  return axiosInstance.post("/createCourse", course, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getAllCourses = async () => {
  return axiosInstance.get("/getAllCourses");
};

export const getCourseById = async (id, token) => {
  return axiosInstance.get(`/getCourseById/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCourse = async (id, course, token) => {
  return axiosInstance.put(`/updateCourse/${id}`, course, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCourse = async (id, token) => {
  return axiosInstance.delete(`/deleteCourse/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
