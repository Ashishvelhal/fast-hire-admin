import axios from "axios";

const BASE_URL = "http://localhost:12443"; // Change if needed

export const getAllCustomPlan = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getall-customplan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching custom plans:", error);
    throw error;
  }
};
