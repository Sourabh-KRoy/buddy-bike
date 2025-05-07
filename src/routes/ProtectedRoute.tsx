import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./authUtils";

const ProtectedRoute = () => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
