import axiosInstance from "../Common/axiosConfig"; // adjust path if needed
export const createEnquiry = async (courseId, enquiryData) => {
  try {
    const response = await axiosInstance.post(`/enquiry/${courseId}`, enquiryData);
    return response.data;
  } catch (error) {
    console.error("Error creating enquiry:", error);
    throw error.response?.data || "Error creating enquiry";
  }
};

export const getAllEnquiries = async () => {
  try {
    const response = await axiosInstance.get(`/admission-getallenquiry`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    throw error.response?.data || "Error fetching enquiries";
  }
};

export const getEnquiryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getenquirybyid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);
    throw error.response?.data || "Error fetching enquiry by ID";
  }
};

export const updateEnquiry = async (eid, enquiryData) => {
  try {
    const response = await axiosInstance.put(`/update-enquiry/${eid}`, enquiryData);
    return response.data;
  } catch (error) {
    console.error("Error updating enquiry:", error);
    throw error.response?.data || "Error updating enquiry";
  }
};

export const deleteEnquiry = async (eid) => {
  try {
    const response = await axiosInstance.delete(`/deleteenquiry/${eid}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    throw error.response?.data || "Error deleting enquiry";
  }
};
