import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/login" />;

  const decoded: any = jwtDecode(token);

  // Optional: Restrict admin route
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  if (isAdminRoute && decoded.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
