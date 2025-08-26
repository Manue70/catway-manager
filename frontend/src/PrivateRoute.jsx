
import { Navigate } from "react-router-dom";

function PrivateRoute({ token, userRole, requiredRole, children }) {
  // Si pas connecté du tout
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si un rôle précis est requis (admin, manager, etc.)
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;

