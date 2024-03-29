import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function ProtectedAdmin() {
  const { loggedIn, user } = useAuth();
  return loggedIn && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdmin;
