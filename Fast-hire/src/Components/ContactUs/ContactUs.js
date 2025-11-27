// src/api/ContactUsService.js
import axios from "axios";

const BASE_URL = "http://localhost:8081/contactus"; 

// const BASE_URL = "https://fasthire.in:12443/contactus"; 

export const createContactUs = async (contactData) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact-us`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error saving ContactUs:", error);
    throw error.response?.data || "Error saving contact data";
  }
};

// GET: Fetch all Contact Us entries
export const getAllContactUs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getall`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all ContactUs:", error);
    throw error.response?.data || "Error fetching contact data";
  }
};

// GET: Fetch ContactUs by ID
export const getContactUsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error fetching contact data by ID";
  }
};

// PUT: Update ContactUs by ID
export const updateContactUs = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-contactus/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error updating contact data";
  }
};

// DELETE: Delete ContactUs by ID
export const deleteContactUs = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-contactus/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ContactUs with ID ${id}:`, error);
    throw error.response?.data || "Error deleting contact data";
  }
};
