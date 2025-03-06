import { axiosAuthInstance } from "../api/apiClient";
import { login, logout, signup } from "../api/authService";
import useAuth from "./useAuth";

export const useAuthActions = () => {
  const { dispatch } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (!result.success) return result;

    const { user, accessToken } = result.data;
    dispatch({
      type: "login",
      authData: { name: user.name, isAdmin: user.isAdmin, accessToken },
    });
    return result;
  };

  const handleSignup = async (userData) => {
    const result = await signup(userData);
    return result;
  };

  const handleLogout = async () => {
    await logout();
    dispatch({ type: "logout" });
  };

  return { handleLogin, handleSignup, handleLogout };
};
