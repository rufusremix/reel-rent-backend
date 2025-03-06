import { axiosAuthInstance } from "./apiClient";

const parseError = (err) => {
  return (
    err.response?.data?.error?.message ||
    err.message ||
    "Something went wrong. Please try again"
  );
};

const login = async (LoginCredentials) => {
  try {
    const response = await axiosAuthInstance.post("/login", LoginCredentials);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Logged In Successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: parseError(err),
    };
  }
};

const signup = async (signupCredentials) => {
  try {
    const response = await axiosAuthInstance.post("/signup", signupCredentials);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Signed In Successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: parseError(err),
    };
  }
};

const logout = async () => {
  try {
    await axiosAuthInstance.post("/logout");
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

const refresh = async () => {
  try {
    const response = await axiosAuthInstance.post("/refresh");
    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Refreshed access token Successfully",
    };
  } catch (err) {
    console.error("Refresh Token Error:", err);
    return {
      success: false,
      message: parseError(err),
    };
  }
};

export { login, signup, logout, refresh };
