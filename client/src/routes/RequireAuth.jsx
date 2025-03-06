import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  if (!auth) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};

export default RequireAuth;
