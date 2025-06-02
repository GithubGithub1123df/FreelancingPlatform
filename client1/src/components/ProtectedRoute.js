import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to="landing" />;
}

export default ProtectedRoute;
