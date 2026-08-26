import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="grid min-h-screen place-items-center">Loading...</div>;
  if (!user) return <Navigate to="/login-client" replace state={{ from: location }} />;
  if (role && user.role !== role) return <Navigate to="/home-page" replace />;

  return children;
}

export default ProtectedRoute;
