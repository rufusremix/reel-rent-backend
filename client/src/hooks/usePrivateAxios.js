import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivateInstance } from "../api/apiClient";
import useRefreshToken from "./useRefreshToken";
import { useNavigate } from "react-router";

const usePrivateAxios = () => {
  const { auth, dispatch } = useAuth();
  const refresh = useRefreshToken();
  const accessToken = auth?.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("Response Intercept Error", error);
        if (
          error.response.status === 401 &&
          error.response?.data?.message ===
            "Token expired. Please refresh your session."
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (!newAccessToken) {
            dispatch({
              type: "logout",
            });
            navigate("/login");
            return Promise.reject({
              response: {
                data: { message: "Session Expired. Please Login again." },
                status: 401,
              },
            });
          }
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
};

export default usePrivateAxios;
