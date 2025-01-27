import { login, signup } from "../api/authApi";

export const useAuthActions = () => {
  const handleLogin = async (credentials) => {
    try {
      const data = login(credentials);
      console.log("Handle Login data is", data);
    } catch (error) {
      console.log("Handle Login Error is", error);
    }
  };

  const handleSignup = async (userData) => {
    try {
      const data = signup(userData);
      console.log("Handle Login data is", data);
    } catch (error) {
      console.log("Handle Login Error is", error);
    }
  };

  return { handleLogin, handleSignup };
};
