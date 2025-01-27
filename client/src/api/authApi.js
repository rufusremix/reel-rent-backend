import axiosInstance from "./apiClient";

const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export { login, signup };
