import axios from "axios";

// ✅ Base URL for your backend
const BASE_URL = "http://localhost:8081"; 

// const BASE_URL = "https://fasthire.in:14443"

// ✅ Create a new enquiry for a specific course
export const createEnquiry = async (courseId, enquiryData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/enquiry/${courseId}`,
      enquiryData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating enquiry:", error);
    throw error.response?.data || "Error creating enquiry";
  }
};

// ✅ Fetch all enquiries
export const getAllEnquiries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getallenquiry`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    throw error.response?.data || "Error fetching enquiries";
  }
};

// ✅ Get enquiry by ID
export const getEnquiryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getenquirybyid/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);
    throw error.response?.data || "Error fetching enquiry by ID";
  }
};

// ✅ Update enquiry by ID
export const updateEnquiry = async (eid, enquiryData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-enquiry/${eid}`,
      enquiryData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating enquiry:", error);
    throw error.response?.data || "Error updating enquiry";
  }
};

// ✅ Delete enquiry by ID
export const deleteEnquiry = async (eid) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteenquiry/${eid}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    throw error.response?.data || "Error deleting enquiry";
  }
};
