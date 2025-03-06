import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAdmin = () => {
  const user = useAuth()?.user;
  const location = useLocation();
  if (!user?.isAdmin)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  return <Outlet />;
};

export default RequireAdmin;
