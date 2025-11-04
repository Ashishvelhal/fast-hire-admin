import axiosInstance from "../Common/axiosConfig";

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

export const getAllCompanies = async () => {
  return axiosInstance.get("/getAllCompanies");
};

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
