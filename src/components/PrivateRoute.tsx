import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
