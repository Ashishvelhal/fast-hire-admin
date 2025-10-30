import axiosInstance from "../Common/axiosConfig";

// ✅ CREATE Company (with logo upload)
export const createCompany = async (company, token) => {
  const formData = new FormData();
  formData.append("company", JSON.stringify(company));
  if (company.logoFile) formData.append("logoFile", company.logoFile);

  return axiosInstance.post("/createCompany", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ GET all Companies
export const getAllCompanies = async (token) => {
  return axiosInstance.get("/getAllCompanies", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ GET Company by ID
export const getCompanyById = async (id, token) => {
  return axiosInstance.get(`/getCompanyById?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ UPDATE Company (with logo upload)
export const updateCompany = async (id, company, token) => {
  const formData = new FormData();
  formData.append("company", JSON.stringify(company));
  if (company.logoFile) formData.append("logoFile", company.logoFile);
  formData.append("id", id);

  return axiosInstance.put("/updateCompany", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ DELETE Company
export const deleteCompany = async (id, token) => {
  return axiosInstance.delete(`/deleteCompany?id=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
