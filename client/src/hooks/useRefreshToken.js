import useAuth from "./useAuth";
import { refresh as refreshService } from "../api/authService";

const useRefreshToken = () => {
  const { dispatch } = useAuth();
  const refresh = async () => {
    const result = await refreshService();
    if (!result.success) {
      dispatch({
        type: "logout",
      });
      return null;
    }

    const accessToken = result?.data?.accessToken || null;
    dispatch({
      type: "refresh",
      authData: { accessToken },
    });
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
