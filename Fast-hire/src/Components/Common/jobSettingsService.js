import axiosInstance from "./axiosConfig";

// Get categories by industry ID
export const getCategoriesByIndustry = async (industryId, token) => {
  try {
    const response = await axiosInstance.get(`/getCategoriesByIndustry/${industryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories by industry:', error);
    throw error;
  }
};

// Get subcategories by category ID
export const getSubcategoriesByCategory = async (categoryId, token) => {
  try {
    const response = await axiosInstance.get(`/getSubCategoriesByCategory/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories by category:', error);
    throw error;
  }
};

export const getSkillsBySubCategory = async (subCategoryId, token) => {
  try {
    const response = await axiosInstance.get(`/getSkillsBySubCategory/${subCategoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching skills by subcategory:', error);
    throw error;
  }
};
